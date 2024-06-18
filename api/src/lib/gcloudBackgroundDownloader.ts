import { performance } from 'perf_hooks'; // Node.js performance hooks

import { File, Bucket } from '@google-cloud/storage';
import { Gallery } from '@prisma/client';
import archiver from 'archiver';

import { getStorageClient } from 'src/helpers/getGCPCredentials';

import { db } from './db';
import { logger } from './logger';

const logTime = (label: string) => {
    const startTime = performance.now();
    return () => {
        const endTime = performance.now();
        logger.info(`${label} took ${(endTime - startTime).toFixed(2)}ms`);
    };
};

const ONE_DAY_TIME = 1000 * 60 * 60 * 24; // 1 day
const ARCHIVE_PREFIX = 'archive';

export const downloadInBackground = async ({ id }: { id: string }) => {
    const endDownloadInBackground = logTime('downloadInBackground');
    logger.info(`Starting download in background for gallery ID: ${id}`);

    const gallery = await db.gallery.findUnique({ where: { id } });
    if (!gallery) {
        const errorMessage = `Gallery with ID: ${id} not found`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    logger.info(`Gallery found: ${gallery.name}`);
    await deleteOldArchives();
    logger.info(`Old archives deleted`);

    const downloadUrl = await createAndMergeZips(gallery);
    if (!downloadUrl) {
        const errorMessage = `Error creating zip archive for gallery: ${gallery.name}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    await db.gallery.update({
        where: { id },
        data: {
            downloadUrl,
            downloadRequestAt: new Date().toISOString(),
            downloadPending: false,
        },
    });

    logger.info('Gallery download URL has been updated in the database');
    endDownloadInBackground();
};

let totalFilesAdded = 0;

const createAndMergeZips = async (
    gallery: Gallery
): Promise<string | undefined> => {
    const bucket = await getStorageClient();
    const [files] = await bucket.getFiles({
        prefix: gallery.gcloudStoragePath,
    });
    logger.info(`Found ${files.length} files in gallery: ${gallery.name}`);

    const batchSize = 100;
    const archiveFolderName = ARCHIVE_PREFIX;
    const zipFiles: File[] = [];

    for (let i = 0; i < files.length; i += batchSize) {
        const batchFiles = files.slice(i, i + batchSize);
        const startIdx = i + 1;
        const endIdx = Math.min(i + batchSize, files.length);
        const batchZipFileName = `${archiveFolderName}/${gallery.gcloudStoragePath}/${gallery.name}_photos-${startIdx}-${endIdx}.zip`;

        logger.info(
            `Creating batch zip file: ${batchZipFileName} with ${batchFiles.length} files`
        );

        const batchZipFile = await createBatchZip(
            batchFiles,
            batchZipFileName,
            bucket,
            startIdx,
            files.length
        );
        zipFiles.push(batchZipFile);
    }

    const finalZipFileName = `${archiveFolderName}/${gallery.gcloudStoragePath}/${gallery.name}.zip`;
    logger.info(
        `Merging batch zip files into final zip file: ${finalZipFileName}`
    );

    const finalZipFile = await mergeZips(zipFiles, finalZipFileName, bucket);

    const [downloadUrl] = await finalZipFile.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + ONE_DAY_TIME, // 1 day
    });

    try {
        const deletePromises = zipFiles.map((zipFile) => zipFile.delete());
        await Promise.allSettled(deletePromises);
        logger.info('Batch zip files deleted');
    } catch (err) {
        const error = err as Error;
        const errorMessage = `Error deleting batch zip files: ${error.message}`;
        logger.error(errorMessage);
    }

    logger.info(`Final zip file created with download URL: ${downloadUrl}`);
    return downloadUrl;
};

const createBatchZip = (
    files: File[],
    zipFileName: string,
    bucket: Bucket,
    startIdx: number,
    totalFiles: number
): Promise<File> => {
    const zipFile = bucket.file(zipFileName);
    const zipStream = zipFile.createWriteStream();
    const archive = archiver('zip', {
        zlib: { level: 6 }, // Set compression level
    });

    return new Promise((resolve, reject) => {
        archive.on('error', (err: Error) => {
            const errorMessage = `Error creating zip archive: ${err.message}`;
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });

        zipStream.on('error', (err) => {
            const errorMessage = `Error writing zip file: ${err.message}`;
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });

        zipStream.on('close', () => {
            logger.info(`Batch zip file created: ${zipFileName}`);
            resolve(zipFile);
        });

        archive.pipe(zipStream);

        files.forEach((file, index) => {
            const fileStream = file.createReadStream();
            fileStream.on('error', (err) => {
                const errorMessage = `Error reading file ${file.name}: ${err.message}`;
                logger.error(errorMessage);
                reject(new Error(errorMessage));
            });

            archive.append(fileStream, {
                name: file.name.split('/').pop() ?? file.name,
            });

            fileStream.on('end', () => {
                totalFilesAdded++;
                logger.info(
                    `Added file ${startIdx + index}/${
                        files.length
                    } - ${totalFilesAdded}/${totalFiles} - files added in total to zip: ${
                        file.name
                    }`
                );
            });
        });

        archive.finalize().catch((error) => {
            const errorMessage = `Error finalizing archive: ${error.message}`;
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });
    });
};

const mergeZips = (
    zipFiles: File[],
    finalZipFileName: string,
    bucket: Bucket
): Promise<File> => {
    const finalZipFile = bucket.file(finalZipFileName);
    const finalZipStream = finalZipFile.createWriteStream();
    const archive = archiver('zip', {
        zlib: { level: 0 }, // Set compression level
    });

    return new Promise((resolve, reject) => {
        archive.on('error', (err: Error) => {
            const errorMessage = `Error merging zip archives: ${err.message}`;
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });

        finalZipStream.on('error', (err) => {
            const errorMessage = `Error writing final zip file: ${err.message}`;
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });

        finalZipStream.on('close', () => {
            logger.info(`Final zip file created: ${finalZipFileName}`);
            resolve(finalZipFile);
        });

        archive.pipe(finalZipStream);

        zipFiles.forEach((zipFile) => {
            const fileStream = zipFile.createReadStream();
            fileStream.on('error', (err) => {
                const errorMessage = `Error reading zip file ${zipFile.name}: ${err.message}`;
                logger.error(errorMessage);
                reject(new Error(errorMessage));
            });
            archive.append(fileStream, { name: zipFile.name });
        });

        archive.finalize().catch((error) => {
            const errorMessage = `Error finalizing merged archive: ${error.message}`;
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });
    });
};

export const deleteOldArchives = async () => {
    const bucket = await getStorageClient();
    const [allArchiveFiles] = await bucket.getFiles({
        prefix: ARCHIVE_PREFIX,
    });

    logger.info(`Found ${allArchiveFiles.length} old archive files`);

    const archivesOlderThan1Day = allArchiveFiles.filter((file) => {
        if (!file.metadata.timeCreated) return true;

        const createdAt = new Date(file.metadata.timeCreated);
        const now = new Date();
        const diff = now.getTime() - createdAt.getTime();
        return diff > ONE_DAY_TIME;
    });

    logger.info(
        `Deleting ${archivesOlderThan1Day.length} archives older than 1 day`
    );

    const oldArchivePromises = archivesOlderThan1Day.map(async (file) => {
        const [_archivesFolder, _weddingId, galleryId] = file.name.split('/');

        await file.delete();
        logger.info(`Deleted archive file: ${file.name}`);

        return db.gallery.update({
            where: { id: galleryId },
            data: {
                downloadUrl: null,
                downloadRequestAt: null,
                downloadPending: false,
            },
        });
    });

    try {
        await Promise.allSettled(oldArchivePromises);
        logger.info('Old archives deletion process completed');
    } catch (err) {
        const error = err as Error;
        const errorMessage = `Error deleting old archives: ${error.message}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }
};

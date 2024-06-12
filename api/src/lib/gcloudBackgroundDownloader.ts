import { File, Bucket } from '@google-cloud/storage';
import { Gallery } from '@prisma/client';
import archiver from 'archiver';

import { getStorageClient } from 'src/helpers/getGCPCredentials';

import { db } from './db';
import { logger } from './logger';

const ONE_DAY_TIME = 1000 * 60 * 60 * 24; // 1 day
const ARCHIVE_PREFIX = 'archive';

export const downloadInBackground = async ({ id }: { id: string }) => {
    logger.info(`Starting download in background for gallery ID: ${id}`);

    const gallery = await db.gallery.findUnique({
        where: { id },
    });

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

    logger.info(`Zip archive created, download URL: ${downloadUrl}`);

    await db.gallery.update({
        where: { id },
        data: {
            downloadUrl,
            downloadRequestAt: new Date().toISOString(),
            downloadPending: false,
        },
    });

    logger.info('Gallery download URL has been updated in the database');
};

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
        const batchZipFileName = `${archiveFolderName}/${
            gallery.gcloudStoragePath
        }/${gallery.name}_part${Math.floor(i / batchSize) + 1}.zip`;

        logger.info(
            `Creating batch zip file: ${batchZipFileName} with ${batchFiles.length} files`
        );

        const batchZipFile = await createBatchZip(
            batchFiles,
            batchZipFileName,
            bucket
        );
        zipFiles.push(batchZipFile);
    }

    const finalZipFileName = `${archiveFolderName}/${gallery.gcloudStoragePath}/${gallery.name}_final.zip`;
    logger.info(
        `Merging batch zip files into final zip file: ${finalZipFileName}`
    );

    const finalZipFile = await mergeZips(zipFiles, finalZipFileName, bucket);

    const [downloadUrl] = await finalZipFile.getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + ONE_DAY_TIME, // 1 day
    });

    logger.info(`Final zip file created with download URL: ${downloadUrl}`);

    return downloadUrl;
};

const createBatchZip = (
    files: File[],
    zipFileName: string,
    bucket: Bucket
): Promise<File> => {
    const zipFile = bucket.file(zipFileName);
    const zipStream = zipFile.createWriteStream();
    const archive = archiver('zip', {
        zlib: { level: 9 }, // Set compression level
    });

    return new Promise((resolve, reject) => {
        archive.on('error', (err: Error) => {
            const errorMessage = `Error creating zip archive: ${err.message}`;
            console.error(errorMessage);
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });

        zipStream.on('error', (err) => {
            const errorMessage = `Error writing zip file: ${err.message}`;
            console.error(errorMessage);
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });

        zipStream.on('close', () => {
            logger.info(`Batch zip file created: ${zipFileName}`);
            resolve(zipFile);
        });

        archive.pipe(zipStream);

        files.forEach((file) => {
            const fileStream = file.createReadStream();
            fileStream.on('error', (err) => {
                const errorMessage = `Error reading file ${file.name}: ${err.message}`;
                console.error(errorMessage);
                logger.error(errorMessage);
                reject(new Error(errorMessage));
            });
            archive.append(fileStream, { name: file.name });
        });

        archive.finalize().catch((error) => {
            const errorMessage = `Error finalizing archive: ${error.message}`;
            console.error(errorMessage);
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
        zlib: { level: 9 }, // Set compression level
    });

    return new Promise((resolve, reject) => {
        archive.on('error', (err: Error) => {
            const errorMessage = `Error merging zip archives: ${err.message}`;
            console.error(errorMessage);
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });

        finalZipStream.on('error', (err) => {
            const errorMessage = `Error writing final zip file: ${err.message}`;
            console.error(errorMessage);
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
                console.error(errorMessage);
                logger.error(errorMessage);
                reject(new Error(errorMessage));
            });
            archive.append(fileStream, { name: zipFile.name });
        });

        archive.finalize().catch((error) => {
            const errorMessage = `Error finalizing merged archive: ${error.message}`;
            console.error(errorMessage);
            logger.error(errorMessage);
            reject(new Error(errorMessage));
        });
    });
};

const deleteOldArchives = async () => {
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

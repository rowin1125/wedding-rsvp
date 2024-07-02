import { performance } from 'perf_hooks';

import { File, Bucket } from '@google-cloud/storage';
import { Gallery } from '@prisma/client';
import archiver from 'archiver';
import Bottleneck from 'bottleneck';
import { User, Wedding } from 'types/graphql';

import { getStorageClient } from 'src/helpers/getGCPCredentials';

import { db } from './db';
import { EMAIL_TEMPLATES_MAP, mailUser } from './email';
import { logger } from './logger';
import Sentry from './sentry';

const logTime = (label: string) => {
    const startTime = performance.now();
    return () => {
        const endTime = performance.now();
        logger.info(`${label} took ${(endTime - startTime).toFixed(2)}ms`);
    };
};

export const ONE_DAY_TIME = 1000 * 60 * 60 * 24;
const ARCHIVE_PREFIX = 'archive';
const MAX_CONCURRENT_UPLOADS = 20;
let totalFilesAdded = 0;

export const downloadInBackground = async ({
    galleryId,
    downloadId,
}: {
    galleryId: string;
    downloadId: string;
}) => {
    const endDownloadInBackground = logTime('downloadInBackground');
    logger.info(`Starting download in background for gallery ID: ${galleryId}`);

    const gallery = await db.gallery.findUnique({
        where: { id: galleryId },
        include: {
            wedding: {
                include: {
                    user: true,
                },
            },
        },
    });

    if (!gallery) {
        const errorMessage = `Gallery with ID: ${galleryId} not found`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    logger.info(`Gallery found: ${gallery.name}`);
    await deleteOldArchives();
    logger.info(`Old archives deleted`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const downloadUrl = await createAndMergeZips(gallery as any);
    if (!downloadUrl) {
        const errorMessage = `Error creating zip archive for gallery: ${gallery.name}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    // Set any galleryDownloadRequest with the same galleryId to FAILED
    await db.galleryDownloadRequest.updateMany({
        where: {
            galleryId,
            status: 'PENDING',
        },
        data: {
            status: 'FAILED',
        },
    });

    await db.galleryDownloadRequest.update({
        where: { id: downloadId },
        data: {
            downloadUrl,
            status: 'SUCCESS',
            validUntil: new Date(Date.now() + ONE_DAY_TIME).toISOString(),
        },
    });

    if (gallery?.wedding?.user?.email) {
        await mailUser({
            to: [
                {
                    name: `Foto gallerij: ${gallery.name}`,
                    email: gallery.wedding.user.email,
                },
            ],
            templateId: EMAIL_TEMPLATES_MAP.DOWNLOAD_GALLERY,
            params: {
                downloadUrl,
                websiteUrl: process.env.REDWOOD_ENV_VERCEL_URL,
            },
        });
    }
    logger.info('Gallery download URL has been updated in the database');
    endDownloadInBackground();
    totalFilesAdded = 0;
};

const revertDownloadRequest = async ({
    id,
    email,
}: {
    id: string;
    email: string;
}) => {
    try {
        logger.info(`Gallery download request reverted for gallery: ${id}`);

        await mailUser({
            templateId: EMAIL_TEMPLATES_MAP.GENERAL_ERROR,
            to: [
                {
                    name: 'Bruiloft Buddy gebruiker',
                    email,
                },
            ],
            params: {
                websiteUrl: process.env.REDWOOD_ENV_VERCEL_URL,
                errorMessage:
                    'Download helaas mislukt. We proberen het nogmaals. Indien dit fout blijft gaan neem dan contact op met de klantenservice',
            },
        });
    } catch (error) {
        Sentry.captureException(error);

        logger.error(`Error reverting download request for gallery: ${id}`);
    }
};

const createAndMergeZips = async (
    gallery: Gallery & {
        wedding: Wedding & {
            user: User;
        };
    }
): Promise<string | undefined> => {
    const bucket = await getStorageClient();
    const [files] = await bucket.getFiles({
        prefix: gallery.gcloudStoragePath,
    });
    logger.info(`Found ${files.length} files in gallery: ${gallery.name}`);

    const batchSize = 100;
    const archiveFolderName = ARCHIVE_PREFIX;
    const zipFiles: File[] = [];

    try {
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
                files.length
            );
            zipFiles.push(batchZipFile);
        }

        const finalZipFileName = `${archiveFolderName}/${gallery.gcloudStoragePath}/${gallery.name}.zip`;
        logger.info(
            `Merging batch zip files into final zip file: ${finalZipFileName}`
        );

        const finalZipFile = await mergeZips(
            zipFiles,
            finalZipFileName,
            bucket
        );

        const [downloadUrl] = await finalZipFile.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + ONE_DAY_TIME,
        });

        const deletePromises = zipFiles.map((zipFile) => zipFile.delete());
        await Promise.allSettled(deletePromises);
        logger.info('Batch zip files deleted');

        logger.info(`Final zip file created with download URL: ${downloadUrl}`);

        return downloadUrl;
    } catch (err) {
        const email = gallery.wedding.user.email;

        await revertDownloadRequest({
            id: gallery.id,
            email,
        });
        const error = err as Error;
        logger.error(`Error creating batch zip files: ${error.message}`);
    }
};

const createBatchZip = async (
    files: File[],
    zipFileName: string,
    bucket: Bucket,
    totalFiles: number
): Promise<File> => {
    const zipFile = bucket.file(zipFileName);
    const zipStream = zipFile.createWriteStream();
    const archive = archiver('zip', {
        zlib: { level: 3 },
    });

    const limiter = new Bottleneck({
        maxConcurrent: MAX_CONCURRENT_UPLOADS,
        minTime: 0, // Minimum time between requests
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

        const addFileToArchive = (file: File) => {
            return new Promise<void>((resolve, reject) => {
                const fileStream = file.createReadStream();

                fileStream.on('error', (err) => {
                    const errorMessage = `Error reading file ${file.name}: ${err.message}`;
                    logger.error(errorMessage);
                    reject(new Error(errorMessage));
                });

                fileStream.on('end', () => {
                    totalFilesAdded++;
                    logger.info(
                        `Added file - ${totalFilesAdded}/${totalFiles} - files added in total to zip: ${file.name}`
                    );
                    resolve(); // Resolve the promise here, after the file processing is complete
                });

                archive.append(fileStream, {
                    name: file.name.split('/').pop() ?? file.name,
                });
            });
        };

        const addFilePromises = files.map((file) =>
            limiter.schedule(() => addFileToArchive(file))
        );

        Promise.all(addFilePromises)
            .then(() => archive.finalize())
            .catch((error) => {
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
        zlib: { level: 0 },
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
            const name = zipFile.name.split('/').pop() ?? zipFile.name;
            fileStream.on('error', (err) => {
                const errorMessage = `Error reading zip file ${zipFile.name}: ${err.message}`;
                logger.error(errorMessage);
                reject(new Error(errorMessage));
            });
            archive.append(fileStream, { name });
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

    logger.info(`Found old archive files, starting deletion`);

    const deletePromises = allArchiveFiles.map((file) => file.delete());
    await Promise.allSettled(deletePromises);

    logger.info('Old archives deleted');
};

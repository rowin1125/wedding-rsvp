import { Gallery } from '@prisma/client';
import archiver from 'archiver';

import { getStorageClient } from 'src/helpers/getGCPCredentials';

import { db } from './db';
import { logger } from './logger';

const ONE_DAY_TIME = 1000 * 60 * 60 * 24; // 1 day
const ARCHIVE_PREFIX = 'archive';

export const downloadInBackground = async ({ id }: { id: string }) => {
    const gallery = await db.gallery.findUnique({
        where: { id },
    });

    if (!gallery) {
        throw new Error('Gallery not found');
    }

    await deleteOldArchives();
    const downloadUrl = await gzipFiles(gallery);
    if (!downloadUrl) throw new Error('Error creating zip archive');

    console.log('Updating gallery download URL');
    await db.gallery.update({
        where: { id },
        data: {
            downloadUrl,
            downloadRequestAt: new Date().toISOString(),
            downloadPending: false,
        },
    });

    logger.info('Gallery download URL has been updated');
};

const gzipFiles = async (gallery: Gallery): Promise<string | undefined> => {
    const bucket = await getStorageClient();

    const [files] = await bucket.getFiles({
        prefix: gallery.gcloudStoragePath,
    });

    const archiveFolderName = ARCHIVE_PREFIX;
    const zipFileName = `${archiveFolderName}/${gallery.gcloudStoragePath}/${gallery.name}.zip`;
    console.log('Zip created at:', zipFileName);
    const zipFile = bucket.file(zipFileName);

    const zipStream = zipFile.createWriteStream();
    const archive = archiver('zip', {
        zlib: { level: 9 }, // Set compression level
    });

    archive.on('error', (err: Error) => {
        throw new Error(`Error creating zip archive: ${err}`);
    });

    console.log('Created archive stream');
    archive.pipe(zipStream);

    console.log('Appending files to archive');
    for (const file of files) {
        const fileStream = file.createReadStream();
        archive.append(fileStream, { name: file.name });
    }

    try {
        console.log('Finalizing archive');
        await new Promise((resolve, reject) => {
            zipStream.on('close', resolve);
            zipStream.on('error', reject);
            archive.finalize();
        });

        console.log('Create signed URL for download');
        const [downloadUrl] = await zipFile.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + ONE_DAY_TIME, // 1 day
        });
        console.log('Download URL:', downloadUrl);

        return downloadUrl;
    } catch (error) {
        console.error(`Error creating zip archive: ${error}`);
    }
};

const deleteOldArchives = async () => {
    const bucket = await getStorageClient();
    const [allArchiveFiles] = await bucket.getFiles({
        prefix: ARCHIVE_PREFIX,
    });

    const archivesOlderThan1Day = allArchiveFiles.filter((file) => {
        if (!file.metadata.timeCreated) return true;

        const createdAt = new Date(file.metadata.timeCreated);
        const now = new Date();
        const diff = now.getTime() - createdAt.getTime();
        return diff > ONE_DAY_TIME;
    });

    const oldArchivePromises = archivesOlderThan1Day.map(async (file) => {
        const [_archivesFolder, _weddingId, galleryId] = file.name.split('/');

        await file.delete();
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
    } catch (error) {
        throw new Error(`Error deleting old archives: ${error}`);
    }
};

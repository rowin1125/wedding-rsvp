/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';

import { HttpFunction } from '@google-cloud/functions-framework';
import sharp from 'sharp';

import { getStorageClient } from './helpers/getGCPCredentials';

const dotenv = require('dotenv');
const fileType = require('file-type');

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env.yaml') });

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
const resizeName = 'resized';

async function resizeSingleImage(fileName: string, buffer: Buffer) {
    const bucket = await getStorageClient(bucketName);

    const thumbnailImage = await sharp(buffer)
        .resize({ width: 400 })
        .withMetadata()
        .toBuffer();
    const previewImage = await sharp(buffer)
        .resize({ width: 1024 })
        .withMetadata()
        .toBuffer();

    // TODO: After everything is in place, replace everything within 1 folder like: `weddingId/galleryId/uniqueId/(original/thumbnail/preview)image.jpg`
    const thumbnailFileName = `${resizeName}/thumbnail/${fileName}`;
    const previewFileName = `${resizeName}/preview/${fileName}`;

    await bucket.file(thumbnailFileName).save(thumbnailImage);
    await bucket.file(previewFileName).save(previewImage);

    console.info(
        `Resized ${fileName} to ${thumbnailFileName} and ${previewFileName}`
    );
}

export const resizeAllImages: HttpFunction = async (req, res) => {
    const bucket = await getStorageClient(bucketName);
    const [files] = await bucket.getFiles();
    let resizedCount = 0;
    const allResizedFiles = files.filter((file) =>
        file.name.includes(resizeName)
    );

    for (const file of files) {
        const name = file.name;
        if (name.includes(resizeName)) continue;
        const isAlreadyResized = allResizedFiles.some((resizedFile) =>
            resizedFile.name.includes(name)
        );
        if (isAlreadyResized) {
            console.log('Already resized:', name);
            continue;
        }

        console.info('Downloading file:', name);
        const [buffer] = await file.download();
        const type = await fileType.fromBuffer(buffer);

        const isImage = type && type.mime.startsWith('image/');
        if (!isImage) continue;

        console.log('Resizing file:', name);
        await resizeSingleImage(name, buffer);
        resizedCount++;
    }

    console.log(`Finished ✅ - Resized ${resizedCount} images`);
    res.status(200).send(`Resized ${resizedCount} images`);
};

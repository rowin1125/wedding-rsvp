/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';

import { cloudEvent } from '@google-cloud/functions-framework';
import sharp from 'sharp';

import { getStorageClient } from './helpers/getGCPCredentials';

const dotenv = require('dotenv');
const fileType = require('file-type');

// Load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env.yml') });

export const resizeImages = cloudEvent(
    'resizeImages',
    async (cloudEvent: any) => {
        const name = cloudEvent.data.name as string;
        const resizeName = 'resized';

        if (name.includes(resizeName)) return;

        const bucketName = cloudEvent.data.bucket;
        const bucket = await getStorageClient(bucketName);
        const file = bucket.file(name);

        const [buffer] = await file.download();
        const type = await fileType.fromBuffer(buffer);

        if (!type || !type.mime.startsWith('image/')) return;

        const thumbnailImage = await sharp(buffer)
            .resize({ width: 400 })
            .withMetadata()
            .toBuffer();
        const previewImage = await sharp(buffer)
            .resize({ width: 1024 })
            .withMetadata()
            .toBuffer();

        // TODO: After everything is in place, replace everything within 1 folder like: `weddingId/galleryId/uniqueId/(original/thumbnail/preview)image.jpg`
        const thumbnailFileName = `${resizeName}/thumbnail/${name}`;
        const previewFileName = `${resizeName}/preview/${name}`;

        await bucket.file(thumbnailFileName).save(thumbnailImage);
        await bucket.file(previewFileName).save(previewImage);

        console.info(
            `Resized ${name} to ${thumbnailFileName} and ${previewFileName}`
        );
    }
);

import path from 'path';

import { getStorageClient } from 'api/src/helpers/getGCPCredentials';
import { db } from 'api/src/lib/db';
import { logger } from 'api/src/lib/logger';
import fileType from 'file-type';

const hasFileExtension = (fileName: string) => {
    const ext = path.extname(fileName);
    return ext.length > 1;
};

export default async () => {
    try {
        const bucket = await getStorageClient();
        const [files] = await bucket.getFiles();
        logger.info(`Found ${files.length} files`);

        let updatedCount = 0;

        for (const file of files) {
            const name = file.name;

            if (hasFileExtension(name)) continue;

            try {
                const [buffer] = await file.download();
                const type = await fileType.fromBuffer(buffer);

                if (!type || !type.ext) {
                    logger.warn(`Could not determine file type for ${name}`);
                    continue;
                }

                await file.delete();
                const newFile = bucket.file(`${name}.${type.ext}`);
                await newFile.save(buffer);

                if (name.includes('resized') || name.includes('archive'))
                    continue;

                const asset = await db.asset.findFirst({
                    where: { gcloudStoragePath: name },
                });

                if (asset) {
                    await db.asset.update({
                        where: { id: asset.id },
                        data: {
                            gcloudStoragePath: `${name}.${type.ext}`,
                            url: `https://storage.googleapis.com/${encodeURIComponent(
                                `${process.env.GCLOUD_STORAGE_BUCKET}/${name}.${type.ext}`
                            )}`,
                        },
                    });

                    updatedCount++;
                    logger.info(`Updated ${name} to ${name}.${type.ext}`);
                } else {
                    logger.warn(`No asset found for ${name}`);
                }
            } catch (err) {
                const error = err as Error;
                logger.error(`Error processing file ${name}: ${error.message}`);
            }
        }

        logger.info(`Finished ✅ - Resized ${updatedCount} images`);
    } catch (err) {
        const error = err as Error;
        logger.error(`Failed to process files: ${error.message}`);
    }
};

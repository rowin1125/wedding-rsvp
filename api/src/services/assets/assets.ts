import type { Prisma } from '@prisma/client';
import type {
    QueryResolvers,
    MutationResolvers,
    AssetRelationResolvers,
} from 'types/graphql';

import { validateWithSync } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { getStorageClient } from 'src/helpers/getGCPCredentials';
import { ALLOWED_FILE_TYPES } from 'src/lib/config';
import { db } from 'src/lib/db';
import Sentry from 'src/lib/sentry';

export const assets: QueryResolvers['assets'] = () => {
    return db.asset.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const asset: QueryResolvers['asset'] = ({ id }) => {
    return db.asset.findUnique({
        where: { id },
    });
};

export const createAssets: MutationResolvers['createAssets'] = async ({
    input,
    galleryId,
}) => {
    const bucket = await getStorageClient();
    const assetArray: Prisma.AssetCreateManyInput[] = [];

    try {
        for (const imageData of input) {
            validateWithSync(() => {
                let isValidFileType = false;
                for (const allowedType of ALLOWED_FILE_TYPES) {
                    if (imageData.fileType.startsWith(allowedType)) {
                        isValidFileType = true;
                        break;
                    }
                }

                if (!isValidFileType) {
                    throw new UserInputError(
                        `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(
                            ', '
                        )}`
                    );
                }

                return true;
            });
            const file = bucket.file(`${imageData.gcloudStoragePath}`);
            const url = file.publicUrl();

            const metaData = {} as Prisma.JsonObject;

            assetArray.push({
                id: imageData.uuid,
                url,
                metadata: metaData,
                galleryId: galleryId,
                gcloudStoragePath: imageData.gcloudStoragePath,
                fileType: imageData.fileType,
            });
        }

        const createdAssets = await db.asset.createMany({
            data: assetArray,
        });

        return createdAssets;
    } catch (err) {
        Sentry.captureException(err);

        const error = err as Error;
        throw new UserInputError(
            error.message ?? 'Error during asset creation'
        );
    }
};

export const requestSigningUrl: MutationResolvers['requestSigningUrl'] =
    async ({ gcloudStoragePath }) => {
        try {
            const bucket = await getStorageClient();

            const [url] = await bucket.file(gcloudStoragePath).getSignedUrl({
                action: 'write',
                version: 'v4',
                expires: Date.now() + 15 * 60 * 1000, // 15 minutes
                contentType: 'application/octet-stream',
            });

            return url;
        } catch (err) {
            console.error(err);
            const error = err as Error;
            throw new UserInputError(
                error.message ?? 'Error during asset creation'
            );
        }
    };

export const deleteAsset: MutationResolvers['deleteAsset'] = async ({ id }) => {
    const asset = await db.asset.findUnique({
        where: { id },
    });

    if (!asset) {
        throw new UserInputError('Asset not found');
    }

    const bucket = await getStorageClient();
    const file = bucket.file(asset.gcloudStoragePath);

    try {
        await file.delete();

        try {
            const thumbnailFile = bucket.file(
                asset.gcloudStoragePath.replace('original', 'thumbnail')
            );
            const previewFile = bucket.file(
                asset.gcloudStoragePath.replace('original', 'preview')
            );
            if (thumbnailFile) {
                await thumbnailFile.delete();
            }
            if (previewFile) {
                await previewFile.delete();
            }
        } catch (error) {
            console.info('No resized images found');
        }

        const deletedAssets = await db.asset.delete({
            where: { id },
        });
        return deletedAssets;
    } catch (error) {
        console.error(error);
        throw new UserInputError('Error during asset deletion');
    }
};

export const Asset: AssetRelationResolvers = {
    gallery: (_obj, { root }) => {
        return db.asset.findUnique({ where: { id: root?.id } }).gallery();
    },
    previewUrl: (obj, { root }) => {
        const googleDomain = root.url.split(
            process.env.GCLOUD_STORAGE_BUCKET
        )[0];

        return `${googleDomain}${
            process.env.GCLOUD_STORAGE_BUCKET
        }/${root.gcloudStoragePath.replace('original', 'preview')}`;
    },
    thumbnailUrl: (obj, { root }) => {
        const googleDomain = root.url.split(
            process.env.GCLOUD_STORAGE_BUCKET
        )[0];

        return `${googleDomain}${
            process.env.GCLOUD_STORAGE_BUCKET
        }/${root.gcloudStoragePath.replace('original', 'thumbnail')}`;
    },
};

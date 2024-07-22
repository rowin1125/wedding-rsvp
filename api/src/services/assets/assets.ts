import type { Prisma } from '@prisma/client';
import type { MutationResolvers, AssetRelationResolvers } from 'types/graphql';

import { validateWithSync } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { getStorageClient } from 'src/helpers/getGCPCredentials';
import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { ALLOWED_FILE_TYPES } from 'src/lib/config';
import { db } from 'src/lib/db';
import Sentry from 'src/lib/sentry';

export const createAssets: MutationResolvers['createAssets'] = async ({
    input,
    galleryId,
    mediaLibraryId,
    weddingId,
}) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: weddingId,
    });

    const bucket = await getStorageClient();
    const assetArray: Prisma.AssetCreateManyInput[] = [];

    if (mediaLibraryId) {
        const mediaLibrary = await db.mediaLibrary.findUnique({
            where: { id: mediaLibraryId },
        });

        if (!mediaLibrary) throw new UserInputError('Media library not found');

        const maxAllowedAssets = mediaLibrary.maxAllowedAssets;

        const existingAssets = await db.asset.count({
            where: { mediaLibraryId: mediaLibraryId },
        });

        if (existingAssets + input.length > maxAllowedAssets) {
            throw new UserInputError(
                `Max allowed assets exceeded. Allowed: ${maxAllowedAssets}`
            );
        }
    }

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
                mediaLibraryId: mediaLibraryId,
                gcloudStoragePath: imageData.gcloudStoragePath,
                fileType: imageData.fileType,
                originalFilename: imageData.originalFilename,
                weddingId,
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

export const updateAsset: MutationResolvers['updateAsset'] = async ({
    id,
    input,
}) => {
    const asset = await db.asset.findUnique({
        where: { id },
    });

    if (!asset) {
        throw new UserInputError('Asset not found');
    }

    isUserAssignedToWeddingValidator({
        requestWeddingId: asset.weddingId,
    });

    try {
        const updatedAsset = await db.asset.update({
            where: { id },
            data: input,
        });

        return updatedAsset;
    } catch (err) {
        Sentry.captureException(err);

        const error = err as Error;
        throw new UserInputError(error.message ?? 'Error during asset update');
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

    isUserAssignedToWeddingValidator({
        requestWeddingId: asset.weddingId,
    });

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
            const [thumbnailExists] = await thumbnailFile.exists();
            const [previewExists] = await previewFile.exists();

            if (thumbnailExists) {
                await thumbnailFile.delete();
            }
            if (previewExists) {
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

export const deleteAssets: MutationResolvers['deleteAssets'] = async ({
    ids,
}) => {
    const bucket = await getStorageClient();
    const deletePromises = [];

    const assets = await db.asset.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });

    if (assets.length !== ids.length) {
        throw new UserInputError('Invalid asset ids');
    }

    const firstAssetWeddingId = assets[0].weddingId;
    isUserAssignedToWeddingValidator({
        requestWeddingId: firstAssetWeddingId,
    });

    for (const asset of assets) {
        const file = bucket.file(asset.gcloudStoragePath);

        deletePromises.push(
            file
                .delete()
                .then(async () => {
                    // Check and delete thumbnail and preview images
                    const thumbnailFile = bucket.file(
                        asset.gcloudStoragePath.replace('original', 'thumbnail')
                    );
                    const previewFile = bucket.file(
                        asset.gcloudStoragePath.replace('original', 'preview')
                    );

                    const [thumbnailExists] = await thumbnailFile.exists();
                    if (thumbnailExists) {
                        await thumbnailFile.delete();
                    }

                    const [previewExists] = await previewFile.exists();
                    if (previewExists) {
                        await previewFile.delete();
                    }

                    // Delete the asset record from the database
                    return db.asset.delete({
                        where: { id: asset.id },
                    });
                })
                .catch((error) => {
                    console.error(
                        `Failed to delete file ${asset.gcloudStoragePath}:`,
                        error
                    );
                })
        );
    }

    return Promise.all(deletePromises);
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

import { createId } from '@paralleldrive/cuid2';
import faktory from 'faktory-worker';
import type {
    QueryResolvers,
    MutationResolvers,
    GalleryRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { getStorageClient } from 'src/helpers/getGCPCredentials';
import { db } from 'src/lib/db';
import { ONE_DAY_TIME } from 'src/lib/gcloudBackgroundDownloader';
import Sentry from 'src/lib/sentry';

export const galleries: QueryResolvers['galleries'] = () => {
    return db.gallery.findMany();
};

export const gallery: QueryResolvers['gallery'] = async ({ id }) => {
    return db.gallery.findUnique({
        where: { id },
    });
};

export const createGallery: MutationResolvers['createGallery'] = ({
    input,
}) => {
    const id = createId();

    const gcloudStoragePath = `${input.weddingId}/${id}`;
    return db.gallery.create({
        data: {
            ...input,
            id,
            gcloudStoragePath,
        },
    });
};

export const updateGallery: MutationResolvers['updateGallery'] = async ({
    id,
    input,
}) => {
    return db.gallery.update({
        data: removeNulls(input),
        where: { id },
    });
};

export const deleteGallery: MutationResolvers['deleteGallery'] = async ({
    id,
}) => {
    const gallery = await db.gallery.findUnique({
        where: { id },
    });
    if (!gallery) throw new Error('Gallery not found');
    const bucket = await getStorageClient();

    const qrCodeId = gallery.qrCodeId;
    if (qrCodeId) {
        await db.qrCode.delete({
            where: { id: qrCodeId },
        });
    }

    try {
        const deleteRegularFiles = bucket.deleteFiles({
            prefix: gallery.gcloudStoragePath,
            force: true,
        });
        const deleteThumbnailFiles = bucket.deleteFiles({
            prefix: `resized/thumbnail/${gallery.gcloudStoragePath}`,
            force: true,
        });
        const deletePreviewFiles = bucket.deleteFiles({
            prefix: `resized/preview/${gallery.gcloudStoragePath}`,
            force: true,
        });

        await Promise.all([
            deleteRegularFiles,
            deleteThumbnailFiles,
            deletePreviewFiles,
        ]);

        return db.gallery.delete({
            where: { id },
        });
    } catch (error) {
        Sentry.captureException(error);

        throw new UserInputError('Failed to delete gallery');
    }
};

export const downloadGallery: MutationResolvers['downloadGallery'] = async ({
    id,
}) => {
    const gallery = await db.gallery.findUnique({
        where: { id },
        include: {
            galleryDownloadRequests: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!gallery) {
        throw new Error('Gallery not found');
    }

    // TODO: Build in a feature to upgrade this on an user basis
    if (gallery.galleryDownloadRequests.length >= gallery.maxAllowedDownloads) {
        throw new UserInputError('Maximum number of download requests reached');
    }

    try {
        const downloadRequest = await db.galleryDownloadRequest.create({
            data: {
                gallery: {
                    connect: {
                        id: gallery.id,
                    },
                },
                status: 'PENDING',
                validUntil: new Date(Date.now() + ONE_DAY_TIME),
            },
        });

        const client = await faktory.connect({
            url: process.env.FAKTORY_URL,
            password: process.env.FAKTORY_PASSWORD,
            port: 7419,
        });
        await client
            .job('downloadAllFiles', {
                galleryId: id,
                downloadId: downloadRequest.id,
            })
            .push();
        await client.close();

        return 'Download aangevraagd. Ververs de pagina na enkele minuten om de downloadlink te zien. Deze link 1 dag geldig.';
    } catch (error) {
        Sentry.captureException(error);
        throw new UserInputError('Failed to download gallery');
    }
};

export const DEFAULT_PAGINATION_OFFSET = 28;

export const Gallery: GalleryRelationResolvers = {
    totalDownloadRequests: async (_obj, { root }) => {
        return db.galleryDownloadRequest.count({
            where: { galleryId: root?.id },
        });
    },
    galleryDownloadRequests: async (_obj, { root }) => {
        return db.gallery
            .findUnique({ where: { id: root?.id } })
            .galleryDownloadRequests({
                orderBy: {
                    createdAt: 'desc',
                },
            });
    },
    wedding: (_obj, { root }) => {
        return db.gallery.findUnique({ where: { id: root?.id } }).wedding();
    },
    assets: async (_obj, { root }) => {
        const items = await db.gallery
            .findUnique({ where: { id: root?.id } })
            .assets({
                skip: _obj?.skip || 0,
                take: _obj?.take || DEFAULT_PAGINATION_OFFSET,
                orderBy: {
                    createdAt: 'desc',
                },
            });

        const count = await db.asset.count({
            where: { galleryId: root?.id },
        });
        const pages = Math.ceil(
            count / (_obj?.take ?? DEFAULT_PAGINATION_OFFSET)
        );

        return {
            items,
            count,
            pages,
        };
    },
};

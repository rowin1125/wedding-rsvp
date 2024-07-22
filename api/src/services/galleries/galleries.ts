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
import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';
import { ONE_DAY_TIME } from 'src/lib/gcloudBackgroundDownloader';
import Sentry from 'src/lib/sentry';

export const galleries: QueryResolvers['galleries'] = ({ weddingId }) => {
    if (weddingId !== context.currentUser?.weddingId)
        throw new UserInputError('Unauthorized');
    return db.gallery.findMany({ where: { weddingId } });
};

export const gallery: QueryResolvers['gallery'] = async ({ id }) => {
    const gallery = await db.gallery.findUnique({
        where: { id },
    });
    if (!gallery) throw new Error('Gallery not found');

    return gallery;
};

export const createGallery: MutationResolvers['createGallery'] = ({
    input,
}) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: input.weddingId,
    });
    const id = createId();

    const gcloudStoragePath = `galleries/${input.weddingId}/${id}`;
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
    const gallery = await db.gallery.findUnique({
        where: { id },
    });

    if (!gallery) throw new Error('Gallery not found');
    isUserAssignedToWeddingValidator({
        requestWeddingId: gallery.weddingId,
    });

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
    isUserAssignedToWeddingValidator({
        requestWeddingId: gallery.weddingId,
    });
    const bucket = await getStorageClient();

    const qrCodeId = gallery.qrCodeId;
    if (qrCodeId) {
        await db.qrCode.delete({
            where: { id: qrCodeId },
        });
    }

    try {
        await bucket.deleteFiles({
            prefix: gallery.gcloudStoragePath,
            force: true,
        });

        return db.gallery.delete({
            where: { id },
        });
    } catch (error) {
        Sentry.captureException(error);
        console.log('error', error);

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

export const DEFAULT_GALLERY_PAGINATION_OFFSET = 28;

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
                take: _obj?.take || DEFAULT_GALLERY_PAGINATION_OFFSET,
                orderBy: {
                    createdAt: 'desc',
                },
            });

        const count = await db.asset.count({
            where: { galleryId: root?.id },
        });
        const pages = Math.ceil(
            count / (_obj?.take ?? DEFAULT_GALLERY_PAGINATION_OFFSET)
        );

        return {
            items,
            count,
            pages,
        };
    },
};

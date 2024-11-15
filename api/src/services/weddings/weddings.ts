import { createId } from '@paralleldrive/cuid2';
import type { Prisma } from '@prisma/client';
import { Role } from '@prisma/client';
import * as Sentry from '@sentry/node';
import type {
    QueryResolvers,
    MutationResolvers,
    WeddingRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { getStorageClient } from 'src/helpers/getGCPCredentials';
import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

export const wedding: QueryResolvers['wedding'] = async ({ id }) => {
    return db.wedding.findUnique({
        where: {
            id,
        },
        include: {
            bannerImage: true,
            partners: true,
            dayParts: true,
        },
    });
};

export const createWedding: MutationResolvers['createWedding'] = async ({
    input,
}) => {
    const userId = context.currentUser?.id;
    if (!userId) throw new UserInputError('No user found');

    const id = createId();
    const createWedding = db.wedding.create({
        data: {
            id,
            gcloudStoragePath: id,
            user: {
                connect: { id: userId },
            },
            mediaLibrary: {
                create: {
                    gcloudStoragePath: `media/${id}`,
                },
            },
            dayParts: {
                create: input.dayParts,
            },
            date: input.date,
            name: input.name,
            partners: {
                create: input.partners,
            },
            theme: input.theme,
            preferredSeason: input.preferredSeason ?? undefined,
            isAbroad: input.isAbroad ?? false,
        },
    });

    const updateUserRole = db.userRole.create({
        data: {
            userId,
            name: Role.WEDDING_OWNER,
        },
    });

    const [wedding] = await db.$transaction([createWedding, updateUserRole]);

    return wedding;
};

export const updateWedding: MutationResolvers['updateWedding'] = async ({
    id,
    input: { bannerImageId, bannerImageMetadata, ...input },
}) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: id,
    });

    // Find the wedding along with its current banner image
    const wedding = await db.wedding.findUnique({
        where: {
            id,
        },
        include: {
            bannerImage: true,
        },
    });

    if (!wedding) {
        throw new UserInputError('Wedding not found');
    }

    const currentWeddingHasBanner = !!wedding.bannerImage?.assetId;

    if (currentWeddingHasBanner) {
        await db.assetReference.delete({
            where: {
                id: wedding.bannerImage?.id,
            },
        });
    }

    return db.wedding.update({
        where: { id },
        data: {
            ...removeNulls(input),
            user: {
                connect: { id: context.currentUser?.id },
            },
            date: input.date ?? new Date(),
            gcloudStoragePath: id,
            bannerImage: bannerImageId
                ? {
                      create: {
                          asset: {
                              connect: { id: bannerImageId },
                          },
                          metadata: bannerImageMetadata as Prisma.JsonObject,
                      },
                  }
                : undefined,
        },
    });
};

export const deleteWedding: MutationResolvers['deleteWedding'] = async ({
    id,
}) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: id,
    });

    const wedding = await db.wedding.findUnique({
        where: {
            id,
        },
        include: {
            mediaLibrary: {
                select: {
                    gcloudStoragePath: true,
                },
            },
        },
    });

    if (!wedding) {
        throw new UserInputError('Wedding not found');
    }

    const galleries = await db.gallery.findMany({
        where: { weddingId: id },
    });

    if (galleries.length > 0) {
        const deleteQrCodePromises = galleries.map((gallery) => {
            if (!gallery.qrCodeId) return null;

            return db.qrCode.delete({
                where: { id: gallery.qrCodeId },
            });
        });

        try {
            await Promise.all(deleteQrCodePromises);
        } catch (error) {
            Sentry.captureException(error);
            console.error(error);
            throw new UserInputError(
                'Failed to delete galleries with qr codes'
            );
        }
    }
    const qrCodes = await db.qrCode.findMany({
        where: { weddingId: id },
    });

    if (qrCodes.length > 0) {
        const deleteQrCodePromises = qrCodes.map((qrCode) => {
            return db.qrCode.delete({
                where: { id: qrCode.id },
            });
        });

        try {
            await Promise.all(deleteQrCodePromises);
        } catch (error) {
            Sentry.captureException(error);
            console.error(error);
            throw new UserInputError('Failed to delete qr codes');
        }
    }

    const assetReferences = await db.assetReference.findMany({
        where: {
            weddingReferences: {
                id,
            },
        },
    });

    if (assetReferences.length > 0) {
        const deleteAssetReferencesPromises = assetReferences.map(
            (assetReference) => {
                return db.assetReference.delete({
                    where: { id: assetReference.id },
                });
            }
        );

        try {
            await Promise.all(deleteAssetReferencesPromises);
        } catch (error) {
            Sentry.captureException(error);
            console.error(error);
            throw new UserInputError('Failed to delete asset references');
        }
    }

    const bucket = await getStorageClient();

    try {
        await db.assetReference.deleteMany({
            where: {
                weddingRsvpLandingPage: {
                    weddingId: id,
                },
            },
        });

        const deleteWedding = db.wedding.delete({
            where: { id },
        });

        const deleteUserRole = db.userRole.deleteMany({
            where: {
                userId: context.currentUser?.id,
                name: Role.WEDDING_OWNER,
            },
        });

        await db.$transaction([deleteWedding, deleteUserRole]);

        // Finally delete the external files
        const deleteGalleryImagesPromise = bucket.deleteFiles({
            prefix: `galleries/${wedding.gcloudStoragePath}`,
            force: true,
        });

        const deleteMediaLibraryPromise = bucket.deleteFiles({
            prefix: wedding?.mediaLibrary?.gcloudStoragePath,
            force: true,
        });

        await Promise.all([
            deleteGalleryImagesPromise,
            deleteMediaLibraryPromise,
        ]);

        return wedding;
    } catch (error) {
        console.error(error);
        logger.error(error);
        throw new UserInputError('Failed to delete wedding');
    }
};

export const Wedding: WeddingRelationResolvers = {
    bannerImage: (_obj, { root }) => {
        return db.wedding.findUnique({ where: { id: root?.id } }).bannerImage();
    },
    mediaLibrary: (_obj, { root }) => {
        return db.wedding
            .findUnique({ where: { id: root?.id } })
            .mediaLibrary();
    },
    partners: (_obj, { root }) => {
        return db.wedding.findUnique({ where: { id: root?.id } }).partners();
    },
    dayParts: (_obj, { root }) => {
        return db.wedding.findUnique({ where: { id: root?.id } }).dayParts();
    },
    guests: (_obj, { root }) => {
        return db.wedding.findUnique({ where: { id: root?.id } }).guests();
    },
    guestGroups: (_obj, { root }) => {
        return db.wedding.findUnique({ where: { id: root?.id } }).guestGroups();
    },
    qrCodes: (_obj, { root }) => {
        return db.wedding.findUnique({ where: { id: root?.id } }).qrCodes();
    },
    weddingRsvpLandingPages: (_obj, { root }) => {
        return db.wedding
            .findUnique({ where: { id: root?.id } })
            .weddingRsvpLandingPages();
    },
    addresses: (_obj, { root }) => {
        return db.wedding.findUnique({ where: { id: root?.id } }).addresses();
    },
};

import { createId } from '@paralleldrive/cuid2';
import type { Prisma } from '@prisma/client';
import { Role } from '@prisma/client';
import type {
    QueryResolvers,
    MutationResolvers,
    WeddingRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const wedding: QueryResolvers['wedding'] = async ({ id }) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: id,
    });

    return db.wedding.findUnique({
        where: {
            id,
        },
        include: {
            weddingInvitation: {
                include: {
                    weddingGuests: true,
                },
            },
            bannerImage: true,
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
            ...input,
            gcloudStoragePath: id,
            user: {
                connect: { id: userId },
            },
            mediaLibrary: {
                create: {
                    gcloudStoragePath: `media/${id}`,
                },
            },
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
    // Validate user permissions
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

    const bucket = await getStorageClient();

    try {
        const deleteGalleryImagesPromise = bucket.deleteFiles({
            prefix: wedding.gcloudStoragePath,
            force: true,
        });

        const deleteMediaLibraryPromise = await bucket.deleteFiles({
            prefix: wedding?.mediaLibrary?.gcloudStoragePath,
            force: true,
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

        const deleteWeddingPromise = db.$transaction([
            deleteWedding,
            deleteUserRole,
        ]);

        const [deletedWeddingTransaction] = await Promise.all([
            deleteWeddingPromise,
            deleteGalleryImagesPromise,
            deleteMediaLibraryPromise,
        ]);

        const deletedWedding = deletedWeddingTransaction[0];

        return deletedWedding;
    } catch (error) {
        console.error(error);
        throw new UserInputError('Failed to delete wedding');
    }
};

export const Wedding: WeddingRelationResolvers = {
    weddingInvitation: (_obj, { root }) => {
        return db.wedding
            .findUnique({ where: { id: root?.id } })
            .weddingInvitation();
    },
    weddingGuests: (_obj, { root }) => {
        return db.wedding
            .findUnique({ where: { id: root?.id } })
            .weddingGuests();
    },
};

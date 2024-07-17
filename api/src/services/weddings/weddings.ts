import { createId } from '@paralleldrive/cuid2';
import { Role } from '@prisma/client';
import type {
    QueryResolvers,
    MutationResolvers,
    WeddingRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { getStorageClient } from 'src/helpers/getGCPCredentials';
import { db } from 'src/lib/db';
import Sentry from 'src/lib/sentry';

export const weddings: QueryResolvers['weddings'] = () => {
    return db.wedding.findMany();
};

export const wedding: QueryResolvers['wedding'] = ({ id }) => {
    return db.wedding.findUnique({
        where: { id },
        include: {
            weddingInvitation: {
                include: {
                    weddingGuests: true,
                },
            },
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

export const updateWedding: MutationResolvers['updateWedding'] = ({
    id,
    input,
}) => {
    return db.wedding.update({
        data: {
            ...removeNulls(input),
            user: {
                connect: { id: context.currentUser?.id },
            },
            date: input.date ?? new Date(),
            gcloudStoragePath: id,
        },
        where: { id },
    });
};

export const deleteWedding: MutationResolvers['deleteWedding'] = async ({
    id,
}) => {
    const wedding = await db.wedding.findUnique({
        where: { id },
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

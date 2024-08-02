import type {
    MutationResolvers,
    QueryResolvers,
    WeddingDayPartRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const weddingDayParts: QueryResolvers['weddingDayParts'] = () => {
    return db.weddingDayPart.findMany();
};

export const weddingDayPart: QueryResolvers['weddingDayPart'] = ({ id }) => {
    return db.weddingDayPart.findUnique({
        where: { id },
    });
};

export const updateWeddingDayParts: MutationResolvers['updateWeddingDayParts'] =
    async ({ input }) => {
        if (!context.currentUser?.weddingId)
            throw new Error('User is not assigned to a wedding');

        const weddingDayParts = await db.weddingDayPart.findMany({
            where: {
                weddingId: context.currentUser.weddingId,
            },
        });

        const requestWeddingId = weddingDayParts?.[0]?.weddingId;
        isUserAssignedToWeddingValidator({
            requestWeddingId,
        });

        // Separate existing parts (with id) and new parts (without id)
        const existingParts = input.filter((part) => part.id);
        const newParts = input.filter((part) => !part.id);

        // Update existing parts
        const updatedWeddingDayParts = await Promise.all(
            existingParts.map(async (part) => {
                if (!part.id) return null;
                return db.weddingDayPart.update({
                    where: { id: part.id },
                    data: {
                        ...removeNulls(part.input),
                    },
                });
            })
        );

        // Add new parts
        const createdWeddingDayParts = await Promise.all(
            newParts.map(async (part) => {
                if (!context.currentUser?.weddingId)
                    throw new Error('User is not assigned to a wedding');

                return db.weddingDayPart.create({
                    data: {
                        ...removeNulls(part.input),
                        name: part.input.name ?? '',
                        startTime:
                            part.input.startTime ?? new Date().toISOString(),
                        endTime: part.input.endTime ?? new Date().toISOString(),
                        wedding: {
                            connect: {
                                id: context.currentUser.weddingId,
                            },
                        },
                    },
                });
            })
        );

        // Handle deletion of parts that are not in the input
        const allIds = input.map((part) => part.id).filter(Boolean);
        const deletedWeddingDayParts = weddingDayParts.filter(
            (part) => !allIds.includes(part.id)
        );

        if (deletedWeddingDayParts.length > 0) {
            await db.weddingDayPart.deleteMany({
                where: {
                    id: {
                        in: deletedWeddingDayParts.map((part) => part.id),
                    },
                },
            });
        }

        return [...updatedWeddingDayParts, ...createdWeddingDayParts];
    };

export const WeddingDayPart: WeddingDayPartRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.weddingDayPart
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
};

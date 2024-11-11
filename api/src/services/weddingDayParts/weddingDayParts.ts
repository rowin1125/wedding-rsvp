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

        if (createdWeddingDayParts.length > 0) {
            // For any existing weddingInvitationResponse that has dayPartPresent, make new responses for
            // all existing dayPartPresent  for the new dayPart and set the new dayParts to UNKNOWN
            const allGuests = await db.guest.findMany({
                where: {
                    weddingId: context.currentUser.weddingId,
                },
                include: {
                    guestWeddingResponse: true,
                },
            });
            await Promise.all(
                createdWeddingDayParts
                    .map(async (part) =>
                        allGuests.map(async (guest) => {
                            return db.guestDayPartPresent.create({
                                data: {
                                    guest: {
                                        connect: {
                                            id: guest.id,
                                        },
                                    },
                                    weddingDayPart: {
                                        connect: {
                                            id: part.id,
                                        },
                                    },
                                    guestWeddingResponseStatus: 'UNKNOWN',
                                    // If the guest has a wedding response, connect it
                                    ...(guest.guestWeddingResponse?.id
                                        ? {
                                              guestWeddingResponse: {
                                                  connect: {
                                                      id: guest
                                                          .guestWeddingResponse
                                                          .id,
                                                  },
                                              },
                                          }
                                        : {}),
                                    // If the guest has a weddingRsvpLandingPageId, connect it
                                    ...(guest.guestWeddingResponse
                                        ?.weddingRsvpLandingPageId
                                        ? {
                                              weddingRsvpLandingPage: {
                                                  connect: {
                                                      id: guest
                                                          .guestWeddingResponse
                                                          ?.weddingRsvpLandingPageId,
                                                  },
                                              },
                                          }
                                        : {}),
                                },
                            });
                        })
                    )
                    .flat()
            );
        }

        return [...updatedWeddingDayParts, ...createdWeddingDayParts];
    };

export const WeddingDayPart: WeddingDayPartRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.weddingDayPart
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
    guestDayPartsPresents: (_obj, { root }) => {
        return db.weddingDayPart
            .findUnique({ where: { id: root?.id } })
            .guestDayPartsPresents();
    },
    totalGuests: async (_obj, { root }) => {
        const totalCount = await db.guestDayPartPresent.count({
            where: {
                weddingDayPartId: root.id,
                AND: {
                    guestWeddingResponseStatus: 'ACCEPTED',
                },
            },
        });

        return totalCount;
    },
    weddingRsvpLandingPages: (_obj, { root }) => {
        return db.weddingDayPart
            .findUnique({ where: { id: root?.id } })
            .weddingRsvpLandingPages();
    },
};

import type {
    QueryResolvers,
    MutationResolvers,
    WeddingInvitationResponseRelationResolvers,
    GuestWeddingResponseStatus,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const weddingInvitationResponses: QueryResolvers['weddingInvitationResponses'] =
    ({ weddingId, input }) => {
        isUserAssignedToWeddingValidator({
            requestWeddingId: weddingId,
        });

        return db.weddingInvitationResponse.findMany({
            where: {
                weddingId,
                ...(input?.filterAssignedUsers
                    ? {
                          AND: {
                              guestWeddingResponses: {
                                  some: {
                                      guest: {
                                          guestGroupId: null,
                                      },
                                  },
                              },
                          },
                      }
                    : {}),
            },
            include: {
                address: true,
                guestWeddingResponses: {
                    include: {
                        guest: true,
                        dayPartsPresent: true,
                    },
                },
            },
        });
    };

export const weddingInvitationResponse: QueryResolvers['weddingInvitationResponse'] =
    ({ id }) => {
        return db.weddingInvitationResponse.findUnique({
            where: { id },
            include: {
                address: true,
                guestWeddingResponses: {
                    include: {
                        guest: true,
                        dayPartsPresent: true,
                    },
                },
            },
        });
    };

export const createWeddingInvitationResponse: MutationResolvers['createWeddingInvitationResponse'] =
    async ({ input }) => {
        // Check if the wedding exists
        const wedding = await db.wedding.findUnique({
            where: { id: input.weddingId },
            include: {
                dayParts: true,
            },
        });

        if (!wedding) {
            throw new UserInputError('Wedding not found');
        }

        return db.$transaction(async (db) => {
            // Create address
            const address = await db.address.create({
                data: {
                    ...removeNulls(input.address),
                    wedding: { connect: { id: input.weddingId } },
                },
            });

            // Create guests and their responses
            const guestWeddingResponses = await Promise.all(
                input.guestWeddingResponses.map(async (gwr) => {
                    const guest = await db.guest.create({
                        data: {
                            firstName: gwr.guest.firstName,
                            lastName: gwr.guest.lastName,
                            email: gwr.guest.email,
                            phoneNumber: gwr.guest.phoneNumber,
                            dietary:
                                gwr.guest.dietary?.filter((d) => d !== null) ??
                                [],
                            isChild: gwr.guest.isChild || false,
                            notes: gwr.guest.notes,
                            wedding: { connect: { id: input.weddingId } },
                            address: { connect: { id: address.id } },
                            guestOrigin: gwr.guest.guestOrigin ?? 'RSVP',
                        },
                    });

                    const guestWeddingResponse =
                        await db.guestWeddingResponse.create({
                            data: {
                                remarks: gwr.remarks,
                                guest: { connect: { id: guest.id } },
                                weddingRsvpLandingPage: {
                                    connect: {
                                        id: input.weddingRsvpLandingPageId,
                                    },
                                },
                            },
                        });

                    const uninvitedDayParts = wedding.dayParts.filter(
                        (dayPart) =>
                            !gwr.dayPartsPresent.some(
                                (dpp) => dpp.weddingDayPartId === dayPart.id
                            )
                    );

                    // Create GuestDayPartPresent entries
                    await db.guestDayPartPresent.createMany({
                        data: [
                            ...gwr.dayPartsPresent.map((dpp) => ({
                                guestWeddingResponseId: guestWeddingResponse.id,
                                weddingDayPartId: dpp.weddingDayPartId,
                                guestWeddingResponseStatus:
                                    dpp.guestWeddingResponseStatus,
                                guestId: guest.id,
                                weddingRsvpLandingPageId:
                                    input.weddingRsvpLandingPageId,
                            })),
                            ...uninvitedDayParts.map((dayPart) => ({
                                guestWeddingResponseId: guestWeddingResponse.id,
                                weddingDayPartId: dayPart.id,
                                guestWeddingResponseStatus:
                                    'UNINVITED' as GuestWeddingResponseStatus,
                                guestId: guest.id,
                                weddingRsvpLandingPageId:
                                    input.weddingRsvpLandingPageId,
                            })),
                        ],
                    });

                    return guestWeddingResponse;
                })
            );

            // Create WeddingInvitationResponse
            const weddingInvitationResponse =
                await db.weddingInvitationResponse.create({
                    data: {
                        wedding: { connect: { id: input.weddingId } },
                        address: { connect: { id: address.id } },
                        addressId: address.id,
                        guestWeddingResponses: {
                            connect: guestWeddingResponses.map((gwr) => ({
                                id: gwr.id,
                            })),
                        },
                        weddingRsvpLandingPage: {
                            connect: {
                                id: input.weddingRsvpLandingPageId,
                            },
                        },
                    },
                    include: {
                        address: true,
                        guestWeddingResponses: {
                            include: {
                                guest: true,
                                dayPartsPresent: true,
                            },
                        },
                    },
                });

            return weddingInvitationResponse;
        });
    };

export const updateWeddingInvitationResponse: MutationResolvers['updateWeddingInvitationResponse'] =
    async ({ id, input }) => {
        const existingResponse = await db.weddingInvitationResponse.findUnique({
            where: { id },
            include: {
                address: true,
                guestWeddingResponses: {
                    include: {
                        guest: true,
                        dayPartsPresent: true,
                    },
                },
            },
        });

        if (!existingResponse) {
            throw new UserInputError('Wedding invitation response not found');
        }

        return db.$transaction(async (db) => {
            // Update address
            if (input.address) {
                await db.address.update({
                    where: { id: existingResponse.address?.id },
                    data: removeNulls(input.address),
                });
            }

            // Get the IDs of guestWeddingResponses in the input
            const inputGuestWeddingResponseIds = input.guestWeddingResponses
                .map((gwr) => gwr.guestWeddingResponseId)
                .filter((id): id is string => id !== undefined);

            // Remove guestWeddingResponses that are not in the input
            await db.guestWeddingResponse.deleteMany({
                where: {
                    id: {
                        notIn: inputGuestWeddingResponseIds,
                    },
                    weddingInvitationResponseId: id,
                },
            });

            // Update or create guestWeddingResponses
            for (const gwr of input.guestWeddingResponses) {
                // Update guest
                const newOrUpdatedGuest = await db.guest.upsert({
                    where: { id: gwr.input.guest?.guestId ?? '' },
                    update: removeNulls(gwr.input.guest?.input ?? {}),
                    create: {
                        firstName: gwr.input.guest?.input?.firstName ?? '',
                        lastName: gwr.input.guest?.input?.lastName ?? '',
                        email: gwr.input.guest?.input?.email,
                        phoneNumber: gwr.input.guest?.input?.phoneNumber,
                        dietary:
                            gwr.input.guest?.input?.dietary?.filter(
                                (d) => d !== null
                            ) ?? [],
                        isChild: gwr.input.guest?.input?.isChild ?? false,
                        notes: gwr.input.guest?.input?.notes,
                        guestOrigin: 'RSVP',
                        wedding: {
                            connect: {
                                id: existingResponse.weddingId,
                            },
                        },
                        address: {
                            connect: {
                                id: existingResponse.address?.id,
                            },
                        },
                    },
                });

                // Update or create guestWeddingResponse
                const updatedGuestWeddingResponse =
                    await db.guestWeddingResponse.upsert({
                        where: {
                            id: gwr.guestWeddingResponseId ?? '',
                        },
                        create: {
                            remarks: gwr.input.remarks,
                            weddingInvitationResponse: { connect: { id } },
                            guest: {
                                connect: { id: newOrUpdatedGuest.id },
                            },
                        },
                        update: {
                            remarks: gwr.input.remarks,
                        },
                    });

                // Update or create GuestDayPartPresent entries
                for (const dpp of gwr.input.dayPartsPresent) {
                    await db.guestDayPartPresent.upsert({
                        where: {
                            id: dpp.id ?? '',
                        },
                        create: {
                            ...removeNulls(dpp.input),
                            weddingDayPartId: dpp.input.weddingDayPartId ?? '',
                            guestWeddingResponseId:
                                updatedGuestWeddingResponse.id,
                            guestId: newOrUpdatedGuest.id,
                        },
                        update: {
                            guestWeddingResponseStatus:
                                dpp.input.guestWeddingResponseStatus ??
                                'UNKNOWN',
                        },
                    });
                }

                // Remove GuestDayPartPresent entries that are not in the input
                const inputDayPartPresentIds = gwr.input.dayPartsPresent
                    .map((dpp) => dpp.id)
                    .filter(Boolean) as string[];

                if (inputDayPartPresentIds.length > 0) {
                    await db.guestDayPartPresent.deleteMany({
                        where: {
                            id: {
                                notIn: inputDayPartPresentIds,
                            },
                            guestWeddingResponseId:
                                updatedGuestWeddingResponse.id,
                        },
                    });
                }

                // Remove Guest entries that are not in the input
                const removedGuests =
                    existingResponse.guestWeddingResponses.filter(
                        (gwr) =>
                            !input.guestWeddingResponses.some(
                                (igwr) =>
                                    igwr.input.guest?.input?.firstName ===
                                        gwr.guest.firstName ||
                                    igwr.input.guest?.input?.lastName ===
                                        gwr.guest.lastName ||
                                    igwr.input.guest?.input.email ===
                                        gwr.guest.email ||
                                    igwr.input.guest?.input.phoneNumber ===
                                        gwr.guest.phoneNumber
                            )
                    );

                if (removedGuests.length > 0) {
                    await db.guest.deleteMany({
                        where: {
                            id: {
                                in: removedGuests.map((gwr) => gwr.guestId),
                            },
                        },
                    });
                }
            }

            // Fetch and return the updated WeddingInvitationResponse
            const updatedWeddingInvitationResponse =
                await db.weddingInvitationResponse.findUnique({
                    where: { id },
                    include: {
                        address: true,
                        guestWeddingResponses: {
                            include: {
                                guest: true,
                                dayPartsPresent: true,
                            },
                        },
                    },
                });

            if (!updatedWeddingInvitationResponse) {
                throw new Error(
                    'Failed to retrieve updated wedding invitation response'
                );
            }

            return updatedWeddingInvitationResponse;
        });
    };

export const deleteWeddingInvitationResponse: MutationResolvers['deleteWeddingInvitationResponse'] =
    ({ id }) => {
        return db.weddingInvitationResponse.delete({
            where: { id },
            include: {
                address: true,
                guestWeddingResponses: {
                    include: {
                        guest: true,
                        dayPartsPresent: true,
                    },
                },
            },
        });
    };

export const WeddingInvitationResponse: WeddingInvitationResponseRelationResolvers =
    {
        guestWeddingResponses: (_obj, { root }) => {
            return db.weddingInvitationResponse
                .findUnique({ where: { id: root?.id } })
                .guestWeddingResponses();
        },
        wedding: (_obj, { root }) => {
            return db.weddingInvitationResponse
                .findUnique({ where: { id: root?.id } })
                .wedding();
        },
        weddingRsvpLandingPage: (_obj, { root }) => {
            return db.weddingInvitationResponse
                .findUnique({ where: { id: root?.id } })
                .weddingRsvpLandingPage();
        },
    };

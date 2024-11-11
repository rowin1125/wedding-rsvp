import type {
    QueryResolvers,
    MutationResolvers,
    GuestRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const guests: QueryResolvers['guests'] = ({ weddingId, input }) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: weddingId,
    });
    const filteredInput = removeNulls(input || []);

    return db.guest.findMany({
        where: { weddingId, ...filteredInput },
    });
};

export const guest: QueryResolvers['guest'] = async ({ id }) => {
    const guest = await db.guest.findUnique({
        where: { id },
    });

    if (!guest) return null;

    isUserAssignedToWeddingValidator({
        requestWeddingId: guest.weddingId,
    });

    return guest;
};

export const createGuest: MutationResolvers['createGuest'] = async ({
    input: payload,
}) => {
    if (!context.currentUser?.weddingId)
        throw new Error('No wedding found for user');

    if (!payload.guestGroupId) throw new Error('Guest group ID is required');

    const { guestGroupId, dayPartsPresent, ...input } = payload;

    const group = await db.guestGroup.findUnique({
        where: { id: guestGroupId },
        include: { address: { select: { id: true } } },
    });

    if (!group) throw new Error('Guest group not found');

    isUserAssignedToWeddingValidator({
        requestWeddingId: group?.weddingId,
    });

    return db.guest.create({
        data: {
            ...removeNulls(input),
            firstName: input.firstName,
            lastName: input.lastName,
            guestGroup: { connect: { id: guestGroupId } },
            wedding: { connect: { id: context.currentUser?.weddingId } },
            address: { connect: { id: group.address?.id } },
            guestDayPartsPresents: {
                createMany: {
                    data: dayPartsPresent?.length
                        ? dayPartsPresent?.map((dayPart) => ({
                              weddingDayPartId: dayPart.weddingDayPartId,
                              guestWeddingResponseStatus:
                                  dayPart.guestWeddingResponseStatus,
                          }))
                        : [],
                },
            },
        },
    });
};

export const updateGuest: MutationResolvers['updateGuest'] = async ({
    id,
    input,
}) => {
    const guest = await db.guest.findUnique({ where: { id } });
    if (!guest) throw new Error('Guest not found');

    isUserAssignedToWeddingValidator({
        requestWeddingId: guest.weddingId,
    });

    return db.guest.update({
        data: removeNulls(input),
        where: { id },
    });
};

export const deleteGuest: MutationResolvers['deleteGuest'] = async ({ id }) => {
    const guest = await db.guest.findUnique({
        where: { id },
        include: {
            guestWeddingResponse: {
                include: {
                    weddingInvitationResponse: {
                        include: {
                            guestWeddingResponses: true,
                        },
                    },
                },
            },
        },
    });

    if (!guest) throw new Error('Guest not found');

    isUserAssignedToWeddingValidator({
        requestWeddingId: guest.weddingId,
    });
    const hasWeddingResponse = !!guest.guestWeddingResponse?.id;
    if (hasWeddingResponse) {
        const isLastGuestOfWeddingResponse =
            guest.guestWeddingResponse?.weddingInvitationResponse
                ?.guestWeddingResponses.length === 1;

        if (isLastGuestOfWeddingResponse) {
            if (!guest.guestWeddingResponse?.weddingInvitationResponseId)
                return;

            await db.weddingInvitationResponse.delete({
                where: {
                    id: guest.guestWeddingResponse.weddingInvitationResponseId,
                },
            });
        } else {
            await db.guestWeddingResponse.delete({
                where: { id: guest.guestWeddingResponse?.id },
            });
        }
    }

    return db.guest.delete({
        where: { id },
    });
};

export const connectGuestToRsvp: MutationResolvers['connectGuestToRsvp'] =
    async ({ input }) => {
        const rsvpGuest = await db.guest.findUnique({
            where: { id: input.rsvpGuestId },
            include: {
                address: true,
                guestWeddingResponse: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const guestListGuest = await db.guest.findUnique({
            where: { id: input.guestListGuestId },
            include: {
                address: true,
                guestGroup: {
                    include: {
                        guests: true,
                    },
                },
            },
        });

        if (rsvpGuest?.weddingId !== guestListGuest?.weddingId) {
            throw new Error('Guests are not part of the same wedding');
        }

        if (!rsvpGuest || !guestListGuest) throw new Error('Guest not found');

        isUserAssignedToWeddingValidator({
            requestWeddingId: rsvpGuest.weddingId,
        });

        return db.$transaction(async (db) => {
            const deleteGuestPromise = db.guest.delete({
                where: { id: input.guestListGuestId },
            });

            const updateRsvpGuestPromise = db.guest.update({
                where: { id: input.rsvpGuestId },
                data: {
                    connectedViaRsvp: true,
                },
            });

            if (!guestListGuest.addressId) {
                throw new Error(
                    'Please select an guestList which has an address'
                );
            }
            if (!rsvpGuest.addressId) {
                throw new Error(
                    'Please select a rsvpGuest which has an address'
                );
            }

            const updateGuestAddressesPromises =
                guestListGuest?.guestGroup?.guests?.map((guest) => {
                    return db.guest.update({
                        where: { id: guest.id },
                        data: {
                            address: {
                                connect: { id: rsvpGuest.addressId ?? '' },
                            },
                        },
                    });
                });

            await Promise.all(updateGuestAddressesPromises ?? []);
            await Promise.all([deleteGuestPromise, updateRsvpGuestPromise]);

            if (!guestListGuest.guestGroupId) {
                throw new Error(
                    'Please select a guest which is part of a group'
                );
            }

            if (!rsvpGuest.guestWeddingResponse?.id) {
                throw new Error(
                    'Please select an guest which has a wedding response'
                );
            }

            if (rsvpGuest.addressId !== guestListGuest.addressId) {
                await db.address.delete({
                    where: { id: guestListGuest.addressId },
                });

                await db.guestGroup.update({
                    where: { id: guestListGuest.guestGroupId },
                    data: {
                        address: {
                            connect: { id: rsvpGuest.addressId },
                        },
                    },
                });
            }

            const allDayParts = await db.weddingDayPart.findMany({
                where: { weddingId: rsvpGuest.weddingId },
            });

            const guestWeddingResponse =
                await db.guestWeddingResponse.findUnique({
                    where: { id: rsvpGuest.guestWeddingResponse?.id },
                    include: {
                        dayPartsPresent: {
                            select: {
                                weddingDayPartId: true,
                            },
                        },
                    },
                });

            const missingDayParts = allDayParts?.filter(
                (dayPart) =>
                    !guestWeddingResponse?.dayPartsPresent.some(
                        (presentDayPart) =>
                            presentDayPart.weddingDayPartId === dayPart.id
                    )
            );

            if (missingDayParts.length > 0) {
                await db.guestWeddingResponse.update({
                    data: {
                        dayPartsPresent: {
                            createMany: {
                                data: missingDayParts.map((dayPart) => ({
                                    weddingDayPartId: dayPart.id,
                                    guestId: rsvpGuest.id,
                                    guestWeddingResponseStatus: 'UNKNOWN',
                                })),
                            },
                        },
                    },
                    where: { id: rsvpGuest.guestWeddingResponse?.id },
                });
            }

            return db.guest.update({
                where: { id: input.rsvpGuestId },
                data: {
                    guestGroup: {
                        connect: { id: guestListGuest.guestGroupId },
                    },
                },
            });
        });
    };

export const Guest: GuestRelationResolvers = {
    fullName: (_obj, { root }) => {
        return `${root.firstName} ${root.lastName}`;
    },
    guestGroup: (_obj, { root }) => {
        return db.guest.findUnique({ where: { id: root?.id } }).guestGroup();
    },
    guestWeddingResponse: (_obj, { root }) => {
        return db.guest
            .findUnique({ where: { id: root?.id } })
            .guestWeddingResponse();
    },
    guestDayPartsPresents: (_obj, { root }) => {
        return db.guest
            .findUnique({ where: { id: root?.id } })
            .guestDayPartsPresents();
    },
    address: (_obj, { root }) => {
        return db.guest.findUnique({ where: { id: root?.id } }).address();
    },
    wedding: (_obj, { root }) => {
        return db.guest.findUnique({ where: { id: root?.id } }).wedding();
    },
};

import type {
    QueryResolvers,
    MutationResolvers,
    GuestGroupRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const guestGroups: QueryResolvers['guestGroups'] = ({ weddingId }) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: weddingId,
    });

    return db.guestGroup.findMany({
        orderBy: { createdAt: 'asc' },
        where: { weddingId },
        include: {
            address: true,
        },
    });
};

export const guestGroup: QueryResolvers['guestGroup'] = async ({ id }) => {
    const group = await db.guestGroup.findUnique({
        where: { id },
        include: {
            address: true,
        },
    });

    if (!group) return null;

    isUserAssignedToWeddingValidator({
        requestWeddingId: group.weddingId,
    });

    return group;
};

export const createGuestGroup: MutationResolvers['createGuestGroup'] = async ({
    input,
}) => {
    const weddingId = context.currentUser?.weddingId;

    if (!weddingId) throw new Error('No wedding found for user');

    isUserAssignedToWeddingValidator({
        requestWeddingId: weddingId,
    });

    const guestGroup = await db.guestGroup.create({
        data: {
            guestGroupType: input.guestGroupType,
            weddingId,
            guestGroupRelationType: input.guestGroupRelationType,
            name: input.name,
        },
    });

    const createGuestPromises = input.guests?.map((guest) => {
        if (guest.dietary === null) return;

        return db.guest.create({
            data: {
                weddingId,
                firstName: guest.firstName ?? '',
                lastName: guest.lastName ?? '',
                phoneNumber: guest.phoneNumber ?? '',
                email: guest.email ?? '',
                dietary: guest.dietary?.filter((d) => d !== null) ?? [],
                isChild: guest.isChild ?? false,
                notes: guest.notes ?? '',
                guestOrigin: guest.guestOrigin ?? 'GUEST_LIST',
                guestGroupId: guestGroup.id,
                guestDayPartsPresents: guest.dayPartsPresent?.length
                    ? {
                          create: guest.dayPartsPresent.map((dayPart) => ({
                              weddingDayPartId: dayPart.weddingDayPartId,
                              guestWeddingResponseStatus:
                                  dayPart.guestWeddingResponseStatus ??
                                  'UNKNOWN',
                          })),
                      }
                    : undefined,
            },
        });
    });

    await Promise.all(createGuestPromises?.filter(Boolean) ?? []);

    const guests = await db.guest.findMany({
        where: { guestGroupId: guestGroup.id },
    });

    await db.address.create({
        data: {
            street: input.address?.street,
            houseNumber: input.address?.houseNumber,
            zipCode: input.address?.zipCode,
            city: input.address?.city,
            country: input.address?.country,
            livesAbroad: input.address?.livesAbroad,
            guests: {
                connect: guests.map((guest) => ({
                    id: guest.id,
                })),
            },
            guestGroup: {
                connect: { id: guestGroup.id },
            },
        },
    });

    return guestGroup;
};

export const updateGuestGroup: MutationResolvers['updateGuestGroup'] = async ({
    id,
    input: payload,
}) => {
    const group = await db.guestGroup.findUnique({
        where: { id },
        include: {
            address: true,
        },
    });

    if (!group) throw new Error('Guest group not found');
    isUserAssignedToWeddingValidator({
        requestWeddingId: group?.weddingId,
    });

    const { address, ...input } = payload;

    if (address) {
        await db.address.update({
            data: {
                ...removeNulls(address.input),
            },
            where: { id: address.id },
        });
    }

    return db.guestGroup.update({
        data: {
            ...removeNulls(input),
        },
        where: { id },
        include: {
            address: true,
        },
    });
};

export const deleteGuestGroup: MutationResolvers['deleteGuestGroup'] = async ({
    id,
}) => {
    const group = await db.guestGroup.findUnique({
        where: { id },
    });

    if (!group) throw new Error('Guest group not found');
    isUserAssignedToWeddingValidator({
        requestWeddingId: group?.weddingId,
    });

    return db.guestGroup.delete({
        where: { id },
    });
};

export const GuestGroup: GuestGroupRelationResolvers = {
    guests: (_obj, { root }) => {
        return db.guestGroup.findUnique({ where: { id: root?.id } }).guests();
    },
    wedding: (_obj, { root }) => {
        return db.guestGroup.findUnique({ where: { id: root?.id } }).wedding();
    },
    address: (_obj, { root }) => {
        return db.guestGroup.findUnique({ where: { id: root?.id } }).address();
    },
};

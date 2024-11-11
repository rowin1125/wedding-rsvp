import type {
    QueryResolvers,
    MutationResolvers,
    AddressRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const addresses: QueryResolvers['addresses'] = () => {
    return db.address.findMany();
};

export const address: QueryResolvers['address'] = ({ id }) => {
    return db.address.findUnique({
        where: { id },
    });
};

export const createAddress: MutationResolvers['createAddress'] = ({
    input,
}) => {
    isUserAssignedToWeddingValidator({
        requestWeddingId: input.weddingId ?? '',
        message: 'You are not allowed to create an address',
    });
    return db.address.create({
        data: {
            ...removeNulls(input),
            wedding: {
                connect: {
                    id: input.weddingId ?? context.currentUser?.weddingId ?? '',
                },
            },
        },
        include: {
            guestGroup: true,
            guests: true,
            weddingInvitationResponse: true,
        },
    });
};

export const updateAddress: MutationResolvers['updateAddress'] = async ({
    id,
    input,
}) => {
    const address = await db.address.findUnique({ where: { id } });

    isUserAssignedToWeddingValidator({
        requestWeddingId: address?.weddingId ?? '',
        message: 'You are not allowed to update this address',
    });

    return db.address.update({
        data: removeNulls(input),
        where: { id },
        include: {
            guestGroup: true,
            guests: true,
            weddingInvitationResponse: true,
        },
    });
};

export const deleteAddress: MutationResolvers['deleteAddress'] = async ({
    id,
}) => {
    const address = await db.address.findUnique({ where: { id } });
    isUserAssignedToWeddingValidator({
        requestWeddingId: address?.weddingId ?? '',
        message: 'You are not allowed to delete this address',
    });

    return db.address.delete({
        where: { id },
        include: {
            guestGroup: true,
            guests: true,
            weddingInvitationResponse: true,
        },
    });
};

export const Address: AddressRelationResolvers = {
    addressDataMissing: (_obj, { root: address }) => {
        return (
            !address.street ||
            !address.houseNumber ||
            !address.zipCode ||
            !address.city
        );
    },
    guestGroup: (_obj, { root }) => {
        return db.address.findUnique({ where: { id: root?.id } }).guestGroup();
    },
    guests: (_obj, { root }) => {
        return db.address.findUnique({ where: { id: root?.id } }).guests();
    },
    weddingInvitationResponse: (_obj, { root }) => {
        return db.address
            .findUnique({ where: { id: root?.id } })
            .weddingInvitationResponse();
    },
};

import type {
    QueryResolvers,
    MutationResolvers,
    AddressRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

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
    return db.address.create({
        data: input,
        include: {
            guestGroup: true,
            guests: true,
            weddingInvitationResponse: true,
        },
    });
};

export const updateAddress: MutationResolvers['updateAddress'] = ({
    id,
    input,
}) => {
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

export const deleteAddress: MutationResolvers['deleteAddress'] = ({ id }) => {
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

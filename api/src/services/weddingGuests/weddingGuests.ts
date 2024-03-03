import type {
    QueryResolvers,
    MutationResolvers,
    WeddingGuestRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const weddingGuests: QueryResolvers['weddingGuests'] = () => {
    return db.weddingGuest.findMany();
};

export const weddingGuest: QueryResolvers['weddingGuest'] = ({ id }) => {
    return db.weddingGuest.findUnique({
        where: { id },
    });
};

export const createWeddingGuest: MutationResolvers['createWeddingGuest'] = ({
    input,
}) => {
    return db.weddingGuest.create({
        data: {
            ...input,
            name: input.name || `${input.firstName} ${input.lastName}`,
            firstName: input.firstName || '',
            lastName: input.lastName || '',
        },
    });
};

export const updateWeddingGuest: MutationResolvers['updateWeddingGuest'] = ({
    id,
    input: { name, firstName, lastName },
}) => {
    return db.weddingGuest.update({
        data: {
            name: name || `${firstName} ${lastName}`,
            firstName: firstName || '',
            lastName: lastName || '',
        },
        where: { id },
    });
};

export const deleteWeddingGuest: MutationResolvers['deleteWeddingGuest'] = ({
    id,
}) => {
    return db.weddingGuest.delete({
        where: { id },
    });
};

export const WeddingGuest: WeddingGuestRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.weddingGuest
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
    weddingInvitation: (_obj, { root }) => {
        return db.weddingGuest
            .findUnique({ where: { id: root?.id } })
            .weddingInvitation();
    },
};

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
        data: input,
    });
};

export const updateWeddingGuest: MutationResolvers['updateWeddingGuest'] = ({
    id,
    input: { name },
}) => {
    return db.weddingGuest.update({
        data: { name },
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

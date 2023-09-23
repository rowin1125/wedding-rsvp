import type {
    QueryResolvers,
    MutationResolvers,
    WeddingRelationResolvers,
} from 'types/graphql';

import { UserInputError } from '@redwoodjs/graphql-server';

import { db } from 'src/lib/db';

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

export const createWedding: MutationResolvers['createWedding'] = ({
    input,
}) => {
    const userId = context.currentUser?.id;
    if (!userId) throw new UserInputError('No user found');

    return db.wedding.create({
        data: {
            ...input,
            user: {
                connect: { id: userId },
            },
        },
    });
};

export const updateWedding: MutationResolvers['updateWedding'] = ({
    id,
    input,
}) => {
    return db.wedding.update({
        data: {
            ...input,
            user: {
                connect: { id: context.currentUser?.id },
            },
        },
        where: { id },
    });
};

export const deleteWedding: MutationResolvers['deleteWedding'] = ({ id }) => {
    return db.wedding.delete({
        where: { id },
    });
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

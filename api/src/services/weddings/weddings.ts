import { Role } from '@prisma/client';
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

export const createWedding: MutationResolvers['createWedding'] = async ({
    input,
}) => {
    const userId = context.currentUser?.id;
    if (!userId) throw new UserInputError('No user found');

    const createWedding = db.wedding.create({
        data: {
            ...input,
            user: {
                connect: { id: userId },
            },
        },
    });

    const updateUserRole = db.userRole.create({
        data: {
            userId,
            name: Role.WEDDING_OWNER,
        },
    });

    const [wedding] = await db.$transaction([createWedding, updateUserRole]);

    return wedding;
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
            date: input.date ?? new Date(),
        },
        where: { id },
    });
};

export const deleteWedding: MutationResolvers['deleteWedding'] = async ({
    id,
}) => {
    const deleteWedding = db.wedding.delete({
        where: { id },
    });

    const deleteUserRole = db.userRole.deleteMany({
        where: {
            userId: context.currentUser?.id,
            name: Role.WEDDING_OWNER,
        },
    });

    const [wedding] = await db.$transaction([deleteWedding, deleteUserRole]);

    return wedding;
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

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
    async ({ ids, input }) => {
        const weddingDayParts = await db.weddingDayPart.findMany({
            where: { id: { in: ids } },
        });

        const requestWeddingId = weddingDayParts?.[0]?.weddingId;
        isUserAssignedToWeddingValidator({
            requestWeddingId,
        });

        const updatedWeddingDayParts = await Promise.all(
            weddingDayParts.map(async (weddingDayPart, index) => {
                const data = input[index];
                return db.weddingDayPart.update({
                    where: { id: weddingDayPart.id },
                    data: {
                        ...removeNulls(data),
                    },
                });
            })
        );

        return updatedWeddingDayParts;
    };

export const WeddingDayPart: WeddingDayPartRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.weddingDayPart
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
};

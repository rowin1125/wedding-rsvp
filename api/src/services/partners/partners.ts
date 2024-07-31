import type {
    MutationResolvers,
    PartnerRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const updatePartners: MutationResolvers['updatePartners'] = async ({
    ids,
    input,
}) => {
    const partners = await db.partner.findMany({
        where: { id: { in: ids } },
    });

    const requestWeddingId = partners?.[0]?.weddingId;
    isUserAssignedToWeddingValidator({
        requestWeddingId,
    });

    const updatedPartners = await Promise.all(
        partners.map(async (partner, index) => {
            const data = input[index];
            return db.partner.update({
                where: { id: partner.id },
                data: {
                    ...removeNulls(data),
                },
            });
        })
    );

    return updatedPartners;
};

export const Partner: PartnerRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.partner.findUnique({ where: { id: root?.id } }).wedding();
    },
};

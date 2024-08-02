import type {
    QueryResolvers,
    MutationResolvers,
    GuestDayPartPresentRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { db } from 'src/lib/db';

export const guestDayPartPresents: QueryResolvers['guestDayPartPresents'] =
    () => {
        return db.guestDayPartPresent.findMany();
    };

export const guestDayPartPresent: QueryResolvers['guestDayPartPresent'] = ({
    id,
}) => {
    return db.guestDayPartPresent.findUnique({
        where: { id },
    });
};

export const updateGuestDayPartPresent: MutationResolvers['updateGuestDayPartPresent'] =
    ({ id, input }) => {
        return db.guestDayPartPresent.update({
            data: removeNulls(input),
            where: { id },
        });
    };

export const GuestDayPartPresent: GuestDayPartPresentRelationResolvers = {
    guestWeddingResponse: (_obj, { root }) => {
        return db.guestDayPartPresent
            .findUnique({ where: { id: root?.id } })
            .guestWeddingResponse();
    },
    weddingDayPart: (_obj, { root }) => {
        return db.guestDayPartPresent
            .findUnique({ where: { id: root?.id } })
            .weddingDayPart();
    },
    guest: (_obj, { root }) => {
        return db.guestDayPartPresent
            .findUnique({ where: { id: root?.id } })
            .guest();
    },
};

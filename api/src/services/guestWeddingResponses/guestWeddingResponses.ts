import type { GuestWeddingResponseRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const GuestWeddingResponse: GuestWeddingResponseRelationResolvers = {
    dayPartsPresent: (_obj, { root }) => {
        return db.guestWeddingResponse
            .findUnique({ where: { id: root?.id } })
            .dayPartsPresent();
    },
    guest: (_obj, { root }) => {
        return db.guestWeddingResponse
            .findUnique({ where: { id: root?.id } })
            .guest();
    },
    weddingInvitationResponse: (_obj, { root }) => {
        return db.guestWeddingResponse
            .findUnique({ where: { id: root?.id } })
            .weddingInvitationResponse();
    },
};

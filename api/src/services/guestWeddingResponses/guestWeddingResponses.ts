import type {
    GuestWeddingResponseRelationResolvers,
    MutationResolvers,
} from 'types/graphql';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const deleteGuestWeddingResponse: MutationResolvers['deleteGuestWeddingResponse'] =
    async ({ id }) => {
        const guestWeddingResponse = await db.guestWeddingResponse.findUnique({
            where: { id },
            include: {
                weddingInvitationResponse: {
                    include: {
                        guestWeddingResponses: true,
                    },
                },
            },
        });

        if (
            !guestWeddingResponse ||
            !guestWeddingResponse.weddingInvitationResponse?.weddingId
        ) {
            throw new Error('Guest wedding response not found');
        }

        isUserAssignedToWeddingValidator({
            requestWeddingId:
                guestWeddingResponse?.weddingInvitationResponse?.weddingId,
        });

        const remainingGuestWeddingResponses =
            guestWeddingResponse.weddingInvitationResponse.guestWeddingResponses.filter(
                (response) => response.id !== id
            );

        if (remainingGuestWeddingResponses.length === 0) {
            await db.weddingInvitationResponse.delete({
                where: {
                    id: guestWeddingResponse.weddingInvitationResponse.id,
                },
            });

            return guestWeddingResponse;
        }

        return db.guestWeddingResponse.delete({ where: { id } });
    };

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

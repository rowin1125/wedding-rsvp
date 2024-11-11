import type {
    QueryResolvers,
    MutationResolvers,
    GuestDayPartPresentRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';
import { UserInputError } from '@redwoodjs/graphql-server';

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

export const createGuestDayPartPresent: MutationResolvers['createGuestDayPartPresent'] =
    async ({ input }) => {
        if (
            !input.guestId ||
            !input.weddingDayPartId ||
            !input.weddingRsvpLandingPageId ||
            !input.guestWeddingResponseId
        ) {
            throw new UserInputError('Missing required fields');
        }

        return db.guestDayPartPresent.create({
            data: {
                guest: {
                    connect: { id: input.guestId },
                },
                weddingDayPart: {
                    connect: { id: input.weddingDayPartId },
                },
                guestWeddingResponseStatus: input.guestWeddingResponseStatus,
                weddingRsvpLandingPage: {
                    connect: { id: input.weddingRsvpLandingPageId },
                },
                guestWeddingResponse: {
                    connect: { id: input.guestWeddingResponseId },
                },
            },
        });
    };

export const updateGuestDayPartPresent: MutationResolvers['updateGuestDayPartPresent'] =
    ({ id, input }) => {
        return db.guestDayPartPresent.update({
            where: { id },
            data: removeNulls(input),
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
    weddingRsvpLandingPage: (_obj, { root }) => {
        return db.guestDayPartPresent
            .findUnique({ where: { id: root?.id } })
            .weddingRsvpLandingPage();
    },
};

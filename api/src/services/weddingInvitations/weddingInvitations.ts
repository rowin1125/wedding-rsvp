import type {
    QueryResolvers,
    MutationResolvers,
    WeddingInvitationRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { EMAIL_TEMPLATES_MAP, mailUser } from 'src/lib/email';
import Sentry from 'src/lib/sentry';

export const weddingInvitations: QueryResolvers['weddingInvitations'] = ({
    weddingId,
}) => {
    return db.weddingInvitation.findMany({
        where: { weddingId },
        include: {
            weddingGuests: true,
            wedding: true,
        },
    });
};

export const weddingInvitation: QueryResolvers['weddingInvitation'] = ({
    id,
}) => {
    return db.weddingInvitation.findUnique({
        where: { id },
        include: {
            weddingGuests: true,
            wedding: true,
        },
    });
};

export const createWeddingInvitation: MutationResolvers['createWeddingInvitation'] =
    async ({ input }) => {
        try {
            const weddingInvitation = await db.weddingInvitation.create({
                data: {
                    email: input.email,
                    presence: input.presence,
                    useCouponCode: input.useCouponCode,
                    dietaryWishes: input.dietaryWishes,
                    invitationType: input.invitationType,
                    remarks: input.remarks,
                    wedding: {
                        connect: { id: input.weddingId },
                    },
                    weddingGuests: {
                        createMany: {
                            data: input.weddingGuests?.map((guest) => ({
                                name:
                                    guest.name ??
                                    `${guest.firstName} ${guest.lastName}`,
                                weddingId: input.weddingId,
                                firstName: guest.firstName ?? '',
                                lastName: guest.lastName ?? '',
                            })),
                        },
                    },
                },
            });

            await mailUser({
                to: [
                    {
                        name:
                            input.weddingGuests[0].name ??
                            `${input.weddingGuests[0].firstName} ${input.weddingGuests[0].lastName}`,
                        email: input.email,
                    },
                ],
                templateId: EMAIL_TEMPLATES_MAP.RSVP_CONFIRMATION,
                params: {
                    name:
                        input.weddingGuests[0].name ??
                        `${input.weddingGuests[0].firstName} ${input.weddingGuests[0].lastName}`,
                    invitationUrl: `${process.env.REDWOOD_ENV_VERCEL_URL}/${weddingInvitation.weddingId}/uitnodiging/${weddingInvitation.id}`,
                    weddingUrl: `${
                        process.env.REDWOOD_ENV_VERCEL_URL
                    }/bruiloft/${input.weddingId}/${
                        input.invitationType === 'DAY' ? 'F' : 'E'
                    }`,
                },
            });

            return weddingInvitation;
        } catch (err) {
            const error = err as Error;
            Sentry.captureException(error);
            throw new Error(error.message);
        }
    };

export const updateWeddingInvitation: MutationResolvers['updateWeddingInvitation'] =
    async ({ id, input }) => {
        const [, weddingInvitation] = await db.$transaction([
            db.weddingGuest.deleteMany({
                where: { weddingInvitationId: id },
            }),
            db.weddingInvitation.update({
                data: {
                    email: input.email ?? undefined,
                    presence: input.presence ?? undefined,
                    dietaryWishes: input.dietaryWishes,
                    invitationType: input.invitationType ?? undefined,
                    useCouponCode: input.useCouponCode ?? undefined,
                    remarks: input.remarks,
                    wedding: {
                        connect: { id: input.weddingId ?? undefined },
                    },
                    weddingGuests: {
                        createMany: {
                            data:
                                input.weddingGuests?.map((guest) => ({
                                    name:
                                        guest.name ??
                                        `${guest.firstName} ${guest.lastName}`,
                                    weddingId: input.weddingId ?? '',
                                    firstName: guest.firstName ?? '',
                                    lastName: guest.lastName ?? '',
                                })) ?? [],
                        },
                    },
                },
                where: { id },
            }),
        ]);

        return weddingInvitation;
    };

export const deleteWeddingInvitation: MutationResolvers['deleteWeddingInvitation'] =
    ({ id }) => {
        return db.weddingInvitation.delete({
            where: { id },
        });
    };

export const WeddingInvitation: WeddingInvitationRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.weddingInvitation
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
    weddingGuests: (_obj, { root }) => {
        return db.weddingInvitation
            .findUnique({ where: { id: root?.id } })
            .weddingGuests();
    },
};

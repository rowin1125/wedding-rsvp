import type {
    QueryResolvers,
    MutationResolvers,
    WeddingInvitationRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { mailUser } from 'src/lib/email';

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
                                name: guest.name,
                                weddingId: input.weddingId,
                            })),
                        },
                    },
                },
            });

            await mailUser({
                to: [
                    {
                        name: input.weddingGuests[0].name,
                        email: input.email,
                    },
                ],
                templateId: 1,
                params: {
                    name: input.weddingGuests[0].name,
                    invitationUrl: `${process.env.REDWOOD_ENV_VERCEL_URL}/${weddingInvitation.weddingId}/uitnodiging/${weddingInvitation.id}`,
                    weddingUrl: `${
                        process.env.REDWOOD_ENV_VERCEL_URL
                    }/bruiloft/${input.weddingId}/${
                        input.invitationType === 'DAY' ? 'F' : 'E'
                    }`,
                },
            });

            return weddingInvitation;
        } catch (error) {
            throw new Error(error);
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
                                    name: guest.name,
                                    weddingId: input.weddingId ?? '',
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

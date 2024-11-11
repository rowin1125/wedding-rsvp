import { Prisma } from '@prisma/client';
import type {
    QueryResolvers,
    MutationResolvers,
    WeddingRsvpLandingPageRelationResolvers,
} from 'types/graphql';

import { AuthenticationError } from '@redwoodjs/graphql-server';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const weddingRsvpLandingPages: QueryResolvers['weddingRsvpLandingPages'] =
    () => {
        if (!context.currentUser?.weddingId)
            throw new AuthenticationError('Not authenticated');

        return db.weddingRsvpLandingPage.findMany({
            where: {
                weddingId: context.currentUser?.weddingId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    };

export const weddingRsvpLandingPage: QueryResolvers['weddingRsvpLandingPage'] =
    ({ id }) => {
        return db.weddingRsvpLandingPage.findUnique({
            where: { id },
            include: {
                weddingDayParts: true,
            },
        });
    };

export const createWeddingRsvpLandingPage: MutationResolvers['createWeddingRsvpLandingPage'] =
    ({ input }) => {
        isUserAssignedToWeddingValidator({
            requestWeddingId: input.weddingId,
            message:
                'You are not allowed to create a wedding RSVP landing page',
        });

        return db.weddingRsvpLandingPage.create({
            data: {
                name: input.name,
                pageBuilderData:
                    (input.pageBuilderData as Prisma.JsonObject) ?? {},
                wedding: { connect: { id: input.weddingId } },
                weddingDayParts: {
                    connect: input.weddingDayPartsIds.map((id) => ({ id })),
                },
                password: input.password,
                isActive: input.isActive,
                sidebarData: (input.sidebarData as Prisma.JsonObject) ?? {},
            },
        });
    };

export const updateWeddingRsvpLandingPageQrCode: MutationResolvers['updateWeddingRsvpLandingPageQrCode'] =
    ({ id, qrCodeId, qrCode }) => {
        return db.weddingRsvpLandingPage.update({
            data: {
                qrCodeId: qrCodeId ?? null,
                qrCode: qrCode ?? null,
            },
            where: { id },
        });
    };

export const updateWeddingRsvpLandingPage: MutationResolvers['updateWeddingRsvpLandingPage'] =
    async ({ id, input }) => {
        const weddingRsvpLandingPage =
            await db.weddingRsvpLandingPage.findUnique({
                where: { id },
                include: { weddingDayParts: true },
            });

        if (!weddingRsvpLandingPage) {
            throw new Error('Wedding RSVP landing page not found');
        }

        isUserAssignedToWeddingValidator({
            requestWeddingId: weddingRsvpLandingPage?.weddingId,
        });

        const newWeddingDayParts = input.weddingDayPartsIds;
        const missingWeddingDayParts = weddingRsvpLandingPage?.weddingDayParts
            .map((dayPart) => dayPart.id)
            .filter((id) => !newWeddingDayParts?.includes(id));

        if (
            missingWeddingDayParts?.length &&
            (!input.qrCodeId || !input.qrCode)
        ) {
            missingWeddingDayParts.forEach(async (dayPartId) => {
                await db.guestDayPartPresent.updateMany({
                    data: {
                        guestWeddingResponseStatus: 'UNKNOWN',
                    },
                    where: {
                        weddingDayPartId: dayPartId,
                        weddingRsvpLandingPageId: id,
                    },
                });
            });
        }

        return db.weddingRsvpLandingPage.update({
            data: {
                name: input.name ?? undefined,
                pageBuilderData: input.pageBuilderData as Prisma.JsonObject,
                weddingDayParts: {
                    connect: input.weddingDayPartsIds?.map((id) => ({ id })),
                    disconnect: missingWeddingDayParts?.map((id) => ({ id })),
                },
                password: input.password ?? undefined,
                isActive: input.isActive ?? undefined,
                sidebarData: input.sidebarData as Prisma.JsonObject,
                qrCodeId: input.qrCodeId ?? undefined,
                qrCode: input.qrCode ?? undefined,
            },
            where: { id },
        });
    };

export const deleteWeddingRsvpLandingPage: MutationResolvers['deleteWeddingRsvpLandingPage'] =
    ({ id }) => {
        return db.weddingRsvpLandingPage.delete({
            where: { id },
        });
    };

export const WeddingRsvpLandingPage: WeddingRsvpLandingPageRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.weddingRsvpLandingPage
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
    weddingDayParts: (_obj, { root }) => {
        return db.weddingRsvpLandingPage
            .findUnique({ where: { id: root?.id } })
            .weddingDayParts();
    },
    weddingInvitationResponses: (_obj, { root }) => {
        return db.weddingRsvpLandingPage
            .findUnique({ where: { id: root?.id } })
            .weddingInvitationResponses();
    },
    guestDayPartsPresent: (_obj, { root }) => {
        return db.weddingRsvpLandingPage
            .findUnique({ where: { id: root?.id } })
            .guestDayPartsPresent();
    },
};

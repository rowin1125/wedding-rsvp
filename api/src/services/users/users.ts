import { createId } from '@paralleldrive/cuid2';
import type { MutationResolvers, UserRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';
import { EMAIL_TEMPLATES_MAP, mailUser } from 'src/lib/email';

export const activateUserEmail = async ({
    email,
    verifiedToken,
}: {
    email: string;
    verifiedToken: string | null;
}) => {
    const user = await db.user.findUnique({
        where: { email },
    });
    if (!user) throw new Error('User not found');

    const encodedEmail = encodeURIComponent(user.email);

    const REDWOOD_ENV_VERCEL_URL =
        process.env.REDWOOD_ENV_VERCEL_URL ?? 'http://localhost:8910';

    try {
        await mailUser({
            to: [
                {
                    name: encodedEmail,
                    email: user.email,
                },
            ],
            templateId: EMAIL_TEMPLATES_MAP.SIGNUP,
            params: {
                activateUrl: `${REDWOOD_ENV_VERCEL_URL}/activeren?verifiedToken=${verifiedToken}&email=${encodedEmail}`,
            },
        });
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }

    return user;
};

export const activateUser: MutationResolvers['activateUser'] = async ({
    input,
}) => {
    if (!input.verifiedToken) throw new Error('Invalid verification token');

    const user = await db.user.findFirst({
        where: { verifiedToken: input.verifiedToken },
    });

    if (!user) {
        throw new Error('Invalid verification token');
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            verified: true,
            verifiedToken: null,
        },
    });

    return user;
};

export const resendActivateUser: MutationResolvers['resendActivateUser'] =
    async ({ input }) => {
        let user = await db.user.findFirst({
            where: { email: input.email },
        });
        if (!user) throw new Error('User not found');

        if (!user.verifiedToken) {
            const verifiedToken = createId();
            user = await db.user.update({
                where: { id: user.id },
                data: {
                    verifiedToken,
                },
            });
        }

        await activateUserEmail({
            email: user.email,
            verifiedToken: user.verifiedToken,
        });

        return user;
    };

export const User: UserRelationResolvers = {
    wedding: (_obj, { root }) => {
        return db.user.findUnique({ where: { id: root?.id } }).wedding();
    },
    roles: (_obj, { root }) => {
        return db.user.findUnique({ where: { id: root?.id } }).roles();
    },
};

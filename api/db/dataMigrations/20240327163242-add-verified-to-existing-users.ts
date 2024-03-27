import type { PrismaClient } from '@prisma/client';

export default async ({ db }: { db: PrismaClient }) => {
    await db.user.updateMany({
        data: {
            verified: true,
        },
        where: {
            verified: false,
        },
    });
};

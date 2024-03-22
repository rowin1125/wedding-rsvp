import { Role } from '@prisma/client';
import type { PrismaClient } from '@prisma/client';

import { asyncForEach } from '../helpers/asyncForEach';

export default async ({ db }: { db: PrismaClient }) => {
    const allUsers = await db.user.findMany({ include: { roles: true } });

    if (allUsers.length) {
        await asyncForEach(allUsers, async (user) => {
            const userRoles = user.roles.map((role) => role.name) || [];
            if (userRoles.includes(Role.USER)) return;

            await db.userRole.create({
                data: {
                    name: Role.USER,
                    userId: user.id,
                },
            });
        });

        console.log('User roles added to all users');
    }

    const weddings = await db.wedding.findMany({ include: { user: true } });
    if (!weddings.length) {
        console.log('No weddings found, skipping user role migration');
        return;
    }

    asyncForEach(weddings, async (wedding) => {
        if (!wedding?.user?.id) return;

        const user = allUsers.find((user) => user.id === wedding?.user?.id);
        const userRoles = user?.roles.map((role) => role.name) || [];
        if (userRoles.includes(Role.WEDDING_OWNER)) return;

        await db.userRole.create({
            data: {
                name: Role.WEDDING_OWNER,
                userId: wedding.user.id,
            },
        });
    });

    console.log('User roles added to wedding owners');
};

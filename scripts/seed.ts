import { Role } from '@prisma/client';
import { db } from 'api/src/lib/db';

import { hashPassword } from '@redwoodjs/auth-dbauth-api';

export default async () => {
    try {
        const users = [
            {
                email: 'rowinmol648+user@gmail.com',
                password: '123456',
                roles: [Role.USER],
                id: 'clyy21qms000012nxklvqgfhw',
            },
            {
                email: 'rowinmol648+admin@gmail.com',
                password: '123456',
                roles: [Role.USER, Role.ADMIN],
                id: 'clyy21qnt000112nx2u4c27kx',
            },
            {
                email: 'rowinmol648+moc@gmail.com',
                password: '123456',
                roles: [Role.USER, Role.MASTER_OF_CEREMONIES],
                id: 'clyy21qor000212nxrodbp689',
            },
        ];

        for (const user of users) {
            const [hashedPassword, salt] = hashPassword(user.password);
            const newUser = await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                    hashedPassword,
                    salt,
                    verified: true,
                },
            });

            await db.userRole.createMany({
                data: user.roles.map((role) => ({
                    userId: newUser.id,
                    name: role,
                })),
            });
        }
    } catch (error) {
        console.warn('Please define your seed data.');
        console.error(error);
    }
};

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
            },
            {
                email: 'rowinmol648+admin@gmail.com',
                password: '123456',
                roles: [Role.USER, Role.ADMIN],
            },
            {
                email: 'rowinmol648+moc@gmail.com',
                password: '123456',
                roles: [Role.USER, Role.MASTER_OF_CEREMONIES],
            },
        ];

        for (const user of users) {
            const [hashedPassword, salt] = hashPassword(user.password);
            const newUser = await db.user.create({
                data: {
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

import { db } from 'api/src/lib/db';

import { hashPassword } from '@redwoodjs/auth-dbauth-api';

export default async () => {
    try {
        const users = [{ email: 'demi.rowin@gmail.com', password: '123456' }];

        for (const user of users) {
            const [hashedPassword, salt] = hashPassword(user.password);
            await db.user.create({
                data: {
                    email: user.email,
                    hashedPassword,
                    salt,
                },
            });
        }
    } catch (error) {
        console.warn('Please define your seed data.');
        console.error(error);
    }
};

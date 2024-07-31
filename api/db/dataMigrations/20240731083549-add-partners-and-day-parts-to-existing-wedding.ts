import type { PrismaClient } from '@prisma/client';

import { asyncForEach } from '../helpers/asyncForEach';

export default async ({ db }: { db: PrismaClient }) => {
    const allWeddings = await db.wedding.findMany({
        include: {
            partners: true,
            dayParts: true,
        },
    });

    asyncForEach(allWeddings, async (wedding) => {
        if (wedding.partners?.length && wedding.dayParts?.length) return;

        await db.partner.createMany({
            data: [
                {
                    weddingId: wedding.id,
                    firstName: 'DEFAULT',
                    lastName: 'DEFAULT',
                    gender: 'MALE',
                    type: 'GROOM',
                },
                {
                    weddingId: wedding.id,
                    firstName: 'DEFAULT',
                    lastName: 'DEFAULT',
                    gender: 'FEMALE',
                    type: 'BRIDE',
                },
            ],
        });

        await db.weddingDayPart.create({
            data: {
                weddingId: wedding.id,
                startTime: new Date().toISOString(),
                endTime: new Date().toISOString(),
                name: 'DEFAULT',
                description: 'DEFAULT',
            },
        });

        console.log('Added partners and day parts to wedding', wedding.name);
    });
};

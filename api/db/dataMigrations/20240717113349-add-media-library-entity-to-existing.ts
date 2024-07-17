import type { PrismaClient } from '@prisma/client';

import { asyncForEach } from '../helpers/asyncForEach';

export default async ({ db }: { db: PrismaClient }) => {
    const allWeddings = await db.wedding.findMany({
        include: {
            mediaLibrary: true,
        },
    });

    try {
        asyncForEach(allWeddings, async (wedding) => {
            if (wedding.mediaLibrary?.id) return;

            await db.mediaLibrary.create({
                data: {
                    wedding: {
                        connect: {
                            id: wedding.id,
                        },
                    },
                    gcloudStoragePath: `media/${wedding.id}`,
                    maxAllowedAssets: 75,
                },
            });

            console.log('Added media library to wedding', wedding.name);
        });
    } catch (error) {
        console.error('Error adding media library to weddings', error);
    }
};

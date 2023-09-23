import type { Prisma, WeddingGuest } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.WeddingGuestCreateArgs>({
    weddingGuest: {
        one: {
            data: {
                name: 'String',
                wedding: { create: { date: '2023-09-12T17:16:58.926Z' } },
            },
        },
        two: {
            data: {
                name: 'String',
                wedding: { create: { date: '2023-09-12T17:16:58.926Z' } },
            },
        },
    },
});

export type StandardScenario = ScenarioData<WeddingGuest, 'weddingGuest'>;

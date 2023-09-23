import type { Prisma, Wedding } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.WeddingCreateArgs>({
    wedding: {
        one: { data: { date: '2023-09-12T17:15:55.894Z' } },
        two: { data: { date: '2023-09-12T17:15:55.894Z' } },
    },
});

export type StandardScenario = ScenarioData<Wedding, 'wedding'>;

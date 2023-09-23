import type { Prisma, WeddingInvitation } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.WeddingInvitationCreateArgs>({
    weddingInvitation: {
        one: {
            data: {
                invitationType: 'DAY',
                email: 'String',
                wedding: { create: { date: '2023-09-12T17:16:32.514Z' } },
            },
        },
        two: {
            data: {
                invitationType: 'DAY',
                email: 'String',
                wedding: { create: { date: '2023-09-12T17:16:32.515Z' } },
            },
        },
    },
});

export type StandardScenario = ScenarioData<
    WeddingInvitation,
    'weddingInvitation'
>;

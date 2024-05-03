import type { Prisma, QrCode } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.QrCodeCreateArgs>({
    qrCode: {
        one: {
            data: {
                code: 'String',
                redirectUrl: 'String',
                baseUrl: 'String',
                isActive: true,
                usageCount: 42,
                metadata: {},
                expiresAt: '2024-04-30T07:11:56.961Z',
                updatedAt: '2024-04-30T07:11:56.961Z',
            },
        },
        two: {
            data: {
                code: 'String',
                redirectUrl: 'String',
                baseUrl: 'String',
                isActive: true,
                usageCount: 42,
                metadata: {},
                expiresAt: '2024-04-30T07:11:56.961Z',
                updatedAt: '2024-04-30T07:11:56.961Z',
            },
        },
    },
});

export type StandardScenario = ScenarioData<QrCode, 'qrCode'>;

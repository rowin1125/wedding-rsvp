import type { Prisma, Asset } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.AssetCreateArgs>({
    asset: {
        one: {
            data: {
                metadata: 'String',
                url: 'String',
                updatedAt: '2024-04-10T19:44:27.742Z',
                gallery: {
                    create: {
                        name: 'String',
                        updatedAt: '2024-04-10T19:44:27.742Z',
                        wedding: {
                            create: {
                                date: '2024-04-10T19:44:27.742Z',
                                name: 'String',
                                updatedAt: '2024-04-10T19:44:27.742Z',
                            },
                        },
                    },
                },
            },
        },
        two: {
            data: {
                metadata: 'String',
                url: 'String',
                updatedAt: '2024-04-10T19:44:27.742Z',
                gallery: {
                    create: {
                        name: 'String',
                        updatedAt: '2024-04-10T19:44:27.742Z',
                        wedding: {
                            create: {
                                date: '2024-04-10T19:44:27.742Z',
                                name: 'String',
                                updatedAt: '2024-04-10T19:44:27.742Z',
                            },
                        },
                    },
                },
            },
        },
    },
});

export type StandardScenario = ScenarioData<Asset, 'asset'>;

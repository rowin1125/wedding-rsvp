import type { Prisma, Gallery } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.GalleryCreateArgs>({
    gallery: {
        one: {
            data: {
                name: 'String',
                updatedAt: '2024-04-10T19:44:21.825Z',
                wedding: {
                    create: {
                        date: '2024-04-10T19:44:21.825Z',
                        name: 'String',
                        updatedAt: '2024-04-10T19:44:21.825Z',
                    },
                },
            },
        },
        two: {
            data: {
                name: 'String',
                updatedAt: '2024-04-10T19:44:21.825Z',
                wedding: {
                    create: {
                        date: '2024-04-10T19:44:21.825Z',
                        name: 'String',
                        updatedAt: '2024-04-10T19:44:21.825Z',
                    },
                },
            },
        },
    },
});

export type StandardScenario = ScenarioData<Gallery, 'gallery'>;

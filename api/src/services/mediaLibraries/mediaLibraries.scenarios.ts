import type { Prisma, MediaLibrary } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.MediaLibraryCreateArgs>({
    mediaLibrary: {
        one: {
            data: {
                name: 'String',
                gcloudStoragePath: 'String',
                updatedAt: '2024-07-03T08:59:42.727Z',
                wedding: {
                    create: {
                        date: '2024-07-03T08:59:42.727Z',
                        name: 'String',
                        updatedAt: '2024-07-03T08:59:42.727Z',
                    },
                },
            },
        },
        two: {
            data: {
                name: 'String',
                gcloudStoragePath: 'String',
                updatedAt: '2024-07-03T08:59:42.727Z',
                wedding: {
                    create: {
                        date: '2024-07-03T08:59:42.727Z',
                        name: 'String',
                        updatedAt: '2024-07-03T08:59:42.727Z',
                    },
                },
            },
        },
    },
});

export type StandardScenario = ScenarioData<MediaLibrary, 'mediaLibrary'>;

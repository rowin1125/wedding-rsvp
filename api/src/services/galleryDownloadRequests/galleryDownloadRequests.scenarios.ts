import type { Prisma, GalleryDownloadRequest } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.GalleryDownloadRequestCreateArgs>(
    {
        galleryDownloadRequest: {
            one: {
                data: {
                    status: 'PENDING',
                    updatedAt: '2024-06-23T09:57:20.554Z',
                    gallery: {
                        create: {
                            name: 'String',
                            gcloudStoragePath: 'String',
                            updatedAt: '2024-06-23T09:57:20.554Z',
                            wedding: {
                                create: {
                                    date: '2024-06-23T09:57:20.554Z',
                                    name: 'String',
                                    updatedAt: '2024-06-23T09:57:20.554Z',
                                },
                            },
                        },
                    },
                },
            },
            two: {
                data: {
                    status: 'PENDING',
                    updatedAt: '2024-06-23T09:57:20.554Z',
                    gallery: {
                        create: {
                            name: 'String',
                            gcloudStoragePath: 'String',
                            updatedAt: '2024-06-23T09:57:20.554Z',
                            wedding: {
                                create: {
                                    date: '2024-06-23T09:57:20.554Z',
                                    name: 'String',
                                    updatedAt: '2024-06-23T09:57:20.554Z',
                                },
                            },
                        },
                    },
                },
            },
        },
    }
);

export type StandardScenario = ScenarioData<
    GalleryDownloadRequest,
    'galleryDownloadRequest'
>;

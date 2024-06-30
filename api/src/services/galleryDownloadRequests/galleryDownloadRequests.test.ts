import type { GalleryDownloadRequest } from '@prisma/client';

import {
    galleryDownloadRequests,
    galleryDownloadRequest,
    createGalleryDownloadRequest,
    updateGalleryDownloadRequest,
    deleteGalleryDownloadRequest,
} from './galleryDownloadRequests';
import type { StandardScenario } from './galleryDownloadRequests.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('galleryDownloadRequests', () => {
    scenario(
        'returns all galleryDownloadRequests',
        async (scenario: StandardScenario) => {
            const result = await galleryDownloadRequests();

            expect(result.length).toEqual(
                Object.keys(scenario.galleryDownloadRequest).length
            );
        }
    );

    scenario(
        'returns a single galleryDownloadRequest',
        async (scenario: StandardScenario) => {
            const result = await galleryDownloadRequest({
                id: scenario.galleryDownloadRequest.one.id,
            });

            expect(result).toEqual(scenario.galleryDownloadRequest.one);
        }
    );

    scenario(
        'creates a galleryDownloadRequest',
        async (scenario: StandardScenario) => {
            const result = await createGalleryDownloadRequest({
                input: {
                    galleryId: scenario.galleryDownloadRequest.two.galleryId,
                    status: 'PENDING',
                    updatedAt: '2024-06-23T09:57:20.491Z',
                },
            });

            expect(result.galleryId).toEqual(
                scenario.galleryDownloadRequest.two.galleryId
            );
            expect(result.status).toEqual('PENDING');
            expect(result.updatedAt).toEqual(
                new Date('2024-06-23T09:57:20.491Z')
            );
        }
    );

    scenario(
        'updates a galleryDownloadRequest',
        async (scenario: StandardScenario) => {
            const original = (await galleryDownloadRequest({
                id: scenario.galleryDownloadRequest.one.id,
            })) as GalleryDownloadRequest;
            const result = await updateGalleryDownloadRequest({
                id: original.id,
                input: { status: 'FAILED' },
            });

            expect(result.status).toEqual('FAILED');
        }
    );

    scenario(
        'deletes a galleryDownloadRequest',
        async (scenario: StandardScenario) => {
            const original = (await deleteGalleryDownloadRequest({
                id: scenario.galleryDownloadRequest.one.id,
            })) as GalleryDownloadRequest;
            const result = await galleryDownloadRequest({ id: original.id });

            expect(result).toEqual(null);
        }
    );
});

import type { Gallery } from '@prisma/client';

import {
    galleries,
    gallery,
    createGallery,
    updateGallery,
    deleteGallery,
} from './galleries';
import type { StandardScenario } from './galleries.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('galleries', () => {
    scenario('returns all galleries', async (scenario: StandardScenario) => {
        const result = await galleries();

        expect(result.length).toEqual(Object.keys(scenario.gallery).length);
    });

    scenario('returns a single gallery', async (scenario: StandardScenario) => {
        const result = await gallery({ id: scenario.gallery.one.id });

        expect(result).toEqual(scenario.gallery.one);
    });

    scenario('creates a gallery', async (scenario: StandardScenario) => {
        const result = await createGallery({
            input: {
                name: 'String',
                weddingId: scenario.gallery.two.weddingId,
                updatedAt: '2024-04-10T19:44:21.808Z',
            },
        });

        expect(result.name).toEqual('String');
        expect(result.weddingId).toEqual(scenario.gallery.two.weddingId);
        expect(result.updatedAt).toEqual(new Date('2024-04-10T19:44:21.808Z'));
    });

    scenario('updates a gallery', async (scenario: StandardScenario) => {
        const original = (await gallery({
            id: scenario.gallery.one.id,
        })) as Gallery;
        const result = await updateGallery({
            id: original.id,
            input: { name: 'String2' },
        });

        expect(result.name).toEqual('String2');
    });

    scenario('deletes a gallery', async (scenario: StandardScenario) => {
        const original = (await deleteGallery({
            id: scenario.gallery.one.id,
        })) as Gallery;
        const result = await gallery({ id: original.id });

        expect(result).toEqual(null);
    });
});

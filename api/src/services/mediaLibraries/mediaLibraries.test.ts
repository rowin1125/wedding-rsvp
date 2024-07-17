import type { MediaLibrary } from '@prisma/client';

import {
    mediaLibraries,
    mediaLibrary,
    createMediaLibrary,
    updateMediaLibrary,
    deleteMediaLibrary,
} from './mediaLibraries';
import type { StandardScenario } from './mediaLibraries.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('mediaLibraries', () => {
    scenario(
        'returns all mediaLibraries',
        async (scenario: StandardScenario) => {
            const result = await mediaLibraries();

            expect(result.length).toEqual(
                Object.keys(scenario.mediaLibrary).length
            );
        }
    );

    scenario(
        'returns a single mediaLibrary',
        async (scenario: StandardScenario) => {
            const result = await mediaLibrary({
                id: scenario.mediaLibrary.one.id,
            });

            expect(result).toEqual(scenario.mediaLibrary.one);
        }
    );

    scenario('creates a mediaLibrary', async (scenario: StandardScenario) => {
        const result = await createMediaLibrary({
            input: {
                name: 'String',
                gcloudStoragePath: 'String',
                weddingId: scenario.mediaLibrary.two.weddingId,
                updatedAt: '2024-07-03T08:59:42.712Z',
            },
        });

        expect(result.name).toEqual('String');
        expect(result.gcloudStoragePath).toEqual('String');
        expect(result.weddingId).toEqual(scenario.mediaLibrary.two.weddingId);
        expect(result.updatedAt).toEqual(new Date('2024-07-03T08:59:42.712Z'));
    });

    scenario('updates a mediaLibrary', async (scenario: StandardScenario) => {
        const original = (await mediaLibrary({
            id: scenario.mediaLibrary.one.id,
        })) as MediaLibrary;
        const result = await updateMediaLibrary({
            id: original.id,
            input: { name: 'String2' },
        });

        expect(result.name).toEqual('String2');
    });

    scenario('deletes a mediaLibrary', async (scenario: StandardScenario) => {
        const original = (await deleteMediaLibrary({
            id: scenario.mediaLibrary.one.id,
        })) as MediaLibrary;
        const result = await mediaLibrary({ id: original.id });

        expect(result).toEqual(null);
    });
});

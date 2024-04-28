import type { Asset } from '@prisma/client';

import { assets, asset, createAsset, updateAsset, deleteAsset } from './assets';
import type { StandardScenario } from './assets.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('assets', () => {
    scenario('returns all assets', async (scenario: StandardScenario) => {
        const result = await assets();

        expect(result.length).toEqual(Object.keys(scenario.asset).length);
    });

    scenario('returns a single asset', async (scenario: StandardScenario) => {
        const result = await asset({ id: scenario.asset.one.id });

        expect(result).toEqual(scenario.asset.one);
    });

    scenario('creates a asset', async (scenario: StandardScenario) => {
        const result = await createAsset({
            input: {
                galleryId: scenario.asset.two.galleryId,
                metadata: 'String',
                url: 'String',
                updatedAt: '2024-04-10T19:44:27.701Z',
            },
        });

        expect(result.galleryId).toEqual(scenario.asset.two.galleryId);
        expect(result.metadata).toEqual('String');
        expect(result.url).toEqual('String');
        expect(result.updatedAt).toEqual(new Date('2024-04-10T19:44:27.701Z'));
    });

    scenario('updates a asset', async (scenario: StandardScenario) => {
        const original = (await asset({ id: scenario.asset.one.id })) as Asset;
        const result = await updateAsset({
            id: original.id,
            input: { metadata: 'String2' },
        });

        expect(result.metadata).toEqual('String2');
    });

    scenario('deletes a asset', async (scenario: StandardScenario) => {
        const original = (await deleteAsset({
            id: scenario.asset.one.id,
        })) as Asset;
        const result = await asset({ id: original.id });

        expect(result).toEqual(null);
    });
});

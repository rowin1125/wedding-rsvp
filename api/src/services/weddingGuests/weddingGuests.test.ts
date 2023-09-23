import type { WeddingGuest } from '@prisma/client';

import {
    weddingGuests,
    weddingGuest,
    createWeddingGuest,
    updateWeddingGuest,
    deleteWeddingGuest,
} from './weddingGuests';
import type { StandardScenario } from './weddingGuests.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('weddingGuests', () => {
    scenario(
        'returns all weddingGuests',
        async (scenario: StandardScenario) => {
            const result = await weddingGuests();

            expect(result.length).toEqual(
                Object.keys(scenario.weddingGuest).length
            );
        }
    );

    scenario(
        'returns a single weddingGuest',
        async (scenario: StandardScenario) => {
            const result = await weddingGuest({
                id: scenario.weddingGuest.one.id,
            });

            expect(result).toEqual(scenario.weddingGuest.one);
        }
    );

    scenario('creates a weddingGuest', async (scenario: StandardScenario) => {
        const result = await createWeddingGuest({
            input: {
                weddingId: scenario.weddingGuest.two.weddingId,
                name: 'String',
            },
        });

        expect(result.weddingId).toEqual(scenario.weddingGuest.two.weddingId);
        expect(result.name).toEqual('String');
    });

    scenario('updates a weddingGuest', async (scenario: StandardScenario) => {
        const original = (await weddingGuest({
            id: scenario.weddingGuest.one.id,
        })) as WeddingGuest;
        const result = await updateWeddingGuest({
            id: original.id,
            input: { name: 'String2' },
        });

        expect(result.name).toEqual('String2');
    });

    scenario('deletes a weddingGuest', async (scenario: StandardScenario) => {
        const original = (await deleteWeddingGuest({
            id: scenario.weddingGuest.one.id,
        })) as WeddingGuest;
        const result = await weddingGuest({ id: original.id });

        expect(result).toEqual(null);
    });
});

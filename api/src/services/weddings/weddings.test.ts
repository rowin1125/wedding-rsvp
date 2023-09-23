import type { Wedding } from '@prisma/client';

import {
    weddings,
    wedding,
    createWedding,
    updateWedding,
    deleteWedding,
} from './weddings';
import type { StandardScenario } from './weddings.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('weddings', () => {
    scenario('returns all weddings', async (scenario: StandardScenario) => {
        const result = await weddings();

        expect(result.length).toEqual(Object.keys(scenario.wedding).length);
    });

    scenario('returns a single wedding', async (scenario: StandardScenario) => {
        const result = await wedding({ id: scenario.wedding.one.id });

        expect(result).toEqual(scenario.wedding.one);
    });

    scenario('creates a wedding', async () => {
        const result = await createWedding({
            input: { date: '2023-09-12T17:15:55.869Z' },
        });

        expect(result.date).toEqual(new Date('2023-09-12T17:15:55.869Z'));
    });

    scenario('updates a wedding', async (scenario: StandardScenario) => {
        const original = (await wedding({
            id: scenario.wedding.one.id,
        })) as Wedding;
        const result = await updateWedding({
            id: original.id,
            input: { date: '2023-09-13T17:15:55.869Z' },
        });

        expect(result.date).toEqual(new Date('2023-09-13T17:15:55.869Z'));
    });

    scenario('deletes a wedding', async (scenario: StandardScenario) => {
        const original = (await deleteWedding({
            id: scenario.wedding.one.id,
        })) as Wedding;
        const result = await wedding({ id: original.id });

        expect(result).toEqual(null);
    });
});

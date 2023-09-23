import type { WeddingInvitation } from '@prisma/client';

import {
    weddingInvitations,
    weddingInvitation,
    createWeddingInvitation,
    updateWeddingInvitation,
    deleteWeddingInvitation,
} from './weddingInvitations';
import type { StandardScenario } from './weddingInvitations.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('weddingInvitations', () => {
    scenario(
        'returns all weddingInvitations',
        async (scenario: StandardScenario) => {
            const result = await weddingInvitations();

            expect(result.length).toEqual(
                Object.keys(scenario.weddingInvitation).length
            );
        }
    );

    scenario(
        'returns a single weddingInvitation',
        async (scenario: StandardScenario) => {
            const result = await weddingInvitation({
                id: scenario.weddingInvitation.one.id,
            });

            expect(result).toEqual(scenario.weddingInvitation.one);
        }
    );

    scenario(
        'creates a weddingInvitation',
        async (scenario: StandardScenario) => {
            const result = await createWeddingInvitation({
                input: {
                    weddingId: scenario.weddingInvitation.two.weddingId,
                    invitationType: 'DAY',
                    email: 'String',
                },
            });

            expect(result.weddingId).toEqual(
                scenario.weddingInvitation.two.weddingId
            );
            expect(result.invitationType).toEqual('DAY');
            expect(result.email).toEqual('String');
        }
    );

    scenario(
        'updates a weddingInvitation',
        async (scenario: StandardScenario) => {
            const original = (await weddingInvitation({
                id: scenario.weddingInvitation.one.id,
            })) as WeddingInvitation;
            const result = await updateWeddingInvitation({
                id: original.id,
                input: { invitationType: 'EVENING' },
            });

            expect(result.invitationType).toEqual('EVENING');
        }
    );

    scenario(
        'deletes a weddingInvitation',
        async (scenario: StandardScenario) => {
            const original = (await deleteWeddingInvitation({
                id: scenario.weddingInvitation.one.id,
            })) as WeddingInvitation;
            const result = await weddingInvitation({ id: original.id });

            expect(result).toEqual(null);
        }
    );
});

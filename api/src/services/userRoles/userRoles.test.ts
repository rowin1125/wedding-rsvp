import type { UserRole } from '@prisma/client';

import {
    userRoles,
    userRole,
    createUserRole,
    updateUserRole,
    deleteUserRole,
} from './userRoles';
import type { StandardScenario } from './userRoles.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userRoles', () => {
    scenario('returns all userRoles', async (scenario: StandardScenario) => {
        const result = await userRoles();

        expect(result.length).toEqual(Object.keys(scenario.userRole).length);
    });

    scenario(
        'returns a single userRole',
        async (scenario: StandardScenario) => {
            const result = await userRole({ id: scenario.userRole.one.id });

            expect(result).toEqual(scenario.userRole.one);
        }
    );

    scenario('creates a userRole', async (scenario: StandardScenario) => {
        const result = await createUserRole({
            input: { userId: scenario.userRole.two.userId },
        });

        expect(result.userId).toEqual(scenario.userRole.two.userId);
    });

    scenario('updates a userRole', async (scenario: StandardScenario) => {
        const original = (await userRole({
            id: scenario.userRole.one.id,
        })) as UserRole;
        const result = await updateUserRole({
            id: original.id,
            input: { userId: scenario.userRole.two.userId },
        });

        expect(result.userId).toEqual(scenario.userRole.two.userId);
    });

    scenario('deletes a userRole', async (scenario: StandardScenario) => {
        const original = (await deleteUserRole({
            id: scenario.userRole.one.id,
        })) as UserRole;
        const result = await userRole({ id: original.id });

        expect(result).toEqual(null);
    });
});

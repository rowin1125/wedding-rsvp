import type { Prisma, User } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: {
            data: {
                email: 'String2448486',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2024-03-27T14:10:36.246Z',
            },
        },
        two: {
            data: {
                email: 'String6241568',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2024-03-27T14:10:36.246Z',
            },
        },
    },
});

export type StandardScenario = ScenarioData<User, 'user'>;

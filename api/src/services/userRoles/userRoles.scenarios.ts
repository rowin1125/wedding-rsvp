import type { Prisma, UserRole } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.UserRoleCreateArgs>({
    userRole: {
        one: {
            data: {
                user: {
                    create: {
                        email: 'String7993551',
                        hashedPassword: 'String',
                        salt: 'String',
                        updatedAt: '2024-03-27T14:10:55.186Z',
                    },
                },
            },
        },
        two: {
            data: {
                user: {
                    create: {
                        email: 'String7406580',
                        hashedPassword: 'String',
                        salt: 'String',
                        updatedAt: '2024-03-27T14:10:55.187Z',
                    },
                },
            },
        },
    },
});

export type StandardScenario = ScenarioData<UserRole, 'userRole'>;

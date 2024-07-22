import type { UserRoleRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const UserRole: UserRoleRelationResolvers = {
    user: (_obj, { root }) => {
        return db.userRole.findUnique({ where: { id: root?.id } }).user();
    },
};

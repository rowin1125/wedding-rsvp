export const schema = gql`
    type UserRole {
        id: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: Role!
        user: User!
        userId: String!
    }

    enum Role {
        ADMIN
        MASTER_OF_CEREMONIES
        WEDDING_OWNER
        USER
    }

    type Query {
        userRoles: [UserRole!]! @requireAuth
        userRole(id: Int!): UserRole @requireAuth
    }

    input CreateUserRoleInput {
        name: Role!
        userId: String!
    }

    input UpdateUserRoleInput {
        name: Role
        userId: String
    }

    type Mutation {
        createUserRole(input: CreateUserRoleInput!): UserRole! @requireAuth
        updateUserRole(id: Int!, input: UpdateUserRoleInput!): UserRole!
            @requireAuth
        deleteUserRole(id: Int!): UserRole! @requireAuth
    }
`;

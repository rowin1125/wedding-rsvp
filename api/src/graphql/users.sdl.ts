export const schema = gql`
    type User {
        id: String!
        email: String!
        hashedPassword: String!
        salt: String!
        resetToken: String
        resetTokenExpiresAt: DateTime
        verified: Boolean!
        verifiedToken: String
        wedding: Wedding
        weddingId: String
        createdAt: DateTime!
        updatedAt: DateTime!
        roles: [UserRole]!
    }

    type Query {
        users: [User!]! @requireAuth
        user(id: String!): User @requireAuth
    }

    input ActivateUserInput {
        verifiedToken: String!
        password: String!
    }

    input ResendActivateUserInput {
        email: String!
    }

    type Mutation {
        activateUser(input: ActivateUserInput!): User! @skipAuth
        resendActivateUser(input: ResendActivateUserInput!): User! @skipAuth
    }
`;

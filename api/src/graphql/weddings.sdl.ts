export const schema = gql`
    type Wedding {
        id: String!
        date: DateTime!
        name: String!
        gcloudStoragePath: String!
        dayInvitationAmount: Int!
        eveningInvitationAmount: Int!
        weddingInvitation: [WeddingInvitation]!
        weddingGuest: [WeddingGuest]!
        mediaLibrary: MediaLibrary
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        wedding(id: String!): Wedding @skipAuth
    }

    input CreateWeddingInput {
        date: DateTime!
        name: String!
        dayInvitationAmount: Int!
        eveningInvitationAmount: Int!
    }

    input UpdateWeddingInput {
        date: DateTime
        name: String!
        dayInvitationAmount: Int
        eveningInvitationAmount: Int
    }

    type Mutation {
        createWedding(input: CreateWeddingInput!): Wedding! @requireAuth
        updateWedding(id: String!, input: UpdateWeddingInput!): Wedding!
            @requireAuth
        deleteWedding(id: String!): Wedding! @requireAuth
    }
`;

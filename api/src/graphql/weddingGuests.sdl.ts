export const schema = gql`
    type WeddingGuest {
        id: String!
        weddingId: String!
        wedding: Wedding!
        name: String
        firstName: String
        lastName: String
        weddingInvitation: WeddingInvitation
        weddingInvitationId: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        weddingGuests: [WeddingGuest!]! @skipAuth
        weddingGuest(id: String!): WeddingGuest @skipAuth
    }

    input CreateWeddingGuestInput {
        weddingId: String!
        name: String
        weddingInvitationId: String
        firstName: String
        lastName: String
    }

    input UpdateWeddingGuestInput {
        weddingId: String!
        name: String
        weddingInvitationId: String!
        firstName: String
        lastName: String
    }

    type Mutation {
        createWeddingGuest(input: CreateWeddingGuestInput!): WeddingGuest!
            @skipAuth
        updateWeddingGuest(
            id: String!
            input: UpdateWeddingGuestInput!
        ): WeddingGuest! @skipAuth
        deleteWeddingGuest(id: String!): WeddingGuest! @requireAuth
    }
`;

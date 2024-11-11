export const schema = gql`
    type WeddingDayPart {
        id: String!
        name: String!
        startTime: DateTime!
        endTime: DateTime!
        description: String
        guestDayPartsPresents: [GuestDayPartPresent!]!
        totalGuests: Int!
        wedding: Wedding!
        weddingId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        weddingRsvpLandingPages: [WeddingRsvpLandingPage!]!
    }

    type Query {
        weddingDayParts: [WeddingDayPart!]! @requireAuth
        weddingDayPart(id: String!): WeddingDayPart @requireAuth
    }

    input CreateWeddingDayPartInput {
        name: String!
        startTime: DateTime!
        endTime: DateTime!
        description: String
    }

    input UpdateWeddingDayPartInput {
        name: String
        startTime: DateTime
        endTime: DateTime
        description: String
    }

    input UpdateWeddingDayPartsInput {
        id: String
        input: UpdateWeddingDayPartInput!
    }

    type Mutation {
        updateWeddingDayParts(
            input: [UpdateWeddingDayPartsInput!]!
        ): [WeddingDayPart!]! @requireAuth
    }
`;

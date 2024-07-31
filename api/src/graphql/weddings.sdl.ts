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
        bannerImage: AssetReference
        partners: [Partner]!
        theme: String
        preferredSeason: String
        isAbroad: Boolean
        dayParts: [WeddingDayPart!]!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        wedding(id: String!): Wedding @skipAuth
    }

    input CreateWeddingInput {
        date: DateTime!
        name: String!
        partners: [CreatePartnerInput!]!
        theme: String
        preferredSeason: String
        isAbroad: Boolean
        dayParts: [CreateWeddingDayPartInput!]!
    }

    input UpdateWeddingInput {
        date: DateTime
        name: String
        bannerImageId: String
        bannerImageMetadata: JSON
        partners: [UpdatePartnerInput]
        theme: String
        preferredSeason: String
        isAbroad: Boolean
        dayParts: [UpdateWeddingDayPartInput]
    }

    type Mutation {
        createWedding(input: CreateWeddingInput!): Wedding! @requireAuth
        updateWedding(id: String!, input: UpdateWeddingInput!): Wedding!
            @requireAuth
        deleteWedding(id: String!): Wedding! @requireAuth
    }
`;

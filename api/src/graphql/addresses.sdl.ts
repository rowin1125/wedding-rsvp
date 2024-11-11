export const schema = gql`
    type Address {
        id: String!
        street: String
        houseNumber: String
        zipCode: String
        city: String
        country: String
        livesAbroad: Boolean!
        addressDataMissing: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
        guestGroup: [GuestGroup]
        guests: [Guest]
        weddingInvitationResponse: WeddingInvitationResponse
        weddingInvitationResponseId: String
        wedding: Wedding
        weddingId: String
    }

    type Query {
        addresses: [Address!]! @requireAuth
        address(id: String!): Address @requireAuth
    }

    input CreateAddressInput {
        street: String
        houseNumber: String
        zipCode: String
        city: String
        country: String
        livesAbroad: Boolean!
        weddingInvitationResponseId: String
        weddingId: String
    }

    input ExternalUpdateAddressInput {
        id: String!
        input: UpdateAddressInput!
    }

    input UpdateAddressInput {
        street: String
        houseNumber: String
        zipCode: String
        city: String
        country: String
        livesAbroad: Boolean
        weddingInvitationResponseId: String
    }

    type Mutation {
        createAddress(input: CreateAddressInput!): Address! @requireAuth
        updateAddress(id: String!, input: UpdateAddressInput!): Address!
            @requireAuth
        deleteAddress(id: String!): Address! @requireAuth
    }
`;

export const schema = gql`
    type GuestGroup {
        id: String!
        name: String
        guestGroupType: GuestGroupType!
        guestGroupRelationType: String!
        address: Address
        guests: [Guest]!
        wedding: Wedding!
        weddingId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    enum GuestGroupType {
        FAMILY
        PARTNERS
        INDIVIDUAL
    }

    type Query {
        guestGroups(weddingId: String!): [GuestGroup!]! @requireAuth
        guestGroup(id: String!): GuestGroup @requireAuth
    }

    input CreateGuestGroupInput {
        name: String
        guestGroupRelationType: String!
        guestGroupType: GuestGroupType!
        address: CreateAddressInput
        guests: [CreateGuestInput!]
    }

    input UpdateGuestGroupInput {
        name: String
        guestGroupRelationType: String
        guestGroupType: GuestGroupType
        address: ExternalUpdateAddressInput
        guests: [CreateGuestInput!]
    }

    type Mutation {
        createGuestGroup(input: CreateGuestGroupInput!): GuestGroup!
            @requireAuth
        updateGuestGroup(
            id: String!
            input: UpdateGuestGroupInput!
        ): GuestGroup! @requireAuth
        deleteGuestGroup(id: String!): GuestGroup! @requireAuth
    }
`;

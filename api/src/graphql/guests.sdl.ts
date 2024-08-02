export const schema = gql`
    type Guest {
        id: String!
        firstName: String!
        lastName: String!
        fullName: String!
        isChild: Boolean!
        phoneNumber: String
        email: String
        dietary: [String]!
        guestGroup: GuestGroup
        guestGroupId: String
        notes: String
        guestOrigin: GuestOrigin
        connectedViaRsvp: Boolean
        address: Address
        wedding: Wedding!
        weddingId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        guestWeddingResponse: GuestWeddingResponse
        guestDayPartsPresents: [GuestDayPartPresent]!
    }

    enum GuestOrigin {
        GUEST_LIST
        RSVP
    }

    type Query {
        guests(weddingId: String!, input: GuestSearchInput): [Guest!]!
            @requireAuth
        guest(id: String!): Guest @requireAuth
    }

    input GuestSearchInput {
        guestOrigin: GuestOrigin
        connectedViaRsvp: Boolean
    }

    input ExternalUpdateGuestInput {
        guestId: String
        input: UpdateGuestInput!
    }

    input CreateGuestInput {
        firstName: String!
        lastName: String!
        isChild: Boolean
        phoneNumber: String
        email: String
        dietary: [String]!
        notes: String
        guestGroupId: String
        guestOrigin: GuestOrigin
        dayPartsPresent: [CreateGuestDayPartPresentInput!]
    }

    input UpdateGuestInput {
        firstName: String
        lastName: String
        isChild: Boolean
        phoneNumber: String
        email: String
        dietary: [String]!
        notes: String
        guestOrigin: GuestOrigin
        dayPartsPresent: [ExternalUpdateGuestDayPartPresentInput!]
    }

    input ConnectGuestToRsvpInput {
        guestListGuestId: String!
        rsvpGuestId: String!
    }

    type Mutation {
        createGuest(input: CreateGuestInput!): Guest! @requireAuth
        updateGuest(id: String!, input: UpdateGuestInput!): Guest! @requireAuth
        deleteGuest(id: String!): Guest! @requireAuth
        connectGuestToRsvp(input: ConnectGuestToRsvpInput!): Guest! @requireAuth
    }
`;

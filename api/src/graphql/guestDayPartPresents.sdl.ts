export const schema = gql`
    type GuestDayPartPresent {
        id: String!
        guestWeddingResponseStatus: GuestWeddingResponseStatus!
        guestWeddingResponse: GuestWeddingResponse
        guestWeddingResponseId: String
        weddingDayPart: WeddingDayPart!
        weddingDayPartId: String!
        guest: Guest
        guestId: String
        weddingRsvpLandingPage: WeddingRsvpLandingPage
        weddingRsvpLandingPageId: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    enum GuestWeddingResponseStatus {
        UNKNOWN
        ACCEPTED
        DECLINED
        UNINVITED
    }

    type Query {
        guestDayPartPresents: [GuestDayPartPresent!]! @requireAuth
        guestDayPartPresent(id: String!): GuestDayPartPresent @requireAuth
    }

    input ExternalUpdateGuestDayPartPresentInput {
        id: String
        input: UpdateGuestDayPartPresentInput!
    }

    input CreateGuestDayPartPresentInput {
        weddingDayPartId: String!
        guestWeddingResponseStatus: GuestWeddingResponseStatus!
        guestWeddingResponseId: String
        guestId: String
        weddingRsvpLandingPageId: String
    }

    input UpdateGuestDayPartPresentInput {
        weddingDayPartId: String
        guestWeddingResponseId: String
        guestWeddingResponseStatus: GuestWeddingResponseStatus
        guestId: String
        weddingRsvpLandingPageId: String
    }

    type Mutation {
        createGuestDayPartPresent(
            input: CreateGuestDayPartPresentInput!
        ): GuestDayPartPresent! @requireAuth
        updateGuestDayPartPresent(
            id: String!
            input: UpdateGuestDayPartPresentInput!
        ): GuestDayPartPresent! @requireAuth
    }
`;

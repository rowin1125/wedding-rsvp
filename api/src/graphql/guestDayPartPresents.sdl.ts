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
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    enum GuestWeddingResponseStatus {
        UNKNOWN
        ACCEPTED
        DECLINED
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
    }

    input UpdateGuestDayPartPresentInput {
        weddingDayPartId: String
        guestWeddingResponseId: String
        guestWeddingResponseStatus: GuestWeddingResponseStatus
        guestId: String
    }

    type Mutation {
        updateGuestDayPartPresent(
            id: String!
            input: UpdateGuestDayPartPresentInput!
        ): GuestDayPartPresent! @requireAuth
    }
`;

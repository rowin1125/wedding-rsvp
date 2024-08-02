export const schema = gql`
    type GuestWeddingResponse {
        id: String!
        dayPartsPresent: [GuestDayPartPresent]!
        remarks: String
        guest: Guest
        guestId: String
        createdAt: DateTime!
        updatedAt: DateTime!
        weddingInvitationResponse: WeddingInvitationResponse
        weddingInvitationResponseId: String
    }

    # type Query {    }

    input CreateGuestWeddingResponseInput {
        remarks: String
        guest: CreateGuestInput!
        weddingInvitationResponseId: String
        dayPartsPresent: [CreateGuestDayPartPresentInput!]!
    }

    input ExternalUpdateGuestWeddingResponseInput {
        guestWeddingResponseId: String
        input: UpdateGuestWeddingResponseInput!
    }

    input UpdateGuestWeddingResponseInput {
        remarks: String
        guest: ExternalUpdateGuestInput
        weddingInvitationResponseId: String
        dayPartsPresent: [ExternalUpdateGuestDayPartPresentInput!]!
    }

    # type Mutation {}
`;

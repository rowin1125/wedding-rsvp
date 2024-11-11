export const schema = gql`
    type WeddingInvitationResponse {
        id: String!
        guestWeddingResponses: [GuestWeddingResponse]!
        address: Address!
        createdAt: DateTime!
        updatedAt: DateTime!
        wedding: Wedding!
        weddingId: String!
        weddingRsvpLandingPage: WeddingRsvpLandingPage
        weddingRsvpLandingPageId: String
    }

    type Query {
        weddingInvitationResponses(
            weddingId: String!
            input: WeddingInvitationResponsesInput
        ): [WeddingInvitationResponse!]! @requireAuth
        weddingInvitationResponse(id: String!): WeddingInvitationResponse
            @skipAuth
    }

    input WeddingInvitationResponsesInput {
        filterAssignedUsers: Boolean
    }

    input CreateWeddingInvitationResponseInput {
        weddingId: String!
        guestWeddingResponses: [CreateGuestWeddingResponseInput!]!
        address: CreateAddressInput!
        weddingRsvpLandingPageId: String!
    }

    input UpdateWeddingInvitationResponseInput {
        weddingId: String
        guestWeddingResponses: [ExternalUpdateGuestWeddingResponseInput!]!
        address: UpdateAddressInput
    }

    type Mutation {
        createWeddingInvitationResponse(
            input: CreateWeddingInvitationResponseInput!
        ): WeddingInvitationResponse! @skipAuth
        updateWeddingInvitationResponse(
            id: String!
            input: UpdateWeddingInvitationResponseInput!
        ): WeddingInvitationResponse! @skipAuth
        deleteWeddingInvitationResponse(
            id: String!
        ): WeddingInvitationResponse! @requireAuth
    }
`;

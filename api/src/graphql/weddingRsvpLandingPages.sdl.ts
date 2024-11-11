export const schema = gql`
    type WeddingRsvpLandingPage {
        id: String!
        name: String!
        password: String
        isActive: Boolean!
        pageBuilderData: JSON!
        sidebarData: JSON!
        wedding: Wedding!
        weddingId: String!
        weddingDayParts: [WeddingDayPart]!
        weddingInvitationResponses: [WeddingInvitationResponse]!
        guestDayPartsPresent: [GuestDayPartPresent!]
        qrCode: String
        qrCodeId: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        weddingRsvpLandingPages: [WeddingRsvpLandingPage!]! @requireAuth
        weddingRsvpLandingPage(id: String!): WeddingRsvpLandingPage @skipAuth
    }

    input CreateWeddingRsvpInput {
        name: String!
        pageBuilderData: JSON!
        sidebarData: JSON
        password: String
        isActive: Boolean!
        weddingId: String!
        weddingDayPartsIds: [String!]!
    }

    input UpdateWeddingRsvpInput {
        name: String
        pageBuilderData: JSON
        sidebarData: JSON
        password: String
        isActive: Boolean
        weddingId: String
        weddingDayPartsIds: [String!]
        qrCodeId: String
        qrCode: String
    }

    type Mutation {
        createWeddingRsvpLandingPage(
            input: CreateWeddingRsvpInput!
        ): WeddingRsvpLandingPage! @requireAuth
        updateWeddingRsvpLandingPage(
            id: String!
            input: UpdateWeddingRsvpInput!
        ): WeddingRsvpLandingPage! @requireAuth
        updateWeddingRsvpLandingPageQrCode(
            id: String!
            qrCodeId: String
            qrCode: String
        ): WeddingRsvpLandingPage! @requireAuth
        deleteWeddingRsvpLandingPage(id: String!): WeddingRsvpLandingPage!
            @requireAuth
    }
`;

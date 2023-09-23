export const schema = gql`
    type WeddingInvitation {
        id: String!
        weddingId: String!
        presence: Boolean!
        dietaryWishes: String
        remarks: String
        wedding: Wedding!
        weddingGuests: [WeddingGuest]!
        invitationType: InvitationType!
        email: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    enum InvitationType {
        DAY
        EVENING
    }

    type Query {
        weddingInvitations(weddingId: String!): [WeddingInvitation!]! @skipAuth
        weddingInvitation(id: String!): WeddingInvitation @skipAuth
    }

    input CreateWeddingInvitationInput {
        weddingId: String!
        presence: Boolean!
        weddingGuests: [CreateWeddingGuestInput!]!
        dietaryWishes: String
        remarks: String
        invitationType: InvitationType!
        email: String!
    }

    input UpdateWeddingInvitationInput {
        weddingId: String
        presence: Boolean
        weddingGuests: [CreateWeddingGuestInput!]
        dietaryWishes: String
        remarks: String
        invitationType: InvitationType
        email: String
    }

    type Mutation {
        createWeddingInvitation(
            input: CreateWeddingInvitationInput!
        ): WeddingInvitation! @skipAuth
        updateWeddingInvitation(
            id: String!
            input: UpdateWeddingInvitationInput!
        ): WeddingInvitation! @skipAuth
        deleteWeddingInvitation(id: String!): WeddingInvitation! @requireAuth
    }
`;

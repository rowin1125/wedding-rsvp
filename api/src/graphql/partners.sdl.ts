export const schema = gql`
    type Partner {
        id: String!
        firstName: String!
        lastName: String!
        gender: Gender!
        type: PartnerType!
        wedding: Wedding!
        weddingId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    enum PartnerType {
        BRIDE
        GROOM
    }

    input CreatePartnerInput {
        firstName: String!
        lastName: String!
        gender: Gender!
        type: PartnerType!
    }

    input UpdatePartnerInput {
        firstName: String
        lastName: String
        gender: Gender
        type: PartnerType
    }

    type Mutation {
        updatePartners(
            ids: [String!]!
            input: [UpdatePartnerInput!]!
        ): [Partner!]! @requireAuth
    }
`;

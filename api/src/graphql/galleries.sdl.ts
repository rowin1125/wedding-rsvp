export const schema = gql`
    type Gallery {
        id: String!
        name: String!
        gcloudStoragePath: String!
        qrCode: String
        qrCodeId: String
        downloadUrl: String
        downloadRequestAt: DateTime
        downloadPending: Boolean!
        wedding: Wedding!
        weddingId: String!
        assets(take: Int, skip: Int): PaginatedAssets!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type PaginatedAssets {
        items: [Asset]!
        pages: Int!
        count: Int!
    }

    type Query {
        galleries(weddingId: String!): [Gallery!]! @requireAuth
        gallery(id: String!): Gallery @skipAuth
    }

    input CreateGalleryInput {
        name: String!
        weddingId: String!
        qrCodeId: String
        qrCode: String
    }

    input UpdateGalleryInput {
        name: String
        weddingId: String
        qrCodeId: String
        qrCode: String
    }

    type Mutation {
        createGallery(input: CreateGalleryInput!): Gallery! @requireAuth
        updateGallery(id: String!, input: UpdateGalleryInput!): Gallery!
            @requireAuth
        deleteGallery(id: String!): Gallery! @requireAuth
        downloadGallery(id: String!): String! @requireAuth
    }
`;

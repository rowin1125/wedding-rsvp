export const schema = gql`
    type Gallery {
        id: String!
        name: String!
        gcloudStoragePath: String!
        qrCode: String
        qrCodeId: String
        wedding: Wedding!
        weddingId: String!
        assets(take: Int, skip: Int): PaginatedAssets!
        createdAt: DateTime!
        updatedAt: DateTime!
        galleryDownloadRequests: [GalleryDownloadRequest]!
        maxAllowedDownloads: Int!
        totalDownloadRequests: Int!
        bannerImage: AssetReference
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
        bannerImageId: String
        bannerImageMetadata: JSON
    }

    input UpdateGalleryInput {
        name: String
        weddingId: String
        qrCodeId: String
        qrCode: String
        bannerImageId: String
        bannerImageMetadata: JSON
    }

    type Mutation {
        createGallery(input: CreateGalleryInput!): Gallery! @requireAuth
        updateGallery(id: String!, input: UpdateGalleryInput!): Gallery!
            @requireAuth
        deleteGallery(id: String!): Gallery! @requireAuth
        downloadGallery(id: String!): String! @requireAuth
    }
`;

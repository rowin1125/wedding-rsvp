export const schema = gql`
    type Asset {
        id: String!
        gallery: Gallery
        galleryId: String
        gcloudStoragePath: String!
        originalFilename: String!
        fileType: String!
        metadata: JSONObject!
        url: String!
        thumbnailUrl: String!
        previewUrl: String!
        mediaLibrary: MediaLibrary
        mediaLibraryId: String
        title: String
        altText: String
        description: String
        createdAt: DateTime!
        updatedAt: DateTime!
        assetReferences: [AssetReference]
    }

    input CreateAssetInput {
        gcloudStoragePath: String!
        fileType: String!
        uuid: String!
        originalFilename: String!
    }

    input UpdateAssetInput {
        originalFilename: String
        title: String
        altText: String
        description: String
    }

    type CreateAssetsResponse {
        count: Int!
    }

    type Mutation {
        requestSigningUrl(
            gcloudStoragePath: String!
            weddingId: String!
        ): String! @skipAuth
        createAssets(
            input: [CreateAssetInput!]!
            weddingId: String!
            galleryId: String
            mediaLibraryId: String
        ): CreateAssetsResponse @skipAuth
        updateAsset(id: String!, input: UpdateAssetInput!): Asset! @requireAuth
        deleteAssets(ids: [String!]!): [Asset!]! @requireAuth
    }
`;

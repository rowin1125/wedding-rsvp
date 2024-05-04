export const schema = gql`
    type Asset {
        id: String!
        gallery: Gallery!
        galleryId: String!
        gcloudStoragePath: String!
        fileType: String!
        metadata: JSONObject!
        url: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query {
        assets(galleryId: String!): [Asset!]! @requireAuth
        asset(id: String!, galleryId: String!): Asset @requireAuth
    }

    input CreateAssetInput {
        gcloudStoragePath: String!
        fileType: String!
        uuid: String!
    }

    type CreateAssetsResponse {
        count: Int!
    }

    type Mutation {
        requestSigningUrl(gcloudStoragePath: String!): String! @skipAuth
        createAssets(
            input: [CreateAssetInput!]!
            galleryId: String!
        ): CreateAssetsResponse @skipAuth
        deleteAsset(id: String!): Asset! @requireAuth
    }
`;

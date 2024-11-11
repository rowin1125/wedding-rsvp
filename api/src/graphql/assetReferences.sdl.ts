export const schema = gql`
    type AssetReference {
        id: String!
        objectReference: String
        asset: Asset!
        assetId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        galleryReferences: Gallery
        weddingReferences: Wedding
        weddingRsvpLandingPage: WeddingRsvpLandingPage
        metadata: AssetReferenceMetadata
    }

    type Query {
        assetReference(id: String!): AssetReference @requireAuth
    }

    input CreateAssetReferenceInput {
        assetId: String!
        metadata: JSON
        weddingRsvpLandingPageId: String
        objectReference: String
    }

    type Mutation {
        createAssetReference(
            input: CreateAssetReferenceInput!
        ): AssetReference! @requireAuth
        deleteAssetReference(id: String!, objectReference: String): Boolean!
            @requireAuth
    }

    type AssetReferenceMetadata {
        focalPoint: FocalPoint
    }

    type FocalPoint {
        x: Float
        y: Float
    }
`;

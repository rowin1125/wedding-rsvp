export const schema = gql`
    type AssetReference {
        id: String!
        asset: Asset!
        assetId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        galleryReferences: Gallery
        weddingReferences: Wedding
        metadata: AssetReferenceMetadata
    }
    type AssetReferenceMetadata {
        focalPoint: FocalPoint
    }

    type FocalPoint {
        x: Float
        y: Float
    }
`;

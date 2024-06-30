export const schema = gql`
    type GalleryDownloadRequest {
        id: String!
        gallery: Gallery!
        galleryId: String!
        status: GalleryDownloadRequestStatus!
        validUntil: DateTime
        downloadUrl: String
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    enum GalleryDownloadRequestStatus {
        PENDING
        SUCCESS
        FAILED
    }
`;

export const schema = gql`
    type QrCode {
        id: String!
        code: String!
        redirectUrl: String!
        isActive: Boolean!
        baseUrl: String!
        usageCount: Int!
        expiresAt: DateTime
        metadata: QrCodeMetadata
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type QrCodeMetadata {
        scale: Int
        margin: Int
        version: Int
        color: QRCodeMetadataColor
    }

    type QRCodeMetadataColor {
        dark: String
        light: String
    }

    type Query {
        qrCode(id: String!): QrCode @skipAuth
        scannedQrCode(id: String!): QrCode @skipAuth
    }

    input QrCodeMetadataInput {
        scale: Int
        margin: Int
        version: Int
        color: QRCodeMetadataColorInput
    }

    input QRCodeMetadataColorInput {
        dark: String
        light: String
    }

    input CreateQrCodeInput {
        id: String
        redirectUrl: String!
        baseUrl: String!
        isActive: Boolean!
        expiresAt: DateTime
        metadata: QrCodeMetadataInput
    }

    input UpdateQrCodeInput {
        id: String
        redirectUrl: String
        baseUrl: String
        isActive: Boolean
        expiresAt: DateTime
        metadata: QrCodeMetadataInput
    }

    type Mutation {
        createQrCode(input: CreateQrCodeInput!): QrCode! @requireAuth
        updateQrCode(id: String!, input: UpdateQrCodeInput!): QrCode!
            @requireAuth
        deleteQrCode(id: String!): QrCode! @requireAuth
    }
`;

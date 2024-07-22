export const schema = gql`
    type MediaLibrary {
        id: String!
        gcloudStoragePath: String!
        assets(
            take: Int
            skip: Int
            sortField: AssetSortField
            sortOrder: SortOrder
            query: String
        ): PaginatedAssets!
        maxAllowedAssets: Int!
        wedding: Wedding!
        weddingId: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type PaginatedAssets {
        items: [Asset]!
        pages: Int!
        count: Int!
        totalCount: Int!
    }

    enum AssetSortField {
        CREATED_AT
        FILE_NAME
        FILE_TYPE
    }

    enum SortOrder {
        ASC
        DESC
    }

    type Query {
        mediaLibrary(id: String!): MediaLibrary @requireAuth
    }
`;

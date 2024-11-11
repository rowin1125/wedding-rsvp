export const schema = gql`
    type UserRole {
        id: Int!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: Role!
        user: User!
        userId: String!
    }

    enum Role {
        ADMIN
        MASTER_OF_CEREMONIES
        WEDDING_OWNER
        USER
    }
`;

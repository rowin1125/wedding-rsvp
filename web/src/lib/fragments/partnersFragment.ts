import { registerFragment } from '@redwoodjs/web/apollo';

export const PartnersBody = registerFragment(
    gql`
        fragment PartnersBody on Partner {
            id
            firstName
            lastName
            type
            gender
            weddingId
        }
    `
);

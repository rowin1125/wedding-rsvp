import { registerFragment } from '@redwoodjs/web/apollo';

export const AddressBody = registerFragment(
    gql`
        fragment AddressBody on Address {
            id
            street
            houseNumber
            zipCode
            city
            country
            livesAbroad
        }
    `
);

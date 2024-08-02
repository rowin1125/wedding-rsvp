import { registerFragment } from '@redwoodjs/web/dist/apollo';

import { AddressBody } from './addressFragment';
import { GuestWeddingResponseBody } from './guestWeddingResponseFragment';

export const WeddingInvitationResponseBody = registerFragment(
    gql`
        fragment WeddingInvitationResponseBody on WeddingInvitationResponse {
            id
            guestWeddingResponses {
                ...GuestWeddingResponseBody
            }
            address {
                ...AddressBody
            }
            createdAt
        }
        ${AddressBody.fragment}
        ${GuestWeddingResponseBody.fragment}
    `
);

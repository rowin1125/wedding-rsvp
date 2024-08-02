import { registerFragment } from '@redwoodjs/web/dist/apollo';

import { DayPartsPresentBody } from './dayPartsPresentFragment';
import { GuestBody } from './guestFragment';

export const GuestWeddingResponseBody = registerFragment(
    gql`
        fragment GuestWeddingResponseBody on GuestWeddingResponse {
            id
            weddingInvitationResponseId
            remarks
            guest {
                ...GuestBody
            }
            dayPartsPresent {
                ...DayPartsPresentBody
            }
        }
        ${GuestBody.fragment}
        ${DayPartsPresentBody.fragment}
    `
);

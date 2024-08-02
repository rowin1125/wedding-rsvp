import { registerFragment } from '@redwoodjs/web/apollo';

import { DayPartsPresentBody } from './dayPartsPresentFragment';

export const GuestBody = registerFragment(
    gql`
        fragment GuestBody on Guest {
            id
            firstName
            lastName
            fullName
            isChild
            phoneNumber
            email
            dietary
            notes
            guestOrigin
            weddingId
            createdAt
            updatedAt
            guestGroupId
            connectedViaRsvp
            guestDayPartsPresents {
                ...DayPartsPresentBody
            }
        }
        ${DayPartsPresentBody.fragment}
    `
);

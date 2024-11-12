import { registerFragment } from '@redwoodjs/web/apollo';

export const DayPartsPresentBody = registerFragment(
    gql`
        fragment DayPartsPresentBody on GuestDayPartPresent {
            id
            weddingDayPartId
            guestWeddingResponseId
            guestWeddingResponseStatus
            weddingDayPartId
            weddingDayPart {
                name
                endTime
            }
            weddingRsvpLandingPageId
        }
    `
);

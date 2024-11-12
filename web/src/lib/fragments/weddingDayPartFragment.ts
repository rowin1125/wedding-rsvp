import { registerFragment } from '@redwoodjs/web/apollo';

export const WeddingDayPartBody = registerFragment(
    gql`
        fragment WeddingDayPartBody on WeddingDayPart {
            id
            name
            startTime
            endTime
            description
            totalGuests
        }
    `
);

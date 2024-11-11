import { registerFragment } from '@redwoodjs/web/dist/apollo';

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

import {
    GetWeddingRsvpLandingPages,
    GetWeddingRsvpLandingPagesVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

export const GET_WEDDING_RSVP_LANDING_PAGES = gql`
    query GetWeddingRsvpLandingPages {
        weddingRsvpLandingPages {
            id
            name
            pageBuilderData
            sidebarData
            weddingId
            weddingDayParts {
                id
                name
            }
        }
    }
`;

export const useGetWeddingRsvpLandingPages = () => {
    const { data, ...queryData } = useQuery<
        GetWeddingRsvpLandingPages,
        GetWeddingRsvpLandingPagesVariables
    >(GET_WEDDING_RSVP_LANDING_PAGES);

    return {
        weddingRsvpLandingPages: data?.weddingRsvpLandingPages,
        ...queryData,
    };
};

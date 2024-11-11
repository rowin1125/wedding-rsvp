import {
    GetWeddingRsvpLandingPage,
    GetWeddingRsvpLandingPageVariables,
} from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

export const GET_WEDDING_RSVP_LANDING_PAGE = gql`
    query GetWeddingRsvpLandingPage($id: String!) {
        weddingRsvpLandingPage(id: $id) {
            id
            name
            pageBuilderData
            weddingId
            sidebarData
            weddingDayParts {
                id
                name
            }
            password
            isActive
            qrCode
            qrCodeId
        }
    }
`;

export const useGetWeddingRsvpLandingPage = () => {
    const { landingPageId: id } = useParams();
    const { data, ...queryData } = useQuery<
        GetWeddingRsvpLandingPage,
        GetWeddingRsvpLandingPageVariables
    >(GET_WEDDING_RSVP_LANDING_PAGE, {
        variables: { id },
        skip: !id,
    });

    return {
        weddingRsvpLandingPage: data?.weddingRsvpLandingPage,
        ...queryData,
        loading:
            queryData.loading || [1, 3, 4].includes(queryData.networkStatus),
    };
};

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { GET_WEDDING_RSVP_LANDING_PAGES } from 'src/pages/RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPages';

export const DELETE_RSVP_LANDING_PAGE_MUTATION = gql`
    mutation DeleteRsvpLandingPageMutation($id: String!) {
        deleteWeddingRsvpLandingPage(id: $id) {
            id
        }
    }
`;

export const useDeleteRsvpLandingPage = () => {
    const [deleteRsvpLandingPage, meta] = useMutation(
        DELETE_RSVP_LANDING_PAGE_MUTATION,
        {
            onCompleted: () => {
                navigate(routes.rsvpLandings());
            },
            refetchQueries: [
                {
                    query: GET_WEDDING_RSVP_LANDING_PAGES,
                },
            ],
        }
    );

    const handleDeleteRsvpLandingPage = async (id: string) => {
        await deleteRsvpLandingPage({
            variables: { id },
        });
    };

    return {
        deleteRsvpLandingPage: handleDeleteRsvpLandingPage,
        ...meta,
    };
};

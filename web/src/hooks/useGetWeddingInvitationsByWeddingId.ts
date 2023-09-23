import {
    GetWeddingInvitationsByWeddingIdQuery,
    GetWeddingInvitationsByWeddingIdQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

export const GET_WEDDING_INVITATION_BY_WEDDING_ID = gql`
    query GetWeddingInvitationsByWeddingIdQuery($weddingId: String!) {
        weddingInvitations(weddingId: $weddingId) {
            dietaryWishes
            email
            id
            invitationType
            presence
            remarks
            wedding {
                date
                id
                name
            }
            weddingGuests {
                id
                name
                weddingId
                weddingInvitationId
            }
            weddingId
            createdAt
            updatedAt
        }
    }
`;

export const useGetWeddingInvitationsByWeddingId = () => {
    const { currentUser } = useAuth();
    const weddingId = currentUser?.weddingId as string;

    const { data, ...query } = useQuery<
        GetWeddingInvitationsByWeddingIdQuery,
        GetWeddingInvitationsByWeddingIdQueryVariables
    >(GET_WEDDING_INVITATION_BY_WEDDING_ID, {
        variables: { weddingId },
        skip: !weddingId,
    });

    return {
        weddingInvitations: data?.weddingInvitations,
        ...query,
    };
};

import {
    GetGuestInvitationByIdQuery,
    GetGuestInvitationByIdQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

export const GET_GUEST_INVITATION_BY_ID = gql`
    query GetGuestInvitationByIdQuery($id: String!) {
        weddingInvitation(id: $id) {
            dietaryWishes
            email
            id
            invitationType
            useCouponCode
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
        }
    }
`;

export const useGetGuestInvitationById = (id: string) => {
    const { data, ...query } = useQuery<
        GetGuestInvitationByIdQuery,
        GetGuestInvitationByIdQueryVariables
    >(GET_GUEST_INVITATION_BY_ID, {
        variables: { id },
        skip: !id,
    });

    return {
        weddingInvitation: data?.weddingInvitation,
        ...query,
    };
};

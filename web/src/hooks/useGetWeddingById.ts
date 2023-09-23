import { GetWeddingQuery, GetWeddingQueryVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

export const GET_WEDDING_BY_ID = gql`
    query GetWeddingQuery($id: String!) {
        wedding(id: $id) {
            id
            name
            createdAt
            date
            dayInvitationAmount
            eveningInvitationAmount
            weddingInvitation {
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
    }
`;

export const useGetWeddingById = (id?: string) => {
    const { currentUser } = useAuth();
    const weddingId = id ?? (currentUser?.weddingId as string);

    const { data, ...query } = useQuery<
        GetWeddingQuery,
        GetWeddingQueryVariables
    >(GET_WEDDING_BY_ID, {
        variables: { id: weddingId },
        skip: !weddingId,
    });

    return {
        wedding: data?.wedding,
        ...query,
    };
};

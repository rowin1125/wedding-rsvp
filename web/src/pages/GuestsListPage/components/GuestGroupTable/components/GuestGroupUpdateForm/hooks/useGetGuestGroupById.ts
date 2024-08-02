import { GetGuestGroupById, GetGuestGroupByIdVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

export const GET_GUEST_GROUP_BY_ID = gql`
    query GetGuestGroupById($id: String!) {
        guestGroup(id: $id) {
            name
            weddingId
            address {
                id
                city
                country
                houseNumber
                livesAbroad
                street
                zipCode
                addressDataMissing
            }
            guestGroupRelationType
            guestGroupType
            id
            guests {
                id
                firstName
                lastName
            }
        }
    }
`;

export const useGetGuestGroupById = (id?: string) => {
    const { data, ...query } = useQuery<
        GetGuestGroupById,
        GetGuestGroupByIdVariables
    >(GET_GUEST_GROUP_BY_ID, {
        variables: {
            id: id ?? '',
        },
        skip: !id,
    });

    return {
        guestGroup: data?.guestGroup,
        ...query,
    };
};

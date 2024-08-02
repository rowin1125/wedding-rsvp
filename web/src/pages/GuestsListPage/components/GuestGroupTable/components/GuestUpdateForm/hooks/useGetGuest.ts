import { useToast } from '@chakra-ui/react';
import { GetGuestById, GetGuestByIdVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { GuestBody } from 'src/lib/fragments/guestFragment';

export const GET_GUEST_BY_ID = gql`
    query GetGuestById($id: String!) {
        guest(id: $id) {
            ...GuestBody
        }
    }
    ${GuestBody.fragment}
`;

export const useGetGuestById = (id?: string) => {
    const toast = useToast();
    const { data, ...query } = useQuery<GetGuestById, GetGuestByIdVariables>(
        GET_GUEST_BY_ID,
        {
            variables: {
                id: id ?? '',
            },
            skip: !id,
            onError: (error) => {
                toast({
                    title: 'Er is iets misgegaan',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                console.error('Error getting guest:', error);
            },
        }
    );

    return {
        guest: data?.guest,
        ...query,
    };
};

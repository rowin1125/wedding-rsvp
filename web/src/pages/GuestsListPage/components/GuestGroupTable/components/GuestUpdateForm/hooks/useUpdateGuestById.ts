import { useToast } from '@chakra-ui/react';
import { UpdateGuestById, UpdateGuestByIdVariables } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { GuestBody } from 'src/lib/fragments/guestFragment';
import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

export const UPDATE_GUEST_BY_ID = gql`
    mutation UpdateGuestById($input: UpdateGuestInput!, $id: String!) {
        updateGuest(input: $input, id: $id) {
            ...GuestBody
        }
    }
    ${GuestBody.fragment}
`;

export const useUpdateGuestById = () => {
    const toast = useToast();
    const [updateGuestById, mutationMeta] = useMutation<
        UpdateGuestById,
        UpdateGuestByIdVariables
    >(UPDATE_GUEST_BY_ID, {
        onError: (error) => {
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Error updating guest:', error);
        },
        refetchQueries: (res) => [
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: res.data?.updateGuest?.weddingId,
                },
            },
        ],
    });

    return {
        updateGuestById,
        ...mutationMeta,
    };
};

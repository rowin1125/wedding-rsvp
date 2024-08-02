import { useToast } from '@chakra-ui/react';
import { CreateGuest, CreateGuestVariables } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

export const CREATE_GUEST = gql`
    mutation CreateGuest($input: CreateGuestInput!) {
        createGuest(input: $input) {
            id
            firstName
            lastName
            email
            phoneNumber
            dietary
            isChild
            notes
            weddingId
            guestOrigin
        }
    }
`;

export const useCreateGuest = () => {
    const toast = useToast();
    const [createGuest, mutationMeta] = useMutation<
        CreateGuest,
        CreateGuestVariables
    >(CREATE_GUEST, {
        onError: (error) => {
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Error creating guest:', error);
        },
        refetchQueries: (res) => [
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: res.data?.createGuest?.weddingId,
                },
            },
        ],
    });

    return {
        createGuest,
        ...mutationMeta,
    };
};

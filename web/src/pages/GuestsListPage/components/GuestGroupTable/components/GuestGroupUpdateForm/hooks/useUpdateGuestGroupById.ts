import { useToast } from '@chakra-ui/react';
import {
    UpdateGuestGroupById,
    UpdateGuestGroupByIdVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

export const UPDATE_GUEST_GROUP_BY_ID = gql`
    mutation UpdateGuestGroupById(
        $input: UpdateGuestGroupInput!
        $id: String!
    ) {
        updateGuestGroup(input: $input, id: $id) {
            name
            weddingId
            address {
                id
                city
                country
                houseNumber
                addressDataMissing
                livesAbroad
                street
                zipCode
            }
            guestGroupRelationType
            guestGroupType
            id
        }
    }
`;

export const useUpdateGuestGroupById = () => {
    const toast = useToast();
    const [updateGuestGroupById, mutationMeta] = useMutation<
        UpdateGuestGroupById,
        UpdateGuestGroupByIdVariables
    >(UPDATE_GUEST_GROUP_BY_ID, {
        refetchQueries: (res) => [
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: res.data?.updateGuestGroup?.weddingId,
                },
            },
        ],
        onError: (error) => {
            console.error('Error updating guest group:', error);
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        },
    });

    return {
        updateGuestGroupById,
        ...mutationMeta,
    };
};

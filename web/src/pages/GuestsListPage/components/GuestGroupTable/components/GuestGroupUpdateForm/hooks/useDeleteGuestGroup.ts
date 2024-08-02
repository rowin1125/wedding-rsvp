import { useToast } from '@chakra-ui/react';
import {
    DeleteGuestGroupById,
    DeleteGuestGroupByIdVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

export const DELETE_GUEST_GROUP_BY_ID = gql`
    mutation DeleteGuestGroupById($id: String!) {
        deleteGuestGroup(id: $id) {
            id
            weddingId
        }
    }
`;

export const useDeleteGuestGroup = () => {
    const toast = useToast();
    const [deleteGuestGroupById, mutationMeta] = useMutation<
        DeleteGuestGroupById,
        DeleteGuestGroupByIdVariables
    >(DELETE_GUEST_GROUP_BY_ID, {
        onError: (error) => {
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Error deleting guest group:', error);
        },
        refetchQueries: (res) => [
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: res.data?.deleteGuestGroup?.weddingId,
                },
            },
        ],
    });

    const handleDeleteGuestGroupById = async (id: string) => {
        const response = await deleteGuestGroupById({
            variables: { id },
        });

        if (response.data?.deleteGuestGroup.id) {
            toast({
                title: 'Gastgroep verwijderd',
                status: 'success',
            });
        }
    };

    return {
        deleteGuestGroupById: handleDeleteGuestGroupById,
        ...mutationMeta,
    };
};

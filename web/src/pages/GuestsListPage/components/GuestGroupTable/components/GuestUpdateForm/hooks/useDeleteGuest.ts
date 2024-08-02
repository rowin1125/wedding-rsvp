import { useToast } from '@chakra-ui/react';
import { DeleteGuestById, DeleteGuestByIdVariables } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

export const DELETE_GUEST_BY_ID = gql`
    mutation DeleteGuestById($id: String!) {
        deleteGuest(id: $id) {
            id
            weddingId
        }
    }
`;

export const useDeleteGuest = () => {
    const toast = useToast();
    const [deleteGuestById, mutationMeta] = useMutation<
        DeleteGuestById,
        DeleteGuestByIdVariables
    >(DELETE_GUEST_BY_ID, {
        onError: (error) => {
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Error deleting guest:', error);
        },
        refetchQueries: (res) => [
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: res.data?.deleteGuest?.weddingId,
                },
            },
        ],
    });

    const handleDeleteGalleryById = async (id: string) => {
        const response = await deleteGuestById({
            variables: { id },
        });

        if (response.data?.deleteGuest.id) {
            toast({
                title: 'Gast verwijderd',
                status: 'success',
            });
        }
    };

    return {
        deleteGuestById: handleDeleteGalleryById,
        ...mutationMeta,
    };
};

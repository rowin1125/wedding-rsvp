import { useToast } from '@chakra-ui/react';
import {
    DeleteGalleryMutation,
    DeleteGalleryMutationVariables,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { GET_GALLERIES_BY_WEDDING_ID } from 'src/pages/GalleriesPage/hooks/useGetGalleries';

export const DELETE_GALLERY_MUTATION = gql`
    mutation DeleteGalleryMutation($id: String!) {
        deleteGallery(id: $id) {
            id
        }
    }
`;

export const useDeleteGallery = () => {
    const { currentUser } = useAuth();
    const toast = useToast();

    const [deleteGallery, mutationData] = useMutation<
        DeleteGalleryMutation,
        DeleteGalleryMutationVariables
    >(DELETE_GALLERY_MUTATION, {
        onCompleted: () => {
            toast({
                title: 'Gallery deleted',
                status: 'success',
            });
            navigate(routes.galleries());
        },
        onError: (error) => {
            toast({
                title: 'Error deleting gallery: ' + error.message,
                status: 'error',
            });
        },
        refetchQueries: [
            {
                query: GET_GALLERIES_BY_WEDDING_ID,
                variables: {
                    weddingId: currentUser?.weddingId as string,
                },
            },
        ],
    });

    const handleDeleteGalleryById = async (id: string) => {
        await deleteGallery({
            variables: { id },
        });
    };

    return {
        deleteGallery: handleDeleteGalleryById,
        ...mutationData,
    };
};

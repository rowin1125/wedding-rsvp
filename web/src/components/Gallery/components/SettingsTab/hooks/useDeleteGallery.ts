import {
    DeleteGalleryMutation,
    DeleteGalleryMutationVariables,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { GET_GALLERY_BY_WEDDING_ID } from 'src/pages/GalleriesPage/hooks/useGetGalleries';

export const DELETE_GALLERY_MUTATION = gql`
    mutation DeleteGalleryMutation($id: String!) {
        deleteGallery(id: $id) {
            id
        }
    }
`;

export const useDeleteGallery = () => {
    const { currentUser } = useAuth();

    const [deleteGallery, mutationData] = useMutation<
        DeleteGalleryMutation,
        DeleteGalleryMutationVariables
    >(DELETE_GALLERY_MUTATION, {
        onCompleted: () => {
            toast.success('Gallery deleted');
            navigate(routes.galleries());
        },
        onError: (error) => {
            toast.error('Error deleting gallery: ' + error.message);
        },
        refetchQueries: [
            {
                query: GET_GALLERY_BY_WEDDING_ID,
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

import {
    CreateGalleryMutation,
    CreateGalleryMutationVariables,
    UpdateGalleryMutation,
    UpdateGalleryMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { GET_GALLERY_BY_WEDDING_ID } from 'src/pages/GalleriesPage/hooks/useGetGalleries';

export const CREATE_GALLERY = gql`
    mutation CreateGalleryMutation($input: CreateGalleryInput!) {
        createGallery(input: $input) {
            id
            name
            weddingId
            assets {
                items {
                    id
                    url
                }
            }
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_GALLERY = gql`
    mutation UpdateGalleryMutation($input: UpdateGalleryInput!, $id: String!) {
        updateGallery(input: $input, id: $id) {
            id
            name
            weddingId
            assets {
                items {
                    id
                    url
                }
            }
            createdAt
            updatedAt
        }
    }
`;

export const useGalleryForm = () => {
    const { currentUser } = useAuth();

    const [createGallery, createGalleryMutationData] = useMutation<
        CreateGalleryMutation,
        CreateGalleryMutationVariables
    >(CREATE_GALLERY, {
        refetchQueries: [
            {
                query: GET_GALLERY_BY_WEDDING_ID,
                variables: {
                    weddingId: currentUser?.weddingId,
                },
            },
        ],
    });

    const [updateGallery, updateGalleryMutationData] = useMutation<
        UpdateGalleryMutation,
        UpdateGalleryMutationVariables
    >(UPDATE_GALLERY, {
        refetchQueries: [
            {
                query: GET_GALLERY_BY_WEDDING_ID,
                variables: {
                    weddingId: currentUser?.weddingId,
                },
            },
        ],
    });

    return {
        createGallery,
        createGalleryMutationData,
        updateGallery,
        updateGalleryMutationData,
        loading:
            createGalleryMutationData.loading ||
            updateGalleryMutationData.loading,
    };
};

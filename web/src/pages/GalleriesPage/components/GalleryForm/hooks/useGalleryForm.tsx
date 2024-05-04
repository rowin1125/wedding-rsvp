import {
    CreateGalleryMutation,
    CreateGalleryMutationVariables,
    UpdateGalleryMutation,
    UpdateGalleryMutationVariables,
} from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { FIND_GALLERY_QUERY } from 'src/components/Gallery/hooks/useFindGallery';
import { GET_GALLERIES_BY_WEDDING_ID } from 'src/pages/GalleriesPage/hooks/useGetGalleries';
import { DEFAULT_PAGINATION_OFFSET } from 'src/pages/GalleryPage/hooks/useGalleryPagination';

export const CREATE_GALLERY = gql`
    mutation CreateGalleryMutation($input: CreateGalleryInput!) {
        createGallery(input: $input) {
            id
            name
            weddingId
            assets(take: 1, skip: 0) {
                items {
                    id
                    url
                }
            }
            createdAt
            updatedAt
            qrCode
            qrCodeId
        }
    }
`;

export const UPDATE_GALLERY = gql`
    mutation UpdateGalleryMutation($input: UpdateGalleryInput!, $id: String!) {
        updateGallery(input: $input, id: $id) {
            id
            name
            weddingId
            assets(take: 1, skip: 0) {
                items {
                    id
                    url
                }
            }
            createdAt
            updatedAt
            qrCode
            qrCodeId
        }
    }
`;

export const useGalleryForm = () => {
    const { currentUser } = useAuth();
    const { galleryId } = useParams();

    const [createGallery, createGalleryMutationData] = useMutation<
        CreateGalleryMutation,
        CreateGalleryMutationVariables
    >(CREATE_GALLERY, {
        refetchQueries: [
            {
                query: GET_GALLERIES_BY_WEDDING_ID,
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
                query: GET_GALLERIES_BY_WEDDING_ID,
                variables: {
                    weddingId: currentUser?.weddingId,
                },
            },
            {
                query: FIND_GALLERY_QUERY,
                variables: {
                    id: galleryId,
                    take: DEFAULT_PAGINATION_OFFSET,
                    skip: 0,
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

import { useToast } from '@chakra-ui/react';
import {
    DeleteAssetsMutation,
    DeleteAssetsMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { FIND_GALLERY_QUERY } from 'src/components/Gallery/hooks/useFindGallery';
import { DEFAULT_GALLERY_PAGINATION_OFFSET } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';
import { useQueryControls } from 'src/pages/GalleryPage/hooks/useQueryControls';

import {
    DEFAULT_MEDIA_PAGINATION_OFFSET,
    GET_MEDIA_ASSETS,
} from './useGetMediaAssets';

export const DELETE_ASSETS_MUTATION = gql`
    mutation DeleteAssetsMutation($ids: [String!]!) {
        deleteAssets(ids: $ids) {
            id
        }
    }
`;

type UseDeleteAssetsType = {
    id: string;
    type: 'media' | 'gallery';
};

export const useDeleteAssets = ({ id, type }: UseDeleteAssetsType) => {
    const { offset, currentSorting, finalSearchQuery } = useQueryControls();
    const toast = useToast();
    const isGallery = type === 'gallery';

    const [deleteAssets, mutationData] = useMutation<
        DeleteAssetsMutation,
        DeleteAssetsMutationVariables
    >(DELETE_ASSETS_MUTATION, {
        onCompleted: (data) => {
            toast({
                title: `Succesvol ${data.deleteAssets.length} bestanden verwijderd`,
                status: 'success',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error deleting assets',
                description: error.message,
                status: 'error',
            });
        },
        refetchQueries: [
            isGallery
                ? {
                      query: FIND_GALLERY_QUERY,
                      variables: {
                          id,
                          take: DEFAULT_GALLERY_PAGINATION_OFFSET,
                          skip: offset,
                      },
                  }
                : {
                      query: GET_MEDIA_ASSETS,
                      variables: {
                          id,
                          take: DEFAULT_MEDIA_PAGINATION_OFFSET,
                          skip: offset,
                          sortField: currentSorting?.sortField,
                          sortOrder: currentSorting?.sortOrder,
                          query: finalSearchQuery,
                      },
                  },
        ],
    });

    return {
        deleteAssets,
        ...mutationData,
    };
};

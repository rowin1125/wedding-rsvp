import { useToast } from '@chakra-ui/react';
import {
    DeleteAssetsMutation,
    DeleteAssetsMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

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
};

export const useDeleteAssets = ({ id }: UseDeleteAssetsType) => {
    const { offset, currentSorting, finalSearchQuery } = useQueryControls();
    const toast = useToast();
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
            {
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

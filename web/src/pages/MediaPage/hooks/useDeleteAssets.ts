import {
    DeleteAssetsMutation,
    DeleteAssetsMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

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
    const [deleteAssets, mutationData] = useMutation<
        DeleteAssetsMutation,
        DeleteAssetsMutationVariables
    >(DELETE_ASSETS_MUTATION, {
        onCompleted: (data) =>
            toast.success(
                `Succesvol ${data.deleteAssets.length} bestanden verwijderd`
            ),
        onError: (error) =>
            toast.error('Error deleting assets ' + error.message),
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

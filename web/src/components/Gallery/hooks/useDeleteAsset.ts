import {
    DeleteAssetMutation,
    DeleteAssetMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import {
    DEFAULT_PAGINATION_OFFSET,
    useGalleryPagination,
} from 'src/pages/GalleryPage/hooks/useGalleryPagination';

import { FIND_GALLERY_QUERY } from './useFindGallery';

export const DELETE_ASSET_MUTATION = gql`
    mutation DeleteAssetMutation($id: String!) {
        deleteAsset(id: $id) {
            id
        }
    }
`;
type UseDeleteAssetType = {
    id: string;
};

export const useDeleteAsset = ({ id }: UseDeleteAssetType) => {
    const { offset } = useGalleryPagination();

    const [deleteAsset, mutationData] = useMutation<
        DeleteAssetMutation,
        DeleteAssetMutationVariables
    >(DELETE_ASSET_MUTATION, {
        onCompleted: () => {
            toast.success('Asset deleted');
        },
        onError: (error) => {
            toast.error('Error deleting asset: ' + error.message);
        },
        refetchQueries: [
            {
                query: FIND_GALLERY_QUERY,
                variables: {
                    id: id,
                    take: DEFAULT_PAGINATION_OFFSET,
                    skip: offset,
                },
            },
        ],
    });

    return {
        deleteAsset,
        ...mutationData,
    };
};

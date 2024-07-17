import { useToast } from '@chakra-ui/react';
import {
    DeleteAssetMutation,
    DeleteAssetMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { DEFAULT_GALLERY_PAGINATION_OFFSET } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';
import { useQueryControls } from 'src/pages/GalleryPage/hooks/useQueryControls';

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
    const { offset } = useQueryControls();
    const toast = useToast();

    const [deleteAsset, mutationData] = useMutation<
        DeleteAssetMutation,
        DeleteAssetMutationVariables
    >(DELETE_ASSET_MUTATION, {
        onCompleted: () => {
            toast({
                title: 'Asset deleted',
                status: 'success',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error deleting asset',
                description: error.message,
                status: 'error',
            });
        },
        refetchQueries: [
            {
                query: FIND_GALLERY_QUERY,
                variables: {
                    id: id,
                    take: DEFAULT_GALLERY_PAGINATION_OFFSET,
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

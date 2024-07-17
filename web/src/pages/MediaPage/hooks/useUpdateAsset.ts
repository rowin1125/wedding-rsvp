import {
    UpdateAssetMutation,
    UpdateAssetMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import {
    DEFAULT_MEDIA_PAGINATION_OFFSET,
    GET_MEDIA_ASSETS,
} from './useGetMediaAssets';

export const UPDATE_ASSET = gql`
    mutation UpdateAssetMutation($id: String!, $input: UpdateAssetInput!) {
        updateAsset(id: $id, input: $input) {
            id
            mediaLibraryId
        }
    }
`;

export const useUpdateAsset = () => {
    const [updateAsset, mutationMeta] = useMutation<
        UpdateAssetMutation,
        UpdateAssetMutationVariables
    >(UPDATE_ASSET, {
        refetchQueries: (data) => [
            {
                query: GET_MEDIA_ASSETS,
                variables: {
                    id: data.data?.updateAsset.mediaLibraryId,
                    take: DEFAULT_MEDIA_PAGINATION_OFFSET,
                    offset: 0,
                },
            },
        ],
    });

    return {
        updateAsset,
        ...mutationMeta,
    };
};

import {
    UpdateWeddingMutation,
    UpdateWeddingMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { GET_WEDDING_BY_ID } from 'src/hooks/useGetWeddingById';

export const UPDATE_WEDDING = gql`
    mutation UpdateWeddingMutation($input: UpdateWeddingInput!, $id: String!) {
        updateWedding(input: $input, id: $id) {
            id
            name
        }
    }
`;

export const useUpdateWedding = () => {
    const [updateWedding, mutationMeta] = useMutation<
        UpdateWeddingMutation,
        UpdateWeddingMutationVariables
    >(UPDATE_WEDDING, {
        refetchQueries: (data) => [
            {
                query: GET_WEDDING_BY_ID,
                variables: {
                    id: data.data?.updateWedding.id,
                },
            },
        ],
    });

    return {
        updateWedding,
        ...mutationMeta,
    };
};

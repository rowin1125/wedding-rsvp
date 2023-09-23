import {
    CreateWeddingMutation,
    CreateWeddingMutationVariables,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { GET_WEDDING_BY_ID } from 'src/hooks/useGetWeddingById';

export const CREATE_WEDDING = gql`
    mutation CreateWeddingMutation($input: CreateWeddingInput!) {
        createWedding(input: $input) {
            id
            name
        }
    }
`;

export const useCreateWedding = () => {
    const { reauthenticate } = useAuth();

    const [createWedding, mutationMeta] = useMutation<
        CreateWeddingMutation,
        CreateWeddingMutationVariables
    >(CREATE_WEDDING, {
        refetchQueries: (data) => [
            {
                query: GET_WEDDING_BY_ID,
                variables: {
                    id: data.data?.createWedding.id,
                },
            },
        ],
        onCompleted: async () => {
            await reauthenticate();
            toast.success('Bruiloft aangemaakt!');
            navigate(routes.dashboard());
        },
    });

    return {
        createWedding,
        ...mutationMeta,
    };
};

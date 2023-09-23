import {
    DeleteWeddingByIdMutation,
    DeleteWeddingByIdMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { GET_WEDDING_BY_ID } from 'src/hooks/useGetWeddingById';

export const DELETE_WEDDING_BY_ID = gql`
    mutation DeleteWeddingByIdMutation($id: String!) {
        deleteWedding(id: $id) {
            id
        }
    }
`;

export const useDeleteWeddingById = () => {
    const { reauthenticate } = useAuth();

    const [deleteWeddingById, mutationData] = useMutation<
        DeleteWeddingByIdMutation,
        DeleteWeddingByIdMutationVariables
    >(DELETE_WEDDING_BY_ID, {
        refetchQueries: (data) => [
            {
                query: GET_WEDDING_BY_ID,
                variables: {
                    id: data.data?.deleteWedding.id,
                },
            },
        ],
        onCompleted: () => {
            reauthenticate();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteWeddingById = async (id: string) => {
        const deleteWeddingId = await deleteWeddingById({
            variables: { id },
        });

        if (!deleteWeddingId.errors) {
            toast.success('Wedding deleted');
        }
    };

    return { deleteWeddingById: handleDeleteWeddingById, ...mutationData };
};

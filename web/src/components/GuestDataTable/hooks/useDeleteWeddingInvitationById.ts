import {
    DeleteWeddingInvitationByIdMutation,
    DeleteWeddingInvitationByIdMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { GET_WEDDING_INVITATION_BY_WEDDING_ID } from 'src/hooks/useGetWeddingInvitationsByWeddingId';

export const DELETE_WEDDING_INVITATION_BY_ID = gql`
    mutation DeleteWeddingInvitationByIdMutation($id: String!) {
        deleteWeddingInvitation(id: $id) {
            weddingId
        }
    }
`;

export const useDeleteWeddingInvitationById = () => {
    const [deleteWeddingInvitationById, mutationData] = useMutation<
        DeleteWeddingInvitationByIdMutation,
        DeleteWeddingInvitationByIdMutationVariables
    >(DELETE_WEDDING_INVITATION_BY_ID, {
        refetchQueries: (data) => [
            {
                query: GET_WEDDING_INVITATION_BY_WEDDING_ID,
                variables: {
                    weddingId: data.data?.deleteWeddingInvitation.weddingId,
                },
            },
        ],
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteWeddingInvitationById = async (id: string) => {
        const deleteWeddingInvitationId = await deleteWeddingInvitationById({
            variables: { id },
        });

        if (!deleteWeddingInvitationId.errors) {
            toast.success('Uitnodiging verwijderd');
        }
    };

    return {
        deleteWeddingInvitationById: handleDeleteWeddingInvitationById,
        ...mutationData,
    };
};

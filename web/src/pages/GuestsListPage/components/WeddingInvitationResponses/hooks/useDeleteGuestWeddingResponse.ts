import { useToast } from '@chakra-ui/react';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

import { GET_WEDDING_INVITATION_RESPONSES } from './useGetWeddingInvitationResponses';

export const DELETE_GUEST_WEDDING_RESPONSE = gql`
    mutation deleteGuestWeddingResponse($id: String!) {
        deleteGuestWeddingResponse(id: $id) {
            id
        }
    }
`;

export const useDeleteGuestWeddingResponse = () => {
    const toast = useToast();
    const { currentUser } = useAuth();
    const [deleteGuestWeddingResponse, deleteGuestWeddingResponseData] =
        useMutation(DELETE_GUEST_WEDDING_RESPONSE, {
            onCompleted: () => {
                toast({
                    title: 'Uitnodiging voor gasten verwijderd',
                    status: 'success',
                });
            },
            onError: (error) => {
                toast({
                    title: 'Er is iets fout gegaan tijdens het verwijderen',
                    status: 'error',
                    description: error.message,
                });
            },
            refetchQueries: [
                {
                    query: GET_WEDDING_INVITATION_RESPONSES,
                    variables: {
                        weddingId: currentUser?.weddingId ?? '',
                        input: {
                            filterAssignedUsers: true,
                        },
                    },
                },
            ],
        });

    const handleDeleteGuestWeddingResponse = async (id: string) => {
        await deleteGuestWeddingResponse({
            variables: { id },
        });
    };

    return {
        deleteGuestWeddingResponse: handleDeleteGuestWeddingResponse,
        deleteGuestWeddingResponseData,
    };
};

import { useToast } from '@chakra-ui/react';
import {
    ConnectGuestToRsvpMutation,
    ConnectGuestToRsvpMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

import { GET_WEDDING_INVITATION_RESPONSES } from './useGetWeddingInvitationResponses';

export const CONNECT_GUEST_TO_RSVP = gql`
    mutation ConnectGuestToRsvpMutation($input: ConnectGuestToRsvpInput!) {
        connectGuestToRsvp(input: $input) {
            id
        }
    }
`;

export const useConnectGuestToRsvp = () => {
    const toast = useToast();
    const { currentUser } = useAuth();
    const [connectGuestToRsvp, mutationMeta] = useMutation<
        ConnectGuestToRsvpMutation,
        ConnectGuestToRsvpMutationVariables
    >(CONNECT_GUEST_TO_RSVP, {
        onError: (error) => {
            toast({
                title: 'Er is iets fout gegaan',
                description: error.message,
                status: 'error',
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
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: currentUser?.weddingId ?? '',
                },
            },
        ],
    });

    return {
        connectGuestToRsvp,
        ...mutationMeta,
    };
};

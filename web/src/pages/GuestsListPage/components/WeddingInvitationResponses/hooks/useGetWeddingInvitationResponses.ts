import {
    GetWeddingInvitationResponses,
    GetWeddingInvitationResponsesVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { WeddingInvitationResponseBody } from 'src/lib/fragments/weddingInvitationResponseFragment';

export const GET_WEDDING_INVITATION_RESPONSES = gql`
    query GetWeddingInvitationResponses(
        $weddingId: String!
        $input: WeddingInvitationResponsesInput
    ) {
        weddingInvitationResponses(weddingId: $weddingId, input: $input) {
            ...WeddingInvitationResponseBody
        }
    }
    ${WeddingInvitationResponseBody.fragment}
`;

export const useGetWeddingInvitationResponses = () => {
    const { currentUser } = useAuth();

    const { data, ...query } = useQuery<
        GetWeddingInvitationResponses,
        GetWeddingInvitationResponsesVariables
    >(GET_WEDDING_INVITATION_RESPONSES, {
        variables: {
            weddingId: currentUser?.weddingId ?? '',
            input: {
                filterAssignedUsers: true,
            },
        },
        skip: !currentUser?.weddingId,
    });

    return {
        weddingInvitationResponses: data?.weddingInvitationResponses,
        ...query,
    };
};

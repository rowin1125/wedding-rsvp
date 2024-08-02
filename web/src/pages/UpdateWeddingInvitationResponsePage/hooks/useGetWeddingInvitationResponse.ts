import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import { WeddingInvitationResponseBody } from 'src/lib/fragments/weddingInvitationResponseFragment';

export const GET_WEDDING_INVITATION_RESPONSE = gql`
    query GetWeddingInvitationResponse($id: String!) {
        weddingInvitationResponse(id: $id) {
            ...WeddingInvitationResponseBody
        }
    }
    ${WeddingInvitationResponseBody.fragment}
`;

export const useGetWeddingInvitationResponse = () => {
    const { weddingInvitationResponseId } = useParams();

    const { data, ...query } = useQuery(GET_WEDDING_INVITATION_RESPONSE, {
        variables: {
            id: weddingInvitationResponseId,
        },
        skip: !weddingInvitationResponseId,
    });

    return {
        weddingInvitationResponse: data?.weddingInvitationResponse,
        ...query,
    };
};

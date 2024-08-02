import { GetGuests, GetGuestsVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { AddressBody } from 'src/lib/fragments/addressFragment';
import { GuestBody } from 'src/lib/fragments/guestFragment';

export const GET_GUESTS = gql`
    query GetGuests($weddingId: String!, $input: GuestSearchInput) {
        guests(weddingId: $weddingId, input: $input) {
            address {
                ...AddressBody
            }
            ...GuestBody
        }
    }
    ${GuestBody.fragment}
    ${AddressBody.fragment}
`;

type UseGetGuestsType = {
    skip: boolean;
};

export const useGetGuests = ({ skip }: UseGetGuestsType) => {
    const { currentUser } = useAuth();
    const { data, ...query } = useQuery<GetGuests, GetGuestsVariables>(
        GET_GUESTS,
        {
            variables: {
                weddingId: currentUser?.weddingId ?? '',
                input: { connectedViaRsvp: false, guestOrigin: 'GUEST_LIST' },
            },
            skip: !currentUser || skip,
        }
    );

    return {
        guests: data?.guests,
        ...query,
    };
};

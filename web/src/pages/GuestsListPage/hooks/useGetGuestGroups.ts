import { useToast } from '@chakra-ui/react';
import {
    GetGuestGroupsQuery,
    GetGuestGroupsQueryVariables,
} from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

export const GET_GUEST_GROUPS = gql`
    query GetGuestGroupsQuery($weddingId: String!) {
        guestGroups(weddingId: $weddingId) {
            guests {
                id
                firstName
                lastName
                email
                phoneNumber
                weddingId
                dietary
                isChild
                notes
                connectedViaRsvp
                guestGroupId
                guestWeddingResponse {
                    weddingInvitationResponseId
                }
            }
            name
            weddingId
            address {
                id
                city
                country
                houseNumber
                livesAbroad
                street
                zipCode
                addressDataMissing
            }
            guestGroupRelationType
            guestGroupType
            id
        }
    }
`;

export const useGetGuestGroups = () => {
    const { currentUser } = useAuth();
    const toast = useToast();

    const { data, ...query } = useQuery<
        GetGuestGroupsQuery,
        GetGuestGroupsQueryVariables
    >(GET_GUEST_GROUPS, {
        variables: {
            weddingId: currentUser?.weddingId as string,
        },
        skip: !currentUser?.weddingId,
        onError: (error) => {
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Error getting guest groups:', error);
        },
    });

    return {
        guestGroups: data?.guestGroups,
        ...query,
    };
};

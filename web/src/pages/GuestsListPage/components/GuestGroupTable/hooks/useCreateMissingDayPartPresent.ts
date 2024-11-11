import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import {
    CreateMissingDayPartPresent,
    CreateMissingDayPartPresentVariables,
} from 'types/graphql';

import { useAuth } from 'src/auth';
import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

import { GET_GUEST_BY_ID } from '../components/GuestUpdateForm/hooks/useGetGuest';

export const CREATE_MISSING_DAY_PART_PRESENT = gql`
    mutation CreateMissingDayPartPresent(
        $input: CreateGuestDayPartPresentInput!
    ) {
        createGuestDayPartPresent(input: $input) {
            id
            guestId
        }
    }
`;

export const useCreateMissingDayPartPresent = () => {
    const toast = useToast();
    const { currentUser } = useAuth();

    const [createMissingDayPartPresent, mutationMeta] = useMutation<
        CreateMissingDayPartPresent,
        CreateMissingDayPartPresentVariables
    >(CREATE_MISSING_DAY_PART_PRESENT, {
        refetchQueries: (data) => [
            {
                query: GET_GUEST_BY_ID,
                variables: {
                    id: data.data?.createGuestDayPartPresent.guestId,
                },
            },
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: currentUser?.weddingId,
                },
            },
        ],
        onError: (error) => {
            toast({
                title: 'Error creating missing day part present',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
        onCompleted: () => {
            toast({
                title: 'Aanwezigheid toegevoegd',
                description: 'De aanwezigheid van de gast is toegevoegd',
                status: 'success',
                duration: 2000,
            });
        },
    });

    const handleCreateDayPartPresent = (
        input: CreateMissingDayPartPresentVariables['input']
    ) => {
        console.log('input', input);
        createMissingDayPartPresent({
            variables: { input },
        });
    };

    return {
        createMissingDayPartPresent: handleCreateDayPartPresent,
        ...mutationMeta,
    };
};

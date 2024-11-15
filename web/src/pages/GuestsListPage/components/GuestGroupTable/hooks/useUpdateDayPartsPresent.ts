import { useToast } from '@chakra-ui/react';
import {
    GuestWeddingResponseStatus,
    UpdateDayPartsPresent,
    UpdateDayPartsPresentVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

import { GET_GUEST_BY_ID } from '../components/GuestUpdateForm/hooks/useGetGuest';

export const UPDATE_DAY_PARTS_PRESENT = gql`
    mutation UpdateDayPartsPresent(
        $id: String!
        $input: UpdateGuestDayPartPresentInput!
    ) {
        updateGuestDayPartPresent(input: $input, id: $id) {
            id
            guestId
        }
    }
`;

export const useUpdateDayPartsPresent = () => {
    const toast = useToast();
    const { currentUser } = useAuth();

    const [updateDayPartsPresent, mutationMeta] = useMutation<
        UpdateDayPartsPresent,
        UpdateDayPartsPresentVariables
    >(UPDATE_DAY_PARTS_PRESENT, {
        refetchQueries: (data) => [
            {
                query: GET_GUEST_BY_ID,
                variables: {
                    id: data.data?.updateGuestDayPartPresent.guestId,
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
                title: 'Error updating day parts present',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
        onCompleted: () => {
            toast({
                title: 'Aanwezigheid aangepast',
                description: 'De aanwezigheid van de gast is geüpdatet',
                status: 'success',
                duration: 2000,
            });
        },
    });

    const handleUpdateDayPartPresent = async ({
        dayPartPresentId,
        status,
        guestId,
    }: {
        dayPartPresentId: string;
        status: GuestWeddingResponseStatus;
        guestId?: string;
    }) => {
        if (!guestId) {
            toast({
                title: 'Error updating day parts present',
                description: 'Guest id not found',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        await updateDayPartsPresent({
            variables: {
                id: dayPartPresentId,
                input: {
                    guestWeddingResponseStatus: status,
                    guestId,
                },
            },
        });
    };

    return {
        updateDayPartsPresent: handleUpdateDayPartPresent,
        ...mutationMeta,
    };
};

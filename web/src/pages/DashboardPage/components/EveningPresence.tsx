import React from 'react';

import { GridItem, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { GetWeddingQuery } from 'types/graphql';

import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

ChartJS.register(ArcElement, Tooltip, Legend);

type GuestType = NonNullable<
    NonNullable<GetWeddingQuery['wedding']>['weddingInvitation'][0]
>['weddingGuests'];

const EveningPresence = () => {
    const { wedding } = useGetWeddingById();
    const eveningInvitations = wedding?.weddingInvitation.filter(
        (invitation) => invitation?.invitationType === 'EVENING'
    );

    const eveningPresenceInvitations = eveningInvitations?.filter(
        (invitation) => invitation?.presence === true
    );
    const eveningNotPresenceInvitation = eveningInvitations?.filter(
        (invitation) => invitation?.presence === false
    );

    const eveningGuestsPresent = eveningPresenceInvitations?.reduce<GuestType>(
        (acc, invitation) => {
            if (!invitation?.weddingGuests) return acc;

            return [...acc, ...invitation.weddingGuests];
        },
        []
    );

    const eveningGuestsNotPresent =
        eveningNotPresenceInvitation?.reduce<GuestType>((acc, invitation) => {
            if (!invitation?.weddingGuests) return acc;

            return [...acc, ...invitation.weddingGuests];
        }, []);

    const eveningGuestsPresentCount = eveningGuestsPresent?.length || 0;
    const eveningGuestsNotPresentCount = eveningGuestsNotPresent?.length || 0;
    const eveningInvitationAmount = wedding?.eveningInvitationAmount || 0;

    const eveningGuestsNotResponded =
        eveningInvitationAmount -
        eveningGuestsPresentCount -
        eveningGuestsNotPresentCount;

    const data = {
        labels: [
            `Aanwezig (${eveningGuestsPresentCount})`,
            `Niet aanwezig (${eveningGuestsNotPresentCount})`,
            `Nog niet gereageerd  (${eveningGuestsNotResponded})`,
        ],
        datasets: [
            {
                label: 'Aantallen',
                data: [
                    eveningGuestsPresentCount,
                    eveningGuestsNotPresentCount,
                    eveningGuestsNotResponded,
                ],
                backgroundColor: [
                    'rgba(54, 235, 63, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(222, 214, 134, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 235, 63, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(222, 214, 134, 0.4)',
                ],
            },
        ],
    };

    return (
        <GridItem
            colSpan={{ base: 2, lg: 1 }}
            maxH="400px"
            placeItems="center"
            mx="auto"
        >
            <Heading
                textAlign="center"
                as="h2"
                size="h2"
                mb={2}
                fontWeight="bold"
            >
                Aanwezigheid avond
            </Heading>
            <Pie data={data} />
        </GridItem>
    );
};

export default EveningPresence;

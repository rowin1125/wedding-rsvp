import React from 'react';

import { GridItem, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { GetWeddingQuery } from 'types/graphql';

import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

ChartJS.register(ArcElement, Tooltip, Legend);

type GuestType = NonNullable<
    NonNullable<GetWeddingQuery['wedding']>['weddingInvitation'][0]
>['weddingGuests'];

const OverallPresence = () => {
    const { wedding } = useGetWeddingById();

    const overallPresenceInvitations = wedding?.weddingInvitation?.filter(
        (invitation) => invitation?.presence === true
    );
    const overallNotPresenceInvitation = wedding?.weddingInvitation?.filter(
        (invitation) => invitation?.presence === false
    );

    const overallGuestsPresent = overallPresenceInvitations?.reduce<GuestType>(
        (acc, invitation) => {
            if (!invitation?.weddingGuests) return acc;

            return [...acc, ...invitation.weddingGuests];
        },
        []
    );

    const overallGuestsNotPresent =
        overallNotPresenceInvitation?.reduce<GuestType>((acc, invitation) => {
            if (!invitation?.weddingGuests) return acc;

            return [...acc, ...invitation.weddingGuests];
        }, []);

    const overallGuestsPresentCount = overallGuestsPresent?.length || 0;
    const overallGuestsNotPresentCount = overallGuestsNotPresent?.length || 0;
    const overallInvitationAmount =
        (wedding?.eveningInvitationAmount || 0) +
        (wedding?.dayInvitationAmount || 0);

    const overallGuestsNotResponded =
        overallInvitationAmount -
        overallGuestsPresentCount -
        overallGuestsNotPresentCount;

    const data = {
        labels: [
            `Aanwezig (${overallGuestsPresentCount})`,
            `Niet aanwezig (${overallGuestsNotPresentCount})`,
            `Nog niet gereageerd  (${overallGuestsNotResponded})`,
        ],
        datasets: [
            {
                label: 'Aantallen',
                data: [
                    overallGuestsPresentCount,
                    overallGuestsNotPresentCount,
                    overallGuestsNotResponded,
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
                Totaal aantal gasten
            </Heading>
            <Chart
                type="pie"
                data={{
                    ...data,
                }}
            />
        </GridItem>
    );
};

export default OverallPresence;

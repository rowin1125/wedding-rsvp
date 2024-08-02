import React from 'react';

import { GridItem, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const EveningPresence = () => {
    const eveningGuestsPresentCount = 10;
    const eveningGuestsNotPresentCount = 10;
    const eveningInvitationAmount = 20;

    let eveningGuestsNotResponded =
        eveningInvitationAmount -
        eveningGuestsPresentCount -
        eveningGuestsNotPresentCount;

    if (eveningGuestsNotResponded < 0) {
        eveningGuestsNotResponded = 0;
    }

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

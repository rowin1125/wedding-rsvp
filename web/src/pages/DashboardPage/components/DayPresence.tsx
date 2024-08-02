import React from 'react';

import { GridItem, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DayPresence = () => {
    const dayGuestsPresentCount = 10;
    const dayGuestsNotPresentCount = 10;
    const dayInvitationAmount = 20;

    let dayGuestsNotResponded =
        dayInvitationAmount - dayGuestsPresentCount - dayGuestsNotPresentCount;

    if (dayGuestsNotResponded < 0) {
        dayGuestsNotResponded = 0;
    }

    const data = {
        labels: [
            `Aanwezig (${dayGuestsPresentCount})`,
            `Niet aanwezig (${dayGuestsNotPresentCount})`,
            `Nog niet gereageerd  (${dayGuestsNotResponded})`,
        ],
        datasets: [
            {
                label: 'Aantallen',
                data: [
                    dayGuestsPresentCount,
                    dayGuestsNotPresentCount,
                    dayGuestsNotResponded,
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
                Aanwezigheid overdag
            </Heading>
            <Pie data={data} />
        </GridItem>
    );
};

export default DayPresence;

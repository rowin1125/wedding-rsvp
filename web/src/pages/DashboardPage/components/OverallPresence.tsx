import React from 'react';

import { GridItem, Heading } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverallPresence = () => {
    const overallGuestsPresentCount = 20;
    const overallGuestsNotPresentCount = 20;
    const overallInvitationAmount = 40;

    let overallGuestsNotResponded =
        overallInvitationAmount -
        overallGuestsPresentCount -
        overallGuestsNotPresentCount;

    if (overallGuestsNotResponded < 0) {
        overallGuestsNotResponded = 0;
    }

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
            <Pie
                data={{
                    ...data,
                }}
            />
        </GridItem>
    );
};

export default OverallPresence;

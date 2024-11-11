import React from 'react';

import { GridItem, Heading } from '@chakra-ui/react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type OverallPresenceProps = {
    data: ChartData<'pie'>;
};

const OverallPresence = ({ data }: OverallPresenceProps) => {
    if (!data) return null;

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
            <Pie data={{ ...data }} />
        </GridItem>
    );
};

export default OverallPresence;

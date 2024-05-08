import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';

import { Metadata } from '@redwoodjs/web';

import Countdown from 'src/components/Countdown/Countdown';
import DataDisplay from 'src/components/DataDisplay/DataDisplay';
import Hero from 'src/components/Hero';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import DayPresence from './components/DayPresence';
import EveningPresence from './components/EveningPresence';
import OverallPresence from './components/OverallPresence';

const DashboardPage = () => {
    const { wedding } = useGetWeddingById();

    const amountOfVanDerValkGuest = wedding?.weddingInvitation.reduce(
        (acc, cur) => {
            if (!cur?.useCouponCode) return acc;

            const amountOfGuests = cur.weddingGuests?.length || 0;
            return acc + amountOfGuests;
        },
        0
    );

    return (
        <>
            <Metadata title="Dashboard" description="Dashboard page" />
            <Hero />
            <AppContentWrapper>
                <Heading fontWeight="bold" as="h2" size="h2">
                    Overzicht van de bruiloft van {wedding?.name}
                </Heading>

                <Grid my={6} templateColumns="repeat(2, 1fr)" rowGap={10}>
                    <GridItem colSpan={{ base: 2 }}>
                        <Countdown
                            hideDate
                            targetDate={
                                wedding?.date || '2024-05-16T00:00:00+02:00'
                            }
                            my={0}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2 }}>
                        <Box as="hr" />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <Heading
                            as="h2"
                            size="h2"
                            mb={8}
                            fontWeight="bold"
                            textAlign="center"
                        >
                            Algemene gegevens
                        </Heading>

                        <DataDisplay
                            entry={{
                                trouwdatum: wedding?.date
                                    ? new Date(
                                          wedding?.date
                                      ).toLocaleDateString(navigator.language)
                                    : '',
                                '+/- overdag':
                                    wedding?.dayInvitationAmount || 0,
                                '+/- avond':
                                    wedding?.eveningInvitationAmount || 0,
                                '+/- totaaal':
                                    (wedding?.dayInvitationAmount || 0) +
                                    (wedding?.eveningInvitationAmount || 0),
                                'Van der Valk aantal':
                                    amountOfVanDerValkGuest ?? 0,
                            }}
                        />
                    </GridItem>
                    <OverallPresence />
                    <DayPresence />
                    <EveningPresence />
                </Grid>
            </AppContentWrapper>
        </>
    );
};

export default DashboardPage;

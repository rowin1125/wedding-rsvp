import { Box, Container, Grid, GridItem, Heading } from '@chakra-ui/react';

import { Metadata } from '@redwoodjs/web';

import Countdown from 'src/components/Countdown/Countdown';
import DataDisplay from 'src/components/DataDisplay/DataDisplay';
import Hero from 'src/components/Hero';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import OverallPresence from './components/OverallPresence';

const DashboardPage = () => {
    const { wedding } = useGetWeddingById();

    const weddingDayPartsData = wedding?.dayParts?.reduce((acc, dayPart) => {
        acc[dayPart.name as keyof typeof acc] = dayPart.totalGuests;

        return acc;
    }, {} as Record<string, number>);

    return (
        <>
            <Metadata title="Dashboard" description="Dashboard page" />
            <Hero
                url={wedding?.bannerImage?.asset.url}
                previewUrl={wedding?.bannerImage?.asset.previewUrl}
                imageProps={{
                    objectPosition: wedding?.bannerImage?.metadata
                        ? `${wedding?.bannerImage?.metadata?.focalPoint?.x}% ${wedding?.bannerImage?.metadata?.focalPoint?.y}%`
                        : 'center',
                }}
                fileType={wedding?.bannerImage?.asset.fileType || 'image'}
                color="white"
            />
            <Container>
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
                                          ).toLocaleDateString(
                                              navigator.language
                                          )
                                        : '',
                                    ...weddingDayPartsData,
                                }}
                            />
                        </GridItem>
                        <OverallPresence
                            data={{
                                labels: wedding?.dayParts?.map(
                                    (dayPart) =>
                                        `${dayPart.name} (${dayPart.totalGuests})`
                                ),
                                datasets: [
                                    {
                                        label: 'Aantallen',
                                        data:
                                            wedding?.dayParts?.map(
                                                (dayPart) => dayPart.totalGuests
                                            ) ?? [],
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
                            }}
                        />
                    </Grid>
                </AppContentWrapper>
            </Container>
        </>
    );
};

export default DashboardPage;

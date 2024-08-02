import { Box, Container, Grid, GridItem, Heading } from '@chakra-ui/react';

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
                                    '+/- overdag': 50,
                                    '+/- avond': 50,
                                    '+/- totaaal': 100,
                                }}
                            />
                        </GridItem>
                        <OverallPresence />
                        <DayPresence />
                        <EveningPresence />
                    </Grid>
                </AppContentWrapper>
            </Container>
        </>
    );
};

export default DashboardPage;

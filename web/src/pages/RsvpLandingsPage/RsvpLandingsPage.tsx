import { Button, Container, Flex, Grid, useDisclosure } from '@chakra-ui/react';

import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';
import Loader from 'src/components/Loader';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import CreateNewRsvpLandingPage from './components/CreateNewRsvpLandingPage';
import RsvpLandingPageItem from './components/RsvpLandingPageItem';
import { useGetWeddingRsvpLandingPages } from './hooks/useGetWeddingRsvpLandingPages';

const RsvpLandingsPage = () => {
    const { wedding } = useGetWeddingById();
    const disclosure = useDisclosure();
    const { weddingRsvpLandingPages, loading } =
        useGetWeddingRsvpLandingPages();

    const hasWeddingRsvpLandingPages =
        weddingRsvpLandingPages && weddingRsvpLandingPages?.length > 0;

    return (
        <>
            <Metadata
                title="Rsvp landingspagina's"
                description="Rsvp landingspagina's voor de bruiloft"
            />

            <Hero
                url={wedding?.bannerImage?.asset.url}
                previewUrl={wedding?.bannerImage?.asset.previewUrl}
                color="white"
                fileType={wedding?.bannerImage?.asset.fileType || 'image'}
                imageProps={{
                    objectPosition: wedding?.bannerImage?.metadata
                        ? `${wedding?.bannerImage?.metadata?.focalPoint?.x}% ${wedding?.bannerImage?.metadata?.focalPoint?.y}%`
                        : 'center',
                }}
                title="RSVP landingspagina's"
                subtitle="Bekijk hier de RSVP landingspagina’s van jullie bruiloft"
            />

            <Container>
                <AppContentWrapper>
                    <Flex w="full" justifyContent="space-between" mb={4}>
                        <Button
                            size={{ base: 'sm', lg: 'md' }}
                            as={Link}
                            to={routes.dashboard()}
                            variant="outline"
                        >
                            {'< Dashboard'}
                        </Button>
                        <Button
                            size={{ base: 'sm', lg: 'md' }}
                            onClick={disclosure.onOpen}
                        >
                            Nieuwe rsvp landingspagina
                        </Button>
                    </Flex>
                    {loading && !hasWeddingRsvpLandingPages && <Loader />}
                    <CreateNewRsvpLandingPage
                        disclosure={disclosure}
                        loading={loading}
                        hasWeddingRsvpLandingPages={hasWeddingRsvpLandingPages}
                    />
                    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={6} mt={10}>
                        {weddingRsvpLandingPages?.map((rsvpLandingPage) => (
                            <RsvpLandingPageItem
                                key={rsvpLandingPage.id}
                                rsvpLandingPage={rsvpLandingPage}
                                image="https://cdn.sanity.io/images/6ivsf3qj/production/ec96cbeac32d1de4b686c553898671a6d8ffe7fb-1163x1003.png"
                            />
                        ))}
                    </Grid>
                </AppContentWrapper>
            </Container>
        </>
    );
};

export default RsvpLandingsPage;

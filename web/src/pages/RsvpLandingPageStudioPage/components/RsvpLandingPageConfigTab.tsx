import React from 'react';

import {
    TabPanel,
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    Heading,
    Icon,
    Text,
} from '@chakra-ui/react';
import { BiWorld } from 'react-icons/bi';
import { GetWeddingRsvpLandingPage } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import RsvpLandingPageForm from 'src/pages/RsvpLandingsPage/components/RsvpLandingPageForm';

import { useDeleteRsvpLandingPage } from '../hooks/useDeleteRsvpLandingPage';

type RsvpLandingPageConfigTabProps = {
    weddingRsvpLandingPage: GetWeddingRsvpLandingPage['weddingRsvpLandingPage'];
    loading: boolean;
};

const RsvpLandingPageConfigTab = ({
    weddingRsvpLandingPage,
    loading: rsvpLandingPageLoading,
}: RsvpLandingPageConfigTabProps) => {
    const { deleteRsvpLandingPage, loading: deleteLoading } =
        useDeleteRsvpLandingPage();

    const loading = rsvpLandingPageLoading || deleteLoading;

    return (
        <TabPanel p={0}>
            <Container>
                <Box maxW="xl">
                    <Flex justifyContent="space-between" my={4}>
                        <ButtonGroup>
                            <Button
                                size={{ base: 'sm', lg: 'md' }}
                                as={Link}
                                to={routes.rsvpLandings()}
                                variant="outline"
                            >
                                {`Terug overzicht`}
                            </Button>
                            {weddingRsvpLandingPage?.isActive &&
                                weddingRsvpLandingPage.pageBuilderData && (
                                    <Button
                                        size={{
                                            base: 'sm',
                                            lg: 'md',
                                        }}
                                        onClick={() =>
                                            window.open(
                                                routes.weddingRsvpLandingPage({
                                                    landingPageId:
                                                        weddingRsvpLandingPage.id,
                                                    weddingId:
                                                        weddingRsvpLandingPage.weddingId,
                                                })
                                            )
                                        }
                                    >
                                        Bekijk landingspagina
                                        <Icon as={BiWorld} ml={2} />
                                    </Button>
                                )}
                        </ButtonGroup>
                    </Flex>
                    {weddingRsvpLandingPage && (
                        <RsvpLandingPageForm
                            type="update"
                            weddingRsvpLandingPage={weddingRsvpLandingPage}
                        />
                    )}
                    <Box mt={10}>
                        <Box
                            borderColor="red.500"
                            borderWidth="2px"
                            borderRadius="lg"
                            p={4}
                        >
                            <Heading as="h3" size="md" color="red.500">
                                Danger-zone
                            </Heading>
                            <Text mt={4}>
                                Hier kun je jouw Rsvp Landingspagina
                                verwijderen. Alle bijbehorende data wordt ook
                                verwijderd en kan niet meer teruggehaald worden.
                            </Text>
                            {weddingRsvpLandingPage && (
                                <DeleteDialog
                                    onDelete={deleteRsvpLandingPage}
                                    title="Verwijder pagina"
                                    buttonLabel="Verwijder landingspagina"
                                    buttonProps={{ ml: 0, mt: 4 }}
                                    id={weddingRsvpLandingPage.id}
                                    loading={loading}
                                >
                                    <Text>
                                        Weet je zeker dat je de Rsvp
                                        Landingspagina wilt verwijderen?
                                    </Text>
                                </DeleteDialog>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </TabPanel>
    );
};

export default RsvpLandingPageConfigTab;

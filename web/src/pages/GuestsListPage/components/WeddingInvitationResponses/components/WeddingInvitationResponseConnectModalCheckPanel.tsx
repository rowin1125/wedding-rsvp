import React from 'react';

import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    Grid,
    Heading,
    Link as ChakraLink,
    Text,
    useDisclosure,
    Button,
    ButtonGroup,
    useToast,
} from '@chakra-ui/react';
import { GetGuests, GetWeddingInvitationResponses } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import { useConnectGuestToRsvp } from '../hooks/useConnectGuestToRsvp';

import GuestInitialDataCheckingRows from './GuestInitialDataCheckingRows';
import GuestRemainingCheckingRows from './GuestRemainingCheckingRows';

type WeddingInvitationResponseConnectModalCheckPanelProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    guestWeddingResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0]['guestWeddingResponses'][0];
    weddingInvitationResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0];
    guest?: GetGuests['guests'][0];
    setTabIndex: (index: number) => void;
};

const WeddingInvitationResponseConnectModalCheckPanel = ({
    weddingInvitationResponse,
    guestWeddingResponse,
    guest,
    disclosure,
    setTabIndex,
}: WeddingInvitationResponseConnectModalCheckPanelProps) => {
    const { connectGuestToRsvp, loading } = useConnectGuestToRsvp();
    const toast = useToast();

    const handleConnectGuestToRsvp = async () => {
        if (!guestWeddingResponse?.guest?.id || !guest?.id) {
            toast({
                title: 'Er is iets fout gegaan',
                description: 'Kon geen connectie maken tussen gast en RSVP',
            });
            return;
        }

        await connectGuestToRsvp({
            variables: {
                input: {
                    guestListGuestId: guest.id,
                    rsvpGuestId: guestWeddingResponse.guest.id,
                },
            },
        });

        toast({
            title: 'Connectie gemaakt',
            status: 'success',
        });
    };

    return (
        <Box>
            <Heading as="h3" size="h3" mb={4}>
                Controleer de data van {guestWeddingResponse?.guest?.firstName}{' '}
                {guestWeddingResponse?.guest?.lastName}{' '}
            </Heading>
            {guestWeddingResponse?.guest?.weddingId && (
                <Alert status="info" mb={4} variant="left-accent">
                    <AlertIcon />
                    <Text>
                        Controleer de data van de gast en de data van de RSVP.
                        Als deze niet overeenkomen kan je de data van de gast{' '}
                        <ChakraLink
                            as={Link}
                            textDecor={'underline'}
                            to={routes.updateWeddingInvitationResponse({
                                weddingId:
                                    guestWeddingResponse?.guest?.weddingId,
                                weddingInvitationResponseId:
                                    weddingInvitationResponse.id,
                            })}
                        >
                            hier
                        </ChakraLink>{' '}
                        aanpassen.
                    </Text>
                </Alert>
            )}
            <Grid templateColumns="repeat(11, 1fr)" gap={4} py={4}>
                <GuestInitialDataCheckingRows
                    guestWeddingResponse={guestWeddingResponse}
                    guest={guest}
                />
                <GuestRemainingCheckingRows
                    guestWeddingResponse={guestWeddingResponse}
                    guest={guest}
                    weddingInvitationResponse={weddingInvitationResponse}
                />
            </Grid>
            <Flex
                background="white"
                justifyContent="flex-end"
                position="sticky"
                bottom={{
                    base: 16,
                    lg: 0,
                }}
                py={4}
            >
                <ButtonGroup
                    flexDir={{
                        base: 'column',
                        lg: 'row',
                    }}
                    w="full"
                    columnGap={4}
                    rowGap={4}
                    justifyContent="flex-end"
                >
                    <Flex columnGap={{ lg: 4 }}>
                        <Button
                            size={{ base: 'xs', lg: 'md' }}
                            w={{ base: 'full', lg: 'auto' }}
                            variant="ghost"
                            onClick={disclosure.onClose}
                            isLoading={loading}
                            isDisabled={loading}
                        >
                            Annuleren
                        </Button>
                        <Button
                            size={{ base: 'xs', lg: 'md' }}
                            w={{ base: 'full', lg: 'auto' }}
                            isLoading={loading}
                            isDisabled={loading}
                            onClick={() => {
                                setTabIndex(0);
                            }}
                            variant="outline"
                        >
                            Vorige stap
                        </Button>
                    </Flex>

                    <Button
                        size={{ base: 'md', lg: 'md' }}
                        w={{ base: 'full', lg: 'auto' }}
                        isLoading={loading}
                        isDisabled={loading}
                        onClick={handleConnectGuestToRsvp}
                    >
                        Gegevens koppelen
                    </Button>
                </ButtonGroup>
            </Flex>
        </Box>
    );
};

export default WeddingInvitationResponseConnectModalCheckPanel;

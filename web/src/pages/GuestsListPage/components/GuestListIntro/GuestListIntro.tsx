import React from 'react';

import {
    GridItem,
    Box,
    Heading,
    Alert,
    Button,
    Text,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    Link as ChakraLink,
    ModalOverlay,
} from '@chakra-ui/react';
import { BsPersonPlus } from 'react-icons/bs';
import { GetWeddingQuery } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import CreateGuestGroupForm from './components/CreateGuestGroupForm';

type GuestListIntroProps = {
    wedding: GetWeddingQuery['wedding'];
    disclosure: ReturnType<typeof useDisclosure>;
};

const GuestListIntro = ({ wedding, disclosure }: GuestListIntroProps) => {
    return (
        <GridItem colSpan={{ base: 12, lg: 7 }}>
            <Box>
                <Heading>{wedding?.name} gastenlijst</Heading>
                <Alert mt={4} status="info" variant="left-accent">
                    <Text>
                        Beheer hier al jouw gasten voor jullie bruiloft. Hier
                        kun je gasten toevoegen, verwijderen en hun gegevens
                        inzien. Ook kun je hier de RSVP status van de gasten
                        inzien, bijwerken en dit koppelen aan jouw gastenlijst.
                        <br />
                        <br />
                        Klik{' '}
                        <ChakraLink
                            textDecoration="underline"
                            as={Link}
                            to={routes.rsvpLandings()}
                        >
                            hier
                        </ChakraLink>{' '}
                        om een landingspagina aan te maken om de gasten
                        bijvoorbeeld via een QR code zich te laten aanmelden.
                    </Text>
                </Alert>
                <Button
                    mt={4}
                    rightIcon={<BsPersonPlus />}
                    onClick={disclosure.onOpen}
                >
                    Gasten toevoegen
                </Button>
            </Box>
            <Modal
                isOpen={disclosure.isOpen}
                onClose={disclosure.onClose}
                size="3xl"
            >
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading mb={4}>Gast(en) toevoegen</Heading>
                        <CreateGuestGroupForm disclosure={disclosure} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </GridItem>
    );
};

export default GuestListIntro;

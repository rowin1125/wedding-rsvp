import React, { useMemo } from 'react';

import {
    TabPanel,
    Heading,
    Box,
    Button,
    Icon,
    ButtonGroup,
    useDisclosure,
    Alert,
    AlertIcon,
    Text,
} from '@chakra-ui/react';
import Fuse from 'fuse.js';
import { FaUser, FaLink } from 'react-icons/fa6';
import { GetGuests, GetWeddingInvitationResponses } from 'types/graphql';

import Loader from 'src/components/Loader';

type WeddingInvitationResponseConnectModalGuestPanelProps = {
    loading: boolean;
    guests?: GetGuests['guests'];
    guestWeddingResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0]['guestWeddingResponses'][0];
    selectedGuest?: GetGuests['guests'][0];
    handleToggleSelect: (guest: GetGuests['guests'][0]) => void;
    disclosure: ReturnType<typeof useDisclosure>;
    setTabIndex: (index: number) => void;
};

const WeddingInvitationResponseConnectModalGuestPanel = ({
    guests,
    handleToggleSelect,
    loading,
    selectedGuest,
    guestWeddingResponse,
    disclosure,
    setTabIndex,
}: WeddingInvitationResponseConnectModalGuestPanelProps) => {
    const suggestionResult = useMemo(() => {
        const fuse = new Fuse(guests ?? [], {
            keys: [
                'firstName',
                'lastName',
                {
                    name: 'fullName',
                    weight: 0.9,
                },
            ],
            threshold: 0.6,
            includeScore: true,
            isCaseSensitive: false,
        });
        if (!guestWeddingResponse) {
            return [];
        }

        const results = fuse.search(
            `${guestWeddingResponse?.guest?.firstName} ${guestWeddingResponse?.guest?.lastName}`
        );

        return results.map((result) => result.item);
    }, [guests, guestWeddingResponse]);

    return (
        <TabPanel>
            <Heading as="h3" size="h3" mb={4}>
                Welke gast van jullie gastenlijst hoort hierbij?
            </Heading>
            {loading && <Loader />}
            {suggestionResult.length > 0 && (
                <Box mb={8}>
                    <Heading as="h4" size="h4" mb={2}>
                        Onze suggestie(s)
                    </Heading>
                    {suggestionResult.map((guest) => {
                        const isSelected = guest.id === selectedGuest?.id;
                        return (
                            <Box
                                key={guest.id}
                                borderColor="secondary.500"
                                borderBottomWidth={1}
                                _first={{
                                    borderTopWidth: 1,
                                }}
                            >
                                <Button
                                    variant={isSelected ? 'solid' : 'ghost'}
                                    borderRadius={0}
                                    w="full"
                                    py={6}
                                    justifyContent="flex-start"
                                    onClick={() => handleToggleSelect(guest)}
                                    alignItems="center"
                                >
                                    <Box>
                                        <Icon
                                            as={FaUser}
                                            color={
                                                isSelected
                                                    ? 'white'
                                                    : 'secondary.500'
                                            }
                                            mr={4}
                                        />
                                        {guest.firstName} {guest.lastName}
                                    </Box>
                                    <Icon
                                        as={FaLink}
                                        color={
                                            isSelected
                                                ? 'white'
                                                : 'secondary.500'
                                        }
                                        ml="auto"
                                    />
                                </Button>
                            </Box>
                        );
                    })}
                </Box>
            )}
            <Heading as="h4" size="h4" mb={2}>
                Alle gasten
            </Heading>
            {guests?.length === 0 && (
                <Box>
                    <Alert variant="left-accent" status="info">
                        <AlertIcon />
                        <Box>
                            <Text mb={4}>
                                Er zijn geen gasten die je kunt selecteren. Dit
                                komt omdat je of geen gasten hebt toegevoegd aan
                                je gastenlijst of omdat je alle gasten al hebt
                                gekoppeld aan een RSVP.
                            </Text>
                            <Text>
                                Als je een gast wilt toevoegen die hierbij past
                                ga dan naar de gastenlijst, maak een gast aan en
                                koppel deze aan een RSVP.
                            </Text>
                        </Box>
                    </Alert>
                </Box>
            )}
            {guests?.map((guest) => {
                const isSelected = guest.id === selectedGuest?.id;
                if (
                    suggestionResult.find(
                        (suggestion) => suggestion.id === guest.id
                    )
                )
                    return null;
                return (
                    <Box
                        key={guest.id}
                        borderColor="secondary.500"
                        borderBottomWidth={1}
                        _first={{
                            borderTopWidth: 1,
                        }}
                    >
                        <Button
                            variant={isSelected ? 'solid' : 'ghost'}
                            borderRadius={0}
                            w="full"
                            py={6}
                            justifyContent="flex-start"
                            onClick={() => handleToggleSelect(guest)}
                            alignItems="center"
                        >
                            <Box>
                                <Icon
                                    as={FaUser}
                                    color={
                                        isSelected ? 'white' : 'secondary.500'
                                    }
                                    mr={4}
                                />
                                {guest.firstName} {guest.lastName}
                            </Box>
                            <Icon
                                as={FaLink}
                                color={isSelected ? 'white' : 'secondary.500'}
                                ml="auto"
                            />
                        </Button>
                    </Box>
                );
            })}
            <ButtonGroup
                mt={8}
                spacing={4}
                justifyContent="flex-end"
                display="flex"
            >
                <Button variant="ghost" onClick={disclosure.onClose}>
                    Annuleren
                </Button>
                <Button
                    isDisabled={!selectedGuest?.id}
                    onClick={() => {
                        setTabIndex(1);
                    }}
                >
                    Volgende stap
                </Button>
            </ButtonGroup>
        </TabPanel>
    );
};

export default WeddingInvitationResponseConnectModalGuestPanel;

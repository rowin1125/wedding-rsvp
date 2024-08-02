import React from 'react';

import { GridItem, Flex, Box, Text } from '@chakra-ui/react';
import { GetWeddingInvitationResponses, GetGuests } from 'types/graphql';

import GuestChangeRow from './GuestChangeRow';
import GuestPresenceChangeRow from './GuestPresenceChangeRow';

type GuestInitialDataCheckingRowsProps = {
    guestWeddingResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0]['guestWeddingResponses'][0];
    guest?: GetGuests['guests'][0];
};

const GuestInitialDataCheckingRows = ({
    guestWeddingResponse,
    guest,
}: GuestInitialDataCheckingRowsProps) => {
    return (
        <>
            <GridItem colSpan={5}>
                <Flex alignItems="center">
                    <Text fontWeight="semibold">Gastenlijst data:</Text>
                    <Box
                        display={{ base: 'block', lg: 'none' }}
                        h={5}
                        w={5}
                        ml={2}
                        rounded="md"
                        bg="primary.500"
                    />
                </Flex>
            </GridItem>
            <GridItem colSpan={1} />
            <GridItem colSpan={5}>
                <Flex alignItems="center">
                    <Text fontWeight="semibold">RSVP data:</Text>
                    <Box
                        display={{ base: 'block', lg: 'none' }}
                        h={5}
                        ml={2}
                        w={5}
                        rounded="md"
                        bg="green.100"
                    />
                </Flex>
            </GridItem>

            <GuestChangeRow
                guestWeddingResponse={guestWeddingResponse}
                guest={guest}
                property="firstName"
                label="Voornaam"
            />
            <GuestChangeRow
                guestWeddingResponse={guestWeddingResponse}
                guest={guest}
                property="lastName"
                label="Achternaam"
            />
            <GuestPresenceChangeRow
                guestWeddingResponse={guestWeddingResponse?.dayPartsPresent}
                guest={guest}
                label="Aanwezigheid"
            />
        </>
    );
};

export default GuestInitialDataCheckingRows;

import React from 'react';

import {
    Box,
    Card,
    Flex,
    Grid,
    GridItem,
    Heading,
    Icon,
    Progress,
    Text,
} from '@chakra-ui/react';
import { BiWorld } from 'react-icons/bi';
import { BsFillHousesFill } from 'react-icons/bs';
import { FaChildReaching } from 'react-icons/fa6';
import { IoIosPeople } from 'react-icons/io';
import { GetGuestGroupsQuery } from 'types/graphql';

import { getGuestListStats } from './helpers/getGuestListStats';
import { getProgressPercentage } from './helpers/getProgressPercentage';

type GuestListStatsProps = {
    guestGroups?: GetGuestGroupsQuery['guestGroups'];
};

const GuestListStats = ({ guestGroups }: GuestListStatsProps) => {
    const {
        totalGroupCount,
        totalGuestsCount,
        totalChildCount,
        totalForeignCount,
        totalWithCompletedAddressCount,
        addressesProgress,
        totalGuestCount,
        totalGuestCountWithConnectViaRsvp,
        totalGuestCountWithConnectViaRsvpPercentage,
    } = getGuestListStats(guestGroups);

    return (
        <GridItem colSpan={{ base: 12, lg: 5 }}>
            <Card size="sm" px={4} py={6}>
                <Heading as="h3" size="h3">
                    Statistieken
                </Heading>
                <Box mb={4}>
                    <Text>
                        <strong>{totalWithCompletedAddressCount}</strong> van de{' '}
                        <strong>{totalGroupCount}</strong> adressen compleet
                    </Text>
                    <Progress
                        mt={2}
                        value={addressesProgress}
                        borderRadius="5px"
                        colorScheme={getProgressPercentage(addressesProgress)}
                    />
                </Box>
                <Box>
                    <Text>
                        <strong>{totalGuestCountWithConnectViaRsvp}</strong> van
                        de <strong>{totalGuestCount}</strong> RSVP ingevuld
                    </Text>
                    <Progress
                        mt={2}
                        value={totalGuestCountWithConnectViaRsvpPercentage}
                        borderRadius="5px"
                        colorScheme={getProgressPercentage(
                            totalGuestCountWithConnectViaRsvpPercentage
                        )}
                    />
                </Box>
                <Grid templateColumns="repeat(3, 1fr)" rowGap={2} mt={4}>
                    <GridItem colSpan={{ base: 3, lg: 1 }}>
                        <Text as="h3" size="h4" fontWeight="bold">
                            Totale:
                        </Text>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, lg: 2 }}>
                        <Flex alignItems="center">
                            <Icon as={IoIosPeople} fontSize="xl" />
                            <Text ml={2} fontSize="sm">
                                {totalGuestsCount} gasten
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, lg: 1 }} />
                    <GridItem colSpan={{ base: 3, lg: 2 }}>
                        <Flex alignItems="center">
                            <Icon as={BsFillHousesFill} fontSize="xl" />
                            <Text ml={2} fontSize="sm">
                                {totalGroupCount} Huishoudens
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, lg: 1 }} />
                    <GridItem colSpan={{ base: 3, lg: 2 }}>
                        <Flex alignItems="center">
                            <Icon as={BiWorld} fontSize="xl" />
                            <Text ml={2} fontSize="sm">
                                {totalForeignCount} Buitenlandse gasten
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, lg: 1 }} />
                    <GridItem colSpan={{ base: 3, lg: 2 }}>
                        <Flex alignItems="center">
                            <Icon as={FaChildReaching} fontSize="xl" />
                            <Text ml={2} fontSize="sm">
                                {totalChildCount} Kinderen
                            </Text>
                        </Flex>
                    </GridItem>
                </Grid>
            </Card>
        </GridItem>
    );
};

export default GuestListStats;

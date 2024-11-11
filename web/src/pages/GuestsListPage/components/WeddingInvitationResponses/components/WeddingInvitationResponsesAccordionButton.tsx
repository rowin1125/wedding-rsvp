import React from 'react';

import {
    AccordionButton,
    Flex,
    AccordionIcon,
    Icon,
    Box,
    Text,
} from '@chakra-ui/react';
import { FaWpforms } from 'react-icons/fa6';
import { GetWeddingInvitationResponses } from 'types/graphql';

type WeddingInvitationResponsesAccordionButtonProps = {
    weddingInvitationResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0];
};

const WeddingInvitationResponsesAccordionButton = ({
    weddingInvitationResponse,
}: WeddingInvitationResponsesAccordionButtonProps) => {
    const firstGuest = weddingInvitationResponse.guestWeddingResponses[0];
    const totalGuestWithNoRsvpConnectionCount =
        weddingInvitationResponse.guestWeddingResponses.filter(
            (response) => !response?.guest?.connectedViaRsvp
        ).length;

    return (
        <Flex
            borderColor="primary.700"
            backgroundColor="primary.600"
            _hover={{
                backgroundColor: 'primary.700',
            }}
            alignItems="center"
        >
            <AccordionButton
                w="full"
                color="secondary.900"
                position="relative"
                borderRadius={0}
                py={6}
                borderColor="primary.700"
                display="flex"
                justifyContent="left"
                backgroundColor="primary.600"
                _hover={{
                    backgroundColor: 'primary.700',
                }}
                alignItems="center"
                pl={4}
                pr={0}
                mr={0}
            >
                <Flex justifyContent="space-between" w="full">
                    <Flex alignItems="center">
                        <AccordionIcon
                            mr={4}
                            fontSize="3xl"
                            left="1px"
                            position="relative"
                        />
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Flex
                                alignItems="center"
                                flexDir={{
                                    base: 'column',
                                    lg: 'row',
                                }}
                            >
                                <Flex alignItems="center">
                                    <Flex alignItems="center">
                                        <Icon as={FaWpforms} />
                                        <Text
                                            ml={4}
                                            fontSize="lg"
                                            fontWeight="semibold"
                                        >
                                            {firstGuest?.guest?.firstName}{' '}
                                            {firstGuest?.guest?.lastName}
                                        </Text>
                                    </Flex>
                                    <Box
                                        display={{ base: 'none', lg: 'block' }}
                                        mx={4}
                                    >
                                        -
                                    </Box>
                                </Flex>
                                <Box>
                                    {totalGuestWithNoRsvpConnectionCount}{' '}
                                    gast(en)
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </AccordionButton>
        </Flex>
    );
};

export default WeddingInvitationResponsesAccordionButton;

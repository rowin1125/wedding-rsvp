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
        <AccordionButton
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
            w={'100%'}
        >
            <Flex justifyContent="space-between" w="full">
                <Flex alignItems="center">
                    <AccordionIcon
                        mr={4}
                        fontSize="3xl"
                        left="1px"
                        position="relative"
                    />
                    <Icon as={FaWpforms} />
                    <Text ml={4} fontSize="lg" fontWeight="semibold">
                        {firstGuest?.guest?.firstName}{' '}
                        {firstGuest?.guest?.lastName}
                    </Text>
                    <Box mx={4}>-</Box>
                    <Box>{totalGuestWithNoRsvpConnectionCount} gast(en)</Box>
                </Flex>
            </Flex>
        </AccordionButton>
    );
};

export default WeddingInvitationResponsesAccordionButton;

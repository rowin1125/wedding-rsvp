import React, { useMemo } from 'react';

import {
    TabPanel,
    Heading,
    Alert,
    AlertIcon,
    Box,
    Flex,
    Icon,
    Text,
    Tooltip,
    useToast,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { GetGuestById, GuestWeddingResponseStatus } from 'types/graphql';

import PresenceButton from 'src/components/react-hook-form/components/PresenceControl/PresenceControl';

import { useUpdateDayPartsPresent } from '../hooks/useUpdateDayPartsPresent';

type GuestUpdateDayPartsPresentProps = {
    guest: GetGuestById['guest'];
};

const GuestUpdateDayPartsPresent = ({
    guest,
}: GuestUpdateDayPartsPresentProps) => {
    const { updateDayPartsPresent, loading } = useUpdateDayPartsPresent();
    const toast = useToast();

    const handleUpdateDayPartPresent = async (
        dayPartPresentId: string,
        status: GuestWeddingResponseStatus
    ) => {
        if (!guest?.id) {
            toast({
                title: 'Error updating day parts present',
                description: 'Guest id not found',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        await updateDayPartsPresent({
            variables: {
                id: dayPartPresentId,
                input: {
                    guestWeddingResponseStatus: status,
                },
            },
        });

        toast({
            title: 'Aanwezigheid aangepast',
            description: 'De aanwezigheid van de gast is geüpdatet',
            status: 'success',
            duration: 2000,
        });
    };

    const sortedDayPartsPresent = useMemo(() => {
        return [...(guest?.guestDayPartsPresents || [])].sort((a, b) => {
            if (!a?.weddingDayPart?.endTime || !b?.weddingDayPart?.endTime)
                return 0;

            return (
                new Date(a?.weddingDayPart.endTime).getTime() -
                new Date(b?.weddingDayPart.endTime).getTime()
            );
        });
    }, [guest?.guestDayPartsPresents]);

    return (
        <TabPanel p={8}>
            <Heading as="h2" size="lg" mb={4}>
                Aanwezigheid gast bewerken: {guest?.firstName} {guest?.lastName}
            </Heading>
            <Alert status="info" mb={4} variant="left-accent">
                <AlertIcon />
                <Text>
                    Hieronder kun je de aanwezigheid van de gast bewerken.
                    Indien dit gekoppeld is aan een RSVP dan zal dit ook
                    aangepast worden in het overzicht van de gast
                </Text>
            </Alert>
            <Box>
                {sortedDayPartsPresent.map((dayPart) => {
                    if (!dayPart?.id) return null;

                    return (
                        <Box key={dayPart?.id} mb={4}>
                            <Text fontWeight="semibold" mb={2} fontSize="sm">
                                {dayPart?.weddingDayPart.name}
                            </Text>
                            <Flex gap={2}>
                                <PresenceButton
                                    variant={
                                        dayPart?.guestWeddingResponseStatus ===
                                        'ACCEPTED'
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    value="ACCEPTED"
                                    isLoading={loading}
                                    onClick={() =>
                                        handleUpdateDayPartPresent(
                                            dayPart?.id,
                                            'ACCEPTED'
                                        )
                                    }
                                    colorScheme="green"
                                >
                                    <Tooltip
                                        label="De gast is aanwezig"
                                        shouldWrapChildren
                                    >
                                        <Icon as={FaCheck} fontSize="sm" />
                                    </Tooltip>
                                </PresenceButton>
                                <PresenceButton
                                    variant={
                                        dayPart?.guestWeddingResponseStatus ===
                                        'UNKNOWN'
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    isLoading={loading}
                                    onClick={() =>
                                        handleUpdateDayPartPresent(
                                            dayPart?.id,
                                            'UNKNOWN'
                                        )
                                    }
                                    value="UNKNOWN"
                                    colorScheme="orange"
                                >
                                    <Tooltip
                                        label="De gast weet het nog niet"
                                        shouldWrapChildren
                                    >
                                        <Icon
                                            as={MdOutlineQuestionMark}
                                            fontSize="sm"
                                        />
                                    </Tooltip>
                                </PresenceButton>
                                <PresenceButton
                                    variant={
                                        dayPart?.guestWeddingResponseStatus ===
                                        'DECLINED'
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    isLoading={loading}
                                    value="DECLINED"
                                    colorScheme="red"
                                    onClick={() =>
                                        handleUpdateDayPartPresent(
                                            dayPart?.id,
                                            'DECLINED'
                                        )
                                    }
                                >
                                    <Tooltip
                                        label="De gast is helaas niet aanwezig"
                                        shouldWrapChildren
                                    >
                                        <Icon as={IoMdClose} fontSize="sm" />
                                    </Tooltip>
                                </PresenceButton>
                            </Flex>
                        </Box>
                    );
                })}
            </Box>
        </TabPanel>
    );
};

export default GuestUpdateDayPartsPresent;

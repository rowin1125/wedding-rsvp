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
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { TbMailX } from 'react-icons/tb';
import { GetGuestById } from 'types/graphql';

import PresenceButton from 'src/components/react-hook-form/components/PresenceControl/PresenceControl';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import { useCreateMissingDayPartPresent } from '../hooks/useCreateMissingDayPartPresent';
import { useUpdateDayPartsPresent } from '../hooks/useUpdateDayPartsPresent';

type GuestUpdateDayPartsPresentProps = {
    guest: GetGuestById['guest'];
};

const GuestUpdateDayPartsPresent = ({
    guest,
}: GuestUpdateDayPartsPresentProps) => {
    const { updateDayPartsPresent, loading } = useUpdateDayPartsPresent();
    const { createMissingDayPartPresent, loading: createLoading } =
        useCreateMissingDayPartPresent();
    const { wedding } = useGetWeddingById();

    const missingDayParts = useMemo(() => {
        if (!wedding?.dayParts) return [];

        return wedding?.dayParts.filter(
            (dayPart) =>
                !guest?.guestDayPartsPresents?.some(
                    (dayPartPresent) =>
                        dayPartPresent?.weddingDayPartId === dayPart?.id
                )
        );
    }, [guest?.guestDayPartsPresents, wedding?.dayParts]);

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

    const guestWeddingResponseId = sortedDayPartsPresent.find(
        (dayPartPresent) => dayPartPresent?.guestWeddingResponseId
    )?.guestWeddingResponseId;
    const rsvpLandingPageId = sortedDayPartsPresent.find(
        (dayPartPresent) => dayPartPresent?.weddingRsvpLandingPageId
    )?.weddingRsvpLandingPageId;

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
                                        updateDayPartsPresent({
                                            guestId: guest?.id,
                                            status: 'ACCEPTED',
                                            dayPartPresentId: dayPart?.id,
                                        })
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
                                        updateDayPartsPresent({
                                            guestId: guest?.id,
                                            status: 'UNKNOWN',
                                            dayPartPresentId: dayPart?.id,
                                        })
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
                                        updateDayPartsPresent({
                                            guestId: guest?.id,
                                            status: 'DECLINED',
                                            dayPartPresentId: dayPart?.id,
                                        })
                                    }
                                >
                                    <Tooltip
                                        label="De gast is helaas niet aanwezig"
                                        shouldWrapChildren
                                    >
                                        <Icon as={IoMdClose} fontSize="sm" />
                                    </Tooltip>
                                </PresenceButton>
                                <PresenceButton
                                    variant={
                                        dayPart?.guestWeddingResponseStatus ===
                                        'UNINVITED'
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    isLoading={loading}
                                    value="UNINVITED"
                                    colorScheme="gray"
                                    onClick={() =>
                                        updateDayPartsPresent({
                                            dayPartPresentId: dayPart?.id,
                                            status: 'UNINVITED',
                                            guestId: guest?.id,
                                        })
                                    }
                                >
                                    <Tooltip
                                        label="De gast is helaas niet aanwezig"
                                        shouldWrapChildren
                                    >
                                        <Icon as={TbMailX} fontSize="sm" />
                                    </Tooltip>
                                </PresenceButton>
                            </Flex>
                        </Box>
                    );
                })}
            </Box>
            {missingDayParts.length > 0 && (
                <>
                    {missingDayParts.map((dayPart) => {
                        if (!guest?.id) return null;

                        return (
                            <Box key={dayPart?.id} mb={4}>
                                <Text
                                    fontWeight="semibold"
                                    mb={2}
                                    fontSize="sm"
                                >
                                    {dayPart?.name}
                                </Text>
                                <Flex gap={2}>
                                    <PresenceButton
                                        variant={'outline'}
                                        value="ACCEPTED"
                                        isLoading={createLoading}
                                        onClick={() =>
                                            createMissingDayPartPresent({
                                                guestId: guest.id,
                                                guestWeddingResponseId,
                                                weddingDayPartId: dayPart.id,
                                                weddingRsvpLandingPageId:
                                                    rsvpLandingPageId,
                                                guestWeddingResponseStatus:
                                                    'ACCEPTED',
                                            })
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
                                        variant={'outline'}
                                        isLoading={createLoading}
                                        onClick={() =>
                                            createMissingDayPartPresent({
                                                guestId: guest.id,
                                                guestWeddingResponseId,
                                                weddingDayPartId: dayPart.id,
                                                weddingRsvpLandingPageId:
                                                    rsvpLandingPageId,
                                                guestWeddingResponseStatus:
                                                    'UNKNOWN',
                                            })
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
                                        variant={'outline'}
                                        isLoading={createLoading}
                                        value="DECLINED"
                                        colorScheme="red"
                                        onClick={() =>
                                            createMissingDayPartPresent({
                                                guestId: guest.id,
                                                guestWeddingResponseId,
                                                weddingDayPartId: dayPart.id,
                                                weddingRsvpLandingPageId:
                                                    rsvpLandingPageId,
                                                guestWeddingResponseStatus:
                                                    'DECLINED',
                                            })
                                        }
                                    >
                                        <Tooltip
                                            label="De gast is helaas niet aanwezig"
                                            shouldWrapChildren
                                        >
                                            <Icon
                                                as={IoMdClose}
                                                fontSize="sm"
                                            />
                                        </Tooltip>
                                    </PresenceButton>
                                    <PresenceButton
                                        variant={'outline'}
                                        isLoading={createLoading}
                                        value="UNINVITED"
                                        colorScheme="gray"
                                        onClick={() =>
                                            createMissingDayPartPresent({
                                                guestId: guest.id,
                                                guestWeddingResponseId,
                                                weddingDayPartId: dayPart.id,
                                                weddingRsvpLandingPageId:
                                                    rsvpLandingPageId,
                                                guestWeddingResponseStatus:
                                                    'UNINVITED',
                                            })
                                        }
                                    >
                                        <Tooltip
                                            label="De gast is helaas niet aanwezig"
                                            shouldWrapChildren
                                        >
                                            <Icon as={TbMailX} fontSize="sm" />
                                        </Tooltip>
                                    </PresenceButton>
                                </Flex>
                            </Box>
                        );
                    })}
                </>
            )}
        </TabPanel>
    );
};

export default GuestUpdateDayPartsPresent;

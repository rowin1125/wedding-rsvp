import React, { useMemo } from 'react';

import {
    AccordionButton,
    Flex,
    AccordionIcon,
    Icon,
    Box,
    Text,
    Tooltip,
} from '@chakra-ui/react';
import { CiWarning } from 'react-icons/ci';
import { FaCheckCircle } from 'react-icons/fa';
import {
    FaHouseCircleCheck,
    FaHouseCircleXmark,
    FaLink,
    FaUser,
} from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi';
import { GetGuestGroupsQuery } from 'types/graphql';

type GuestGroupTypeAccordionButtonProps = {
    groupKey: string;
    value: GetGuestGroupsQuery['guestGroups'];
    showArrows: boolean;
    isExpanded: boolean;
    label?: string;
    addressesFilledInCount: number;
    allComplete: boolean;
};

const GuestGroupTypeAccordionButton = ({
    addressesFilledInCount,
    allComplete,
    groupKey,
    value,
    showArrows,
    isExpanded,
    label,
}: GuestGroupTypeAccordionButtonProps) => {
    const totalGuests = useMemo(() => {
        return value.reduce((acc, curr) => acc + curr.guests.length, 0);
    }, [value]);

    const totalGuestConnectedViaRsvp = useMemo(() => {
        return value.reduce(
            (acc, curr) =>
                acc +
                curr.guests.filter((guest) => guest?.connectedViaRsvp).length,
            0
        );
    }, [value]);

    const allGuestsAllCompleteViaRsvp =
        totalGuests === totalGuestConnectedViaRsvp;
    const rowIsComplete = allGuestsAllCompleteViaRsvp && allComplete;

    const totalGuestsWithoutCorrectDayPresentsResponse = useMemo(() => {
        return (
            value.reduce(
                (acc, curr) =>
                    acc +
                    curr.guests.filter((guest) =>
                        guest?.guestDayPartsPresents.some(
                            (dayPart) =>
                                (!!dayPart?.guestWeddingResponseStatus &&
                                    dayPart?.guestWeddingResponseStatus ===
                                        'UNKNOWN') ??
                                true
                        )
                    ).length,
                0
            ) ?? 0
        );
    }, [value]);

    return (
        <AccordionButton
            backgroundColor="primary.600"
            _hover={{
                backgroundColor: 'primary.500',
            }}
            display="flex"
            alignItems={{
                base: 'flex-start',
                lg: 'center',
            }}
            justifyContent="space-between"
            flexDir={{
                base: 'column',
                lg: 'row',
            }}
            py={4}
        >
            <Flex display="flex" alignItems="center">
                <AccordionIcon
                    mr={4}
                    transform={
                        showArrows
                            ? isExpanded
                                ? 'rotate(0deg)'
                                : 'rotate(180deg)'
                            : undefined
                    }
                    fontSize="3xl"
                />

                <Text
                    fontWeight="semibold"
                    textAlign="left"
                    fontSize="lg"
                    display="flex"
                    alignItems="center"
                >
                    {label ?? groupKey}{' '}
                    {rowIsComplete && (
                        <Icon ml={2} as={FaCheckCircle} color="green.600" />
                    )}
                </Text>
            </Flex>
            <Flex
                alignItems="center"
                ml={{
                    base: '46px',
                    lg: 0,
                }}
                color="secondary.900"
            >
                {totalGuestsWithoutCorrectDayPresentsResponse > 0 && (
                    <>
                        <Tooltip
                            label="Aantal gasten zonder dagdeel reactie"
                            aria-label="Aantal gasten zonder dagdeel reactie"
                        >
                            <Flex alignItems="center">
                                <Text
                                    fontWeight="semibold"
                                    color={
                                        totalGuestsWithoutCorrectDayPresentsResponse
                                            ? 'orange.500'
                                            : 'secondary.900'
                                    }
                                >
                                    {
                                        totalGuestsWithoutCorrectDayPresentsResponse
                                    }
                                </Text>
                                <Icon
                                    ml={2}
                                    as={CiWarning}
                                    fontSize="lg"
                                    color={
                                        totalGuestsWithoutCorrectDayPresentsResponse
                                            ? 'orange.500'
                                            : 'secondary.900'
                                    }
                                />
                            </Flex>
                        </Tooltip>
                        <Box mx={4}>|</Box>
                    </>
                )}

                <Tooltip
                    label="Aantal gasten via RSVP"
                    aria-label="Aantal gasten via RSVP"
                >
                    <Flex alignItems="center">
                        <Text
                            fontWeight="semibold"
                            color={
                                allGuestsAllCompleteViaRsvp
                                    ? 'green.600'
                                    : 'secondary.900'
                            }
                        >
                            {totalGuestConnectedViaRsvp}
                        </Text>
                        <Icon
                            ml={2}
                            as={FaLink}
                            fontSize="lg"
                            color={
                                allGuestsAllCompleteViaRsvp
                                    ? 'green.600'
                                    : 'secondary.900'
                            }
                        />
                    </Flex>
                </Tooltip>
                <Box mx={4}>|</Box>
                <Tooltip
                    label="Totaal aantal gasten"
                    aria-label="Totaal aantal gasten"
                >
                    <Flex alignItems="center">
                        <Text
                            fontWeight="semibold"
                            color={
                                rowIsComplete ? 'green.600' : 'secondary.900'
                            }
                        >
                            {totalGuests}
                        </Text>
                        <Icon
                            ml={2}
                            color={
                                rowIsComplete ? 'green.600' : 'secondary.900'
                            }
                            as={FaUser}
                        />
                    </Flex>
                </Tooltip>
                <Box mx={4}>|</Box>
                <Tooltip label="Aantal groepen" aria-label="Aantal groepen">
                    <Flex alignItems="center">
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            color={
                                rowIsComplete ? 'green.600' : 'secondary.900'
                            }
                        >
                            {value.length}
                        </Text>
                        <Icon
                            ml={2}
                            color={
                                rowIsComplete ? 'green.600' : 'secondary.900'
                            }
                            as={HiUserGroup}
                            fontSize="lg"
                        />
                    </Flex>
                </Tooltip>
                <Box mx={4}>|</Box>
                <Tooltip
                    label="Gegevens compleet per groep"
                    aria-label="Aantal gasten"
                >
                    <Flex alignItems="center">
                        <Text
                            fontWeight="semibold"
                            color={allComplete ? 'green.600' : 'secondary.900'}
                        >
                            {addressesFilledInCount} / {value.length}
                        </Text>
                        <Icon
                            ml={2}
                            as={
                                allComplete
                                    ? FaHouseCircleCheck
                                    : FaHouseCircleXmark
                            }
                            color={allComplete ? 'green.600' : 'secondary.900'}
                            fontSize="lg"
                        />
                    </Flex>
                </Tooltip>
            </Flex>
        </AccordionButton>
    );
};

export default GuestGroupTypeAccordionButton;

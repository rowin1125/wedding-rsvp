import React from 'react';

import { GridItem, Flex, Icon, Text, Tooltip, Box } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { HiOutlineArrowLeft, HiOutlineArrowUp } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { GetGuests, GetWeddingInvitationResponses } from 'types/graphql';

import PresenceButton from 'src/components/react-hook-form/components/PresenceControl/PresenceControl';

type GuestPresenceChangeRowProps = {
    guestWeddingResponse?: NonNullable<
        GetWeddingInvitationResponses['weddingInvitationResponses'][0]['guestWeddingResponses'][0]
    >['dayPartsPresent'];
    label: string;
    guest?: GetGuests['guests'][0];
};

const GuestPresenceChangeRow = ({
    guestWeddingResponse,
    label,
    guest,
}: GuestPresenceChangeRowProps) => {
    return (
        <>
            <GridItem
                colSpan={{ base: 11, lg: 1 }}
                display={{ base: 'flex', lg: 'none' }}
                mb={-2}
            >
                <Text fontWeight="semibold">{label}</Text>
            </GridItem>
            <GridItem
                colSpan={{ base: 11, lg: 5 }}
                flexDir="column"
                bg="primary.600"
                px={4}
                rounded="xl"
                py={4}
            >
                <Text
                    display={{
                        base: 'none',
                        lg: 'block',
                    }}
                    fontWeight="semibold"
                    mb={2}
                >
                    {label}
                </Text>
                <Box position="relative">
                    <Icon
                        display={{
                            base: 'block',
                            lg: 'none',
                        }}
                        fontSize="3xl"
                        as={HiOutlineArrowUp}
                        position="absolute"
                        bottom={-14}
                        left="50%"
                        transform="translateX(-50%)"
                        background="secondary.900"
                        color="white"
                        rounded="full"
                        p={2}
                    />
                    {guest?.guestDayPartsPresents?.map(
                        (guestDayPartsPresent) => (
                            <Box key={guestDayPartsPresent?.id} mb={4}>
                                <Text
                                    fontWeight="semibold"
                                    mb={2}
                                    fontSize="sm"
                                >
                                    {guestDayPartsPresent?.weddingDayPart.name}
                                </Text>
                                <Flex gap={2}>
                                    <PresenceButton
                                        size="xs"
                                        variant={
                                            guestDayPartsPresent?.guestWeddingResponseStatus ===
                                            'ACCEPTED'
                                                ? 'solid'
                                                : 'outline'
                                        }
                                        value={
                                            guestDayPartsPresent?.guestWeddingResponseStatus
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
                                        size="xs"
                                        variant={
                                            guestDayPartsPresent?.guestWeddingResponseStatus ===
                                            'UNKNOWN'
                                                ? 'solid'
                                                : 'outline'
                                        }
                                        value={
                                            guestDayPartsPresent?.guestWeddingResponseStatus
                                        }
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
                                        size="xs"
                                        variant={
                                            guestDayPartsPresent?.guestWeddingResponseStatus ===
                                            'DECLINED'
                                                ? 'solid'
                                                : 'outline'
                                        }
                                        value={
                                            guestDayPartsPresent?.guestWeddingResponseStatus
                                        }
                                        colorScheme="red"
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
                                </Flex>
                            </Box>
                        )
                    )}
                </Box>
            </GridItem>
            <GridItem
                colSpan={{ base: 11, lg: 1 }}
                display={{
                    base: 'none',
                    lg: 'flex',
                }}
                alignItems="center"
                justifyContent="center"
            >
                <Flex flexDir="column" justifyContent="flex-end" h="full">
                    <Icon mb={5} fontSize="3xl" as={HiOutlineArrowLeft} />
                </Flex>
            </GridItem>
            <GridItem
                colSpan={{ base: 11, lg: 5 }}
                flexDir="column"
                bg="green.100"
                px={4}
                rounded="xl"
                py={4}
            >
                <Text
                    display={{
                        base: 'none',
                        lg: 'block',
                    }}
                    fontWeight="semibold"
                    mb={2}
                >
                    {label}
                </Text>
                <Box position="relative">
                    {guestWeddingResponse?.map((dayPart) => (
                        <Box key={dayPart?.id} mb={4}>
                            <Text fontWeight="semibold" mb={2} fontSize="sm">
                                {dayPart?.weddingDayPart.name}
                            </Text>
                            <Flex gap={2}>
                                <PresenceButton
                                    size="xs"
                                    variant={
                                        dayPart?.guestWeddingResponseStatus ===
                                        'ACCEPTED'
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    value="ACCEPTED"
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
                                    size="xs"
                                    variant={
                                        dayPart?.guestWeddingResponseStatus ===
                                        'UNKNOWN'
                                            ? 'solid'
                                            : 'outline'
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
                                    size="xs"
                                    variant={
                                        dayPart?.guestWeddingResponseStatus ===
                                        'DECLINED'
                                            ? 'solid'
                                            : 'outline'
                                    }
                                    value="DECLINED"
                                    colorScheme="red"
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
                    ))}
                </Box>
            </GridItem>
        </>
    );
};

export default GuestPresenceChangeRow;

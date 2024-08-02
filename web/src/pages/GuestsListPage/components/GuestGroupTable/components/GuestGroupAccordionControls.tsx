import React from 'react';

import {
    Flex,
    Box,
    Badge,
    Icon,
    Button,
    useDisclosure,
    Tooltip,
    ButtonGroup,
} from '@chakra-ui/react';
import {
    FaHouseCircleXmark,
    FaHouseCircleCheck,
    FaUsersGear,
    FaUserPlus,
} from 'react-icons/fa6';
import { GetGuestGroupsQuery } from 'types/graphql';

import { GUEST_GROUP_LABEL_MAP } from 'src/config/guestList';

import GuestCreateModal from './GuestCreateModal';
import GuestGroupUpdateModal from './GuestGroupUpdateModal';

type GuestGroupAccordionControlsProps = {
    guestGroup: GetGuestGroupsQuery['guestGroups'][0];
};

const GuestGroupAccordionControls = ({
    guestGroup,
}: GuestGroupAccordionControlsProps) => {
    const updateGuestGroupDisclosure = useDisclosure();
    const createGuestDisclosure = useDisclosure();

    return (
        <Flex
            alignItems="center"
            justifyContent={{
                base: 'flex-end',
            }}
            mt={2}
            pb={{ base: 4, lg: 0 }}
        >
            <Box mr={4}>
                {guestGroup.address?.addressDataMissing ? (
                    <Tooltip label="Niet alle adressen zijn ingevuld van de gasten in deze groep ❌">
                        <Badge
                            colorScheme="red"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={5}
                            px={2}
                            py={1}
                            fontSize="xx-small"
                        >
                            <Icon
                                as={FaHouseCircleXmark}
                                fontSize="sm"
                                mr={2}
                            />
                            Ontbreekt
                        </Badge>
                    </Tooltip>
                ) : (
                    <Tooltip label="Alle adressen zijn ingevuld ✅ 🏡">
                        <Badge
                            colorScheme="green"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={5}
                            px={2}
                            py={1}
                            fontSize="xx-small"
                        >
                            <Icon
                                as={FaHouseCircleCheck}
                                fontSize="sm"
                                mr={2}
                            />
                            Compleet
                        </Badge>
                    </Tooltip>
                )}
            </Box>
            <ButtonGroup spacing={4} mr={4}>
                <Tooltip
                    label={`Gast toevoegen aan ${
                        GUEST_GROUP_LABEL_MAP[guestGroup.guestGroupType]
                    }: ${guestGroup.name}`}
                >
                    <Button
                        onClick={createGuestDisclosure.onOpen}
                        colorScheme="secondary"
                        size="sm"
                        variant="outline"
                    >
                        <Icon as={FaUserPlus} fontSize="lg" />
                    </Button>
                </Tooltip>
                <Tooltip
                    label={`Groep ${
                        GUEST_GROUP_LABEL_MAP[guestGroup.guestGroupType]
                    } bijwerken: ${guestGroup.name}`}
                >
                    <Button
                        colorScheme="secondary"
                        size="sm"
                        variant="outline"
                        onClick={updateGuestGroupDisclosure.onOpen}
                    >
                        <Icon as={FaUsersGear} fontSize="lg" />
                    </Button>
                </Tooltip>
            </ButtonGroup>
            {createGuestDisclosure.isOpen && (
                <GuestCreateModal
                    disclosure={createGuestDisclosure}
                    guestGroupId={guestGroup.id}
                />
            )}
            {updateGuestGroupDisclosure.isOpen && (
                <GuestGroupUpdateModal
                    guestGroup={guestGroup}
                    disclosure={updateGuestGroupDisclosure}
                />
            )}
        </Flex>
    );
};

export default GuestGroupAccordionControls;

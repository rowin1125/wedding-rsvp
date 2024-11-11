import React, { useState } from 'react';

import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa6';
import { GetGuests, GetWeddingInvitationResponses } from 'types/graphql';

import { useIsDevice } from 'src/hooks/useIsDevice';

import { useGetGuests } from '../hooks/useGetGuests';

import WeddingInvitationResponseConnectModalCheckPanel from './WeddingInvitationResponseConnectModalCheckPanel';
import WeddingInvitationResponseConnectModalGuestPanel from './WeddingInvitationResponseConnectModalGuestPanel';

type WeddingInvitationResponseConnectModalProps = {
    weddingInvitationResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0];
    disclosure: ReturnType<typeof useDisclosure>;
    guestWeddingResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0]['guestWeddingResponses'][0];
};

const WeddingInvitationResponseConnectModal = ({
    disclosure,
    weddingInvitationResponse,
    guestWeddingResponse,
}: WeddingInvitationResponseConnectModalProps) => {
    const { isDesktop } = useIsDevice();
    const [tabIndex, setTabIndex] = useState(0);
    const { guests, loading } = useGetGuests({ skip: !disclosure.isOpen });
    const [selectedGuest, setSelectedGuest] = useState<
        GetGuests['guests'][0] | undefined
    >(undefined);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    const handleToggleSelect = (guest: GetGuests['guests'][0]) => {
        if (selectedGuest?.id === guest.id) {
            setSelectedGuest(undefined);
        } else {
            setSelectedGuest(guest);
        }
    };

    return (
        <Flex
            w={{
                base: 'full',
                lg: 'auto',
            }}
            justifyContent="flex-end"
        >
            <Tooltip label="Link de inschrijving van deze gast aan een gast op de gastenlijst">
                <Button
                    as="div"
                    mx={{
                        base: 4,
                        lg: 2,
                    }}
                    colorScheme="secondary"
                    size="sm"
                    variant="outline"
                    onClick={disclosure.onOpen}
                >
                    <Icon as={FaLink} fontSize="lg" />
                </Button>
            </Tooltip>
            <Modal
                size={tabIndex === 0 ? '3xl' : '6xl'}
                isOpen={disclosure.isOpen}
                onClose={disclosure.onClose}
            >
                <ModalOverlay />
                <ModalContent transition="all ease-in-out 0.1s">
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading mb={4}>
                            Connect{' '}
                            <strong>
                                {guestWeddingResponse?.guest?.firstName}{' '}
                                {guestWeddingResponse?.guest?.lastName}
                            </strong>
                        </Heading>
                        <Box as="hr" />
                        <Tabs
                            index={tabIndex}
                            onChange={handleTabsChange}
                            position="relative"
                            colorScheme="body"
                            {...(!isDesktop ? { isFitted: true } : {})}
                        >
                            <TabList mb="1em">
                                <Tab>1. Gast kiezen</Tab>
                                <Tab isDisabled={!selectedGuest?.id}>
                                    2. Data checken
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <WeddingInvitationResponseConnectModalGuestPanel
                                    guests={guests}
                                    handleToggleSelect={handleToggleSelect}
                                    loading={loading}
                                    selectedGuest={selectedGuest}
                                    guestWeddingResponse={guestWeddingResponse}
                                    disclosure={disclosure}
                                    setTabIndex={setTabIndex}
                                />
                                <TabPanel>
                                    <WeddingInvitationResponseConnectModalCheckPanel
                                        disclosure={disclosure}
                                        weddingInvitationResponse={
                                            weddingInvitationResponse
                                        }
                                        guestWeddingResponse={
                                            guestWeddingResponse
                                        }
                                        guest={selectedGuest}
                                        setTabIndex={setTabIndex}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default WeddingInvitationResponseConnectModal;

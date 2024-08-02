import React from 'react';

import {
    Heading,
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
    useDisclosure,
} from '@chakra-ui/react';

import Loader from 'src/components/Loader';
import { useIsDevice } from 'src/hooks/useIsDevice';

import GuestUpdateDayPartsPresent from './GuestUpdateDayPartsPresent';
import GuestUpdateForm from './GuestUpdateForm/GuestUpdateForm';
import { useGetGuestById } from './GuestUpdateForm/hooks/useGetGuest';

type GuestUpdateModalProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    guestId: string;
};

const GuestUpdateModal = ({ disclosure, guestId }: GuestUpdateModalProps) => {
    const { isOpen, onClose } = disclosure;
    const { guest } = useGetGuestById(guestId);
    const { isDesktop } = useIsDevice();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton zIndex={1} top={3} />
                <ModalBody p={0}>
                    <Tabs
                        position="relative"
                        colorScheme="body"
                        {...(isDesktop ? { isFitted: true } : {})}
                    >
                        <TabList>
                            <Tab>Gast gegevens</Tab>
                            <Tab>Aanwezigheid</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel p={8}>
                                <Heading as="h2" size="lg" mb={4}>
                                    Gast bewerken: {guest?.firstName}{' '}
                                    {guest?.lastName}
                                </Heading>
                                {!guest && <Loader />}
                                {guest && (
                                    <GuestUpdateForm
                                        disclosure={disclosure}
                                        guest={guest}
                                    />
                                )}
                            </TabPanel>
                            <GuestUpdateDayPartsPresent guest={guest} />
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default GuestUpdateModal;

import React from 'react';

import {
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { GetGuestGroupsQuery } from 'types/graphql';

import Loader from 'src/components/Loader';

import GuestGroupUpdateForm from './GuestGroupUpdateForm/GuestGroupUpdateForm';
import { useGetGuestGroupById } from './GuestGroupUpdateForm/hooks/useGetGuestGroupById';

type GuestGroupUpdateModalProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    guestGroup: GetGuestGroupsQuery['guestGroups'][0];
};

const GuestGroupUpdateModal = ({
    disclosure,
    guestGroup: { id },
}: GuestGroupUpdateModalProps) => {
    const { isOpen, onClose } = disclosure;
    const { guestGroup } = useGetGuestGroupById(id);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody pt={6}>
                    <Heading as="h2" size="lg" mb={4}>
                        Groep bewerken: {guestGroup?.name}
                    </Heading>
                    {!guestGroup && <Loader />}
                    {guestGroup && (
                        <GuestGroupUpdateForm
                            disclosure={disclosure}
                            guestGroup={guestGroup}
                        />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default GuestGroupUpdateModal;

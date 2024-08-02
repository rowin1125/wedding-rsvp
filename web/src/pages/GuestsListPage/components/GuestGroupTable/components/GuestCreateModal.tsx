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

import GuestCreateForm from './GuestCreateForm/GuestCreateForm';

type GuestCreateModalProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    guestGroupId: string;
};

const GuestCreateModal = ({
    disclosure,
    guestGroupId,
}: GuestCreateModalProps) => {
    const { isOpen, onClose } = disclosure;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody pt={6}>
                    <Heading as="h2" size="lg" mb={4}>
                        Gast toevoegen
                    </Heading>
                    {guestGroupId && (
                        <GuestCreateForm
                            disclosure={disclosure}
                            guestGroupId={guestGroupId}
                        />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default GuestCreateModal;

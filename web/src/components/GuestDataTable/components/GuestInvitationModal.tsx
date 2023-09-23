import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react';

import DataDisplay from 'src/components/DataDisplay/DataDisplay';

import { useGetGuestInvitationById } from '../hooks/useGetGuestInvitationById';

type GuestInvitationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    invitationId?: string;
};

const GuestInvitationModal = ({
    isOpen,
    onClose,
    invitationId,
}: GuestInvitationModalProps) => {
    const { weddingInvitation, loading } = useGetGuestInvitationById(
        invitationId || ''
    );
    if (!weddingInvitation || loading) return null;

    const mainGuest = weddingInvitation?.weddingGuests?.[0];

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Uitnodiging voor {mainGuest?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DataDisplay
                        entry={weddingInvitation}
                        ignoreKeys={[
                            '__typename',
                            'weddingId',
                            'id',
                            'weddingInvitationId',
                        ]}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="body" onClick={onClose}>
                        Sluiten
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GuestInvitationModal;

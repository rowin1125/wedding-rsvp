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
    Text,
} from '@chakra-ui/react';

import DataDisplay from 'src/components/DataDisplay/DataDisplay';
import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';

import { useDeleteWeddingInvitationById } from '../hooks/useDeleteWeddingInvitationById';
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
    const { weddingInvitation, loading: deleteLoading } =
        useGetGuestInvitationById(invitationId || '');
    const { deleteWeddingInvitationById, loading } =
        useDeleteWeddingInvitationById();
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
                            'firstName',
                            'lastName',
                        ]}
                    />
                </ModalBody>

                <ModalFooter>
                    <DeleteDialog
                        onDelete={async (id) => {
                            await deleteWeddingInvitationById(id);
                            onClose();
                        }}
                        title="Verwijder Uitnodiging"
                        buttonLabel="Verwijder uitnodiging"
                        buttonProps={{ ml: 0, mr: 4 }}
                        id={weddingInvitation.id}
                        loading={deleteLoading}
                    >
                        <Text>
                            Weet je zeker dat je de Uitnodiging wilt
                            verwijderen? Dit kan niet ongedaan worden.
                        </Text>
                    </DeleteDialog>

                    <Button colorScheme="body" onClick={onClose}>
                        Sluiten
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GuestInvitationModal;

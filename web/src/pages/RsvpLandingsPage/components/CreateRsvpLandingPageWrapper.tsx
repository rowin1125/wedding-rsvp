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

type CreateRsvpLandingPageWrapperProps = {
    disclosure?: ReturnType<typeof useDisclosure>;
    templateIsNotNone: boolean;
    isUpdate: boolean;
    children: React.ReactNode;
};

const CreateRsvpLandingPageWrapper = ({
    templateIsNotNone,
    disclosure,
    isUpdate,
    children,
}: CreateRsvpLandingPageWrapperProps) => {
    if (isUpdate) return children;

    return (
        <Modal
            isOpen={disclosure?.isOpen || false}
            onClose={disclosure?.onClose || (() => {})}
            size={templateIsNotNone ? 'full' : 'xl'}
        >
            <ModalOverlay />
            <ModalContent transition="all 0.3s ease">
                <ModalCloseButton />
                <ModalBody pb={8}>
                    <Heading mb={4} size="h3">
                        Nieuwe RSVP landingspagina
                    </Heading>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateRsvpLandingPageWrapper;

import React from 'react';

import {
    Button,
    Flex,
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { BiPhotoAlbum, BiPlus } from 'react-icons/bi';

import GalleryForm from '../GalleryForm';

const CreateNewGallery = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex mt={10} alignItems="center" flexDir="column">
            <Heading>Maak eerst een nieuw album aan: </Heading>
            <Flex my={10} justifyContent="center">
                <Button
                    variant="ghost"
                    h={{
                        base: '200px',
                        lg: '400px',
                    }}
                    w={{
                        base: '200px',
                        lg: '400px',
                    }}
                    borderColor="secondary.500"
                    borderStyle="dashed"
                    borderWidth="1px"
                    justifyContent="center"
                    onClick={onOpen}
                    alignItems="center"
                    transition="all 0.3s ease"
                    _hover={{
                        bg: 'primary.600',
                    }}
                    _active={{
                        bg: 'primary.800',
                    }}
                >
                    <Icon
                        as={BiPhotoAlbum}
                        fontSize={{ base: '75px', lg: '150px' }}
                        color="secondary.500"
                    />
                    <Icon
                        as={BiPlus}
                        fontSize={{ base: '75px', lg: '150px' }}
                        color="secondary.500"
                    />
                </Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody pb={8}>
                        <GalleryForm formType="create" onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default CreateNewGallery;

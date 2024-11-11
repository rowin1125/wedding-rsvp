import React from 'react';

import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

export const TiptapButtonComponent = ({
    node,
    updateAttributes,
    editor,
}: NodeViewProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const isEditable = editor.view.editable;

    const handleClickButton = () => {
        if (isEditable) {
            onOpen();
        } else {
            window.open(node.attrs.href, node.attrs.target);
        }
    };

    return (
        <NodeViewWrapper>
            <Button
                onClick={handleClickButton}
                color={node.attrs.textColor ?? 'white'}
                backgroundColor={node.attrs.buttonColor ?? 'secondary.500'}
            >
                {node.attrs.text || 'Klik hier'}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Wijzig button gegevens</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Tekst</FormLabel>
                            <Input
                                value={node.attrs.text}
                                onChange={(e) =>
                                    updateAttributes({ text: e.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input
                                value={node.attrs.href}
                                onChange={(e) =>
                                    updateAttributes({ href: e.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Checkbox
                                isChecked={node.attrs.target === '_blank'}
                                onChange={(e) =>
                                    updateAttributes({
                                        target: e.target.checked
                                            ? '_blank'
                                            : '_self',
                                    })
                                }
                            >
                                Open in nieuw tabblad
                            </Checkbox>
                        </FormControl>
                        <Flex mt={4} columnGap={4}>
                            {/* ButtonColor */}
                            <FormControl>
                                <FormLabel>Button kleur</FormLabel>
                                <Input
                                    type="color"
                                    value={node.attrs.buttonColor}
                                    onChange={(e) =>
                                        updateAttributes({
                                            buttonColor: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                            {/* TextColor */}
                            <FormControl>
                                <FormLabel>Tekst kleur</FormLabel>
                                <Input
                                    type="color"
                                    value={node.attrs.textColor}
                                    onChange={(e) =>
                                        updateAttributes({
                                            textColor: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Bevestig
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </NodeViewWrapper>
    );
};

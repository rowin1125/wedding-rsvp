import React from 'react';

import {
    useDisclosure,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

import { useDeleteAssets } from '../hooks/useDeleteAssets';

type DeleteAssetsDialogProps = {
    selectedAssets: string[];
    setSelectedAssets: (ids: string[]) => void;
    type: 'media' | 'gallery';
};

const DeleteAssetsDialog = ({
    selectedAssets,
    setSelectedAssets,
    type,
}: DeleteAssetsDialogProps) => {
    const { currentUser } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<null>(null);

    const isGallery = type === 'gallery';
    const { galleryId } = useParams();

    const { deleteAssets, loading } = useDeleteAssets({
        id: isGallery
            ? galleryId
            : currentUser?.wedding?.mediaLibrary?.id ?? '',
        type,
    });

    const handleDeleteSelectedFiles = async () => {
        if (selectedAssets.length === 0) return;

        await deleteAssets({
            variables: {
                ids: selectedAssets,
            },
        });
        setSelectedAssets([]);
        onClose();
    };

    return (
        <>
            <Button
                size="sm"
                fontSize="xs"
                fontWeight="semibold"
                variant="ghost"
                ml={2}
                colorScheme="red"
                onClick={onOpen}
                isLoading={loading}
            >
                Verwijderen
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Weet je het zeker?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Je staat op het punt om{' '}
                            <strong>{selectedAssets.length}</strong> bestand(en)
                            te verwijderen!
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Annuleer
                            </Button>
                            <Button
                                colorScheme="red"
                                isLoading={loading}
                                onClick={handleDeleteSelectedFiles}
                                ml={3}
                            >
                                Verwijder
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteAssetsDialog;

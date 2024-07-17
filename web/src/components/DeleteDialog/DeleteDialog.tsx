import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    ButtonProps,
    Heading,
    Icon,
    useDisclosure,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';

export type DeleteDialogType = {
    onDelete: (id: string) => Promise<void>;
    loading?: boolean;
    id: string;
    children: React.ReactNode;
    buttonVariant?: ButtonProps['variant'];
    title: string;
    buttonLabel?: string;
    buttonProps?: ButtonProps;
    deleteButtonLabel?: string;
};

const DeleteDialog = ({
    onDelete,
    loading,
    id,
    children,
    buttonVariant = 'solid',
    title,
    buttonLabel,
    buttonProps,
    deleteButtonLabel = 'Weg ermee',
}: DeleteDialogType) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);

    const handleDelete = () => {
        onDelete(id);
        onClose();
    };

    return (
        <>
            <Button
                colorScheme="red"
                onClick={onOpen}
                variant={buttonVariant}
                isLoading={loading}
                {...buttonProps}
            >
                <Icon as={BsTrash} mr={2} />

                {buttonLabel}
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <Heading>{title}</Heading>
                        </AlertDialogHeader>

                        <AlertDialogBody>{children}</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                variant="outline"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={4}
                                isLoading={loading}
                            >
                                {deleteButtonLabel}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteDialog;

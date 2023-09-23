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
    Text,
    TextProps,
    useDisclosure,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';

type DeleteDialogType = {
    onDelete: (id: string) => Promise<void>;
    loading?: boolean;
    id: string;
    children: React.ReactNode;
    buttonVariant?: ButtonProps['variant'];
    title: string;
    buttonLabel?: string;
    buttonProps?: ButtonProps;
    buttonLabelProps?: TextProps;
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
    buttonLabelProps,
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
                {...buttonProps}
                variant={buttonVariant}
            >
                <Icon as={BsTrash} />
                {buttonLabel && (
                    <Text color="white" ml={4} {...buttonLabelProps}>
                        {buttonLabel}
                    </Text>
                )}
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
                            <Button ref={cancelRef} onClick={onClose}>
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

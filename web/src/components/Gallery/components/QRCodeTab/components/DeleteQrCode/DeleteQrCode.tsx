import React from 'react';

import { Flex, FlexProps, Text } from '@chakra-ui/react';

import DeleteDialog, {
    DeleteDialogType,
} from 'src/components/DeleteDialog/DeleteDialog';

import { useDeleteQrCode } from './hooks/useDeleteQrCode';

type DeleteQrCodeProps = {
    wrapperProps?: FlexProps;
    id?: string | null;
} & Omit<Partial<DeleteDialogType>, 'id'>;

const DeleteQrCode = ({ id, wrapperProps, ...props }: DeleteQrCodeProps) => {
    const { deleteQrCode, loading } = useDeleteQrCode();

    if (!id) return null;

    return (
        <Flex
            justifyContent={{
                base: 'center',
                lg: 'flex-end',
            }}
            {...wrapperProps}
        >
            <DeleteDialog
                title="QR code verwijderen"
                buttonLabel="Verwijder QR code"
                buttonProps={{
                    colorScheme: 'tertiary',
                }}
                deleteButtonLabel="Verwijderen"
                onDelete={() => deleteQrCode(id)}
                id={id}
                loading={loading}
                {...props}
            >
                <Text>
                    Weet je zeker dat je de QR code wilt verwijderen? Dit kan
                    niet ongedaan worden gemaakt. Denk erom dat als je deze QR
                    code ergens hebt gedeeld, deze niet meer werkt.
                </Text>
            </DeleteDialog>
        </Flex>
    );
};

export default DeleteQrCode;

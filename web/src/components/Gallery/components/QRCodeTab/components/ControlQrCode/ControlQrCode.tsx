import React from 'react';

import { Button, Flex, FlexProps, Text } from '@chakra-ui/react';
import { FindGalleryQuery } from 'types/graphql';

import DeleteDialog, {
    DeleteDialogType,
} from 'src/components/DeleteDialog/DeleteDialog';

import { useDeleteQrCode } from './hooks/useDeleteQrCode';

type ControlQrCodeProps = {
    wrapperProps?: FlexProps;
    gallery?: FindGalleryQuery['gallery'];
    qrPreview?: string;
} & Omit<Partial<DeleteDialogType>, 'id'>;

const ControlQrCode = ({
    gallery,
    wrapperProps,
    qrPreview,
    ...props
}: ControlQrCodeProps) => {
    const qrId = gallery?.qrCodeId;
    const { deleteQrCode, loading } = useDeleteQrCode();

    const handleDownload = async () => {
        if (!qrPreview) return;

        const image = qrPreview;
        const a = document.createElement('a');
        a.href = image;
        a.download = `QR code - Album - ${gallery?.name}.png`;
        a.click();
    };

    if (!qrId) return null;

    return (
        <Flex
            mt={{ base: 8, lg: 0 }}
            justifyContent={{
                base: 'center',
                lg: 'flex-end',
            }}
            flexDir={{
                base: 'column',
                lg: 'row',
            }}
            {...wrapperProps}
        >
            <DeleteDialog
                title="QR code verwijderen"
                buttonLabel="Verwijder QR code"
                buttonProps={{
                    colorScheme: 'red',
                    variant: 'outline',
                    mr: { base: 0, lg: 4 },
                }}
                deleteButtonLabel="Verwijderen"
                onDelete={() => deleteQrCode(qrId)}
                id={qrId}
                loading={loading}
                {...props}
            >
                <Text>
                    Weet je zeker dat je de QR code wilt verwijderen? Dit kan
                    niet ongedaan worden gemaakt. Denk erom dat als je deze QR
                    code ergens hebt gedeeld, deze niet meer werkt.
                </Text>
            </DeleteDialog>
            <Button
                mt={{ base: 4, lg: 0 }}
                colorScheme="secondary"
                onClick={handleDownload}
            >
                QR code downloaden
            </Button>
        </Flex>
    );
};

export default ControlQrCode;

import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { useFindGallery } from '../../hooks/useFindGallery';

import DeleteQrCode from './components/DeleteQrCode/DeleteQrCode';
import QRCodeForm from './components/QRCodeForm/QRCodeForm';

const QRCodeTab = () => {
    const { gallery, loading } = useFindGallery();
    const hasQRCode = !!gallery?.qrCode && !!gallery.qrCodeId;

    return (
        <Box w="full">
            {!hasQRCode && <QRCodeForm formType="create" loading={loading} />}
            {hasQRCode && (
                <>
                    <QRCodeForm
                        formType="update"
                        qrCodeId={gallery.qrCodeId}
                        loading={loading}
                    />
                    <Flex
                        mt={{
                            base: 4,
                            lg: 0,
                        }}
                        justifyContent={{
                            base: 'center',
                            lg: 'flex-end',
                        }}
                    >
                        <DeleteQrCode id={gallery.qrCodeId} />
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default QRCodeTab;

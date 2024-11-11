import React from 'react';

import { Box } from '@chakra-ui/react';

import { useFindGallery } from '../../hooks/useFindGallery';

import GalleryQrCreateForm from './components/GalleryQrCreateForm';
import GalleryQrUpdateForm from './components/GalleryQrUpdateForm';

const QRCodeTab = () => {
    const { gallery, loading } = useFindGallery();
    const hasQRCode = !!gallery?.qrCode && !!gallery.qrCodeId && !loading;

    return (
        <Box w="full">
            {!hasQRCode && (
                <GalleryQrCreateForm formType="create" loading={loading} />
            )}
            {hasQRCode && (
                <GalleryQrUpdateForm
                    formType="update"
                    qrCodeId={gallery.qrCodeId}
                    gallery={gallery}
                    loading={loading}
                />
            )}
        </Box>
    );
};

export default QRCodeTab;

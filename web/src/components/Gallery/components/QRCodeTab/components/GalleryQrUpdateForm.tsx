import React from 'react';

import { FindGalleryQuery } from 'types/graphql';

import Loader from 'src/components/Loader';

import { useGalleryQRCodeForm } from './QRCodeForm/hooks/useGalleryQRCodeForm';
import QRCodeForm from './QRCodeForm/QRCodeForm';

type GalleryQrUpdateFormProps = {
    formType: 'create' | 'update';
    qrCodeId?: string | null;
    loading: boolean;
    gallery?: FindGalleryQuery['gallery'];
};

const GalleryQrUpdateForm = ({
    formType,
    loading,
    gallery,
    qrCodeId,
}: GalleryQrUpdateFormProps) => {
    const useQrForm = useGalleryQRCodeForm({
        formType,
        qrCodeId,
    });

    if (loading) return <Loader />;

    return (
        <QRCodeForm
            formType="update"
            loading={loading}
            name={gallery?.name}
            methods={useQrForm.methods}
            qrCode={useQrForm.qrCode}
            onSubmit={useQrForm.onSubmit}
            variant="GALLERY"
        />
    );
};

export default GalleryQrUpdateForm;

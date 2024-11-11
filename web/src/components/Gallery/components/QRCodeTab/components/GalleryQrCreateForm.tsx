import React from 'react';

import Loader from 'src/components/Loader';

import { useGalleryQRCodeForm } from './QRCodeForm/hooks/useGalleryQRCodeForm';
import QRCodeForm from './QRCodeForm/QRCodeForm';

type GalleryQrCreateFormProps = {
    formType: 'create' | 'update';
    qrCodeId?: string | null;
    loading: boolean;
};

const GalleryQrCreateForm = ({
    formType,
    loading,
}: GalleryQrCreateFormProps) => {
    const useQrForm = useGalleryQRCodeForm({
        formType,
    });

    if (loading) return <Loader />;

    return (
        <QRCodeForm
            formType="create"
            loading={loading}
            methods={useQrForm.methods}
            onSubmit={useQrForm.onSubmit}
            qrCode={useQrForm.qrCode}
            variant="GALLERY"
        />
    );
};

export default GalleryQrCreateForm;

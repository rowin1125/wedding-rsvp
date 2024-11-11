import React from 'react';

import QRCodeForm from 'src/components/Gallery/components/QRCodeTab/components/QRCodeForm/QRCodeForm';
import Loader from 'src/components/Loader';

import { useRsvpQRCodeForm } from '../hooks/useRsvpQRCodeForm';

type RsvpQrUpdateFormProps = {
    formType: 'create' | 'update';
    loading: boolean;
    name?: string;
    qrCodeId?: string | null;
};

const RsvpQrUpdateForm = ({
    formType,
    loading,
    name,
    qrCodeId,
}: RsvpQrUpdateFormProps) => {
    const useQrForm = useRsvpQRCodeForm({
        formType,
        qrCodeId,
    });

    if (loading) return <Loader />;

    return (
        <QRCodeForm
            formType="update"
            loading={loading}
            methods={useQrForm.methods}
            onSubmit={useQrForm.onSubmit}
            qrCode={useQrForm.qrCode}
            name={name}
            variant="RSVP"
        />
    );
};

export default RsvpQrUpdateForm;

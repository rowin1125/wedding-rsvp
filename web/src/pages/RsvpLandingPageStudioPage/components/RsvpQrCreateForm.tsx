import React from 'react';

import QRCodeForm from 'src/components/Gallery/components/QRCodeTab/components/QRCodeForm/QRCodeForm';
import Loader from 'src/components/Loader';

import { useRsvpQRCodeForm } from '../hooks/useRsvpQRCodeForm';

type RsvpQrCreateFormProps = {
    formType: 'create' | 'update';
    loading: boolean;
};

const RsvpQrCreateForm = ({ formType, loading }: RsvpQrCreateFormProps) => {
    const useQrForm = useRsvpQRCodeForm({
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
            variant="RSVP"
        />
    );
};

export default RsvpQrCreateForm;

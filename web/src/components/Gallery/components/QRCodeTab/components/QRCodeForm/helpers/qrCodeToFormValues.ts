import { FindQrCodeById } from 'types/graphql';
import { InferType } from 'yup';

import { QRValidationSchema } from '../QRCodeForm';

type QrCodeToFormValuesTypes = {
    qrCode: FindQrCodeById['qrCode'];
    redirectUrl: string;
};

export const qrCodeToFormValues = ({
    qrCode,
    redirectUrl,
}: QrCodeToFormValuesTypes): InferType<typeof QRValidationSchema> => {
    const transparentColor = '#0000';

    return {
        id: qrCode?.id ?? '',
        redirectUrl: qrCode?.redirectUrl ?? redirectUrl,
        hasExpireDate: qrCode?.expiresAt ? 'true' : 'false',
        expiresAt: qrCode?.expiresAt
            ? new Date(qrCode.expiresAt).toISOString().split('T')[0]
            : '',
        isActive: qrCode ? (qrCode?.isActive ? 'true' : 'false') : 'true',
        metadata: {
            scale: qrCode?.metadata?.scale ?? 10,
            margin: qrCode?.metadata?.margin ?? 1,
            color: {
                dark: {
                    isTransparent:
                        qrCode?.metadata?.color?.dark === transparentColor
                            ? 'true'
                            : 'false',
                    color:
                        qrCode?.metadata?.color?.dark === transparentColor
                            ? '#000000'
                            : qrCode?.metadata?.color?.dark ?? '#000000',
                },
                light: {
                    isTransparent: qrCode?.metadata?.color?.light
                        ? qrCode?.metadata?.color?.light === transparentColor
                            ? 'true'
                            : 'false'
                        : 'true',
                    color:
                        qrCode?.metadata?.color?.light === transparentColor
                            ? '#ffffff'
                            : qrCode?.metadata?.color?.light ?? '#ffffff',
                },
            },
        },
    };
};

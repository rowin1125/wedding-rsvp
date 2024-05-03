import { FindQrCodeById } from 'types/graphql';
import { InferType } from 'yup';

import { routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

import { validationSchema } from '../QRCodeForm';

type QrCodeToFormValuesTypes = {
    qrCode: FindQrCodeById['qrCode'];
    currentUser: ReturnType<typeof useAuth>['currentUser'];
    galleryId: string;
};

export const qrCodeToFormValues = ({
    currentUser,
    qrCode,
    galleryId,
}: QrCodeToFormValuesTypes): InferType<typeof validationSchema> => {
    const transparentColor = '#0000';

    return {
        id: qrCode?.id ?? '',
        redirectUrl:
            qrCode?.redirectUrl ??
            `${process.env.REDWOOD_ENV_VERCEL_URL}${routes.publicGallery({
                galleryId,
                weddingId: currentUser?.weddingId ?? '',
            })}`,
        hasExpireDate: qrCode?.expiresAt ? 'true' : 'false',
        expiresAt: qrCode?.expiresAt
            ? new Date(qrCode.expiresAt).toISOString().split('T')[0]
            : '',
        isActive: qrCode ? (qrCode?.isActive ? 'true' : 'false') : 'true',
        metadata: {
            scale: qrCode?.metadata?.scale ?? 10,
            margin: qrCode?.metadata?.margin ?? 1,
            version: qrCode?.metadata?.version ?? 5,
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
                    isTransparent:
                        qrCode?.metadata?.color?.light === transparentColor
                            ? 'true'
                            : 'false',
                    color:
                        qrCode?.metadata?.color?.light === transparentColor
                            ? '#ffffff'
                            : qrCode?.metadata?.color?.light ?? '#ffffff',
                },
            },
        },
    };
};

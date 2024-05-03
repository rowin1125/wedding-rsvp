import React from 'react';

import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { FindQrCodeById } from 'types/graphql';

import { getQrCodeExpireInfo } from '../helpers/getQrCodeExpireInfo';

type QrFormAlertProps = {
    formType: 'create' | 'update';
    qrCode?: FindQrCodeById['qrCode'];
};

const QrFormAlert = ({ formType, qrCode }: QrFormAlertProps) => {
    const qrCodeIsActive = qrCode?.isActive;

    const { isExpired, isWithinExpireRange } = getQrCodeExpireInfo(qrCode, {
        expiredExceptedRange: 14,
    });

    return (
        <>
            {formType === 'create' && (
                <Alert status="warning" mb={4}>
                    <AlertIcon />
                    Maak een QR code aan om gasten fotos te laten uploaden.
                </Alert>
            )}
            {formType === 'update' && qrCodeIsActive === true && (
                <Alert status="success" mb={4}>
                    <AlertIcon />
                    Deze QR code is actief en kan worden gescand.
                </Alert>
            )}
            {formType === 'update' && qrCodeIsActive === false && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    Deze QR code is niet actief en kan niet worden gescand. Maak
                    de QR code actief om deze te kunnen scannen.
                </Alert>
            )}
            {(isExpired || isWithinExpireRange) && (
                <Box>
                    {isExpired && (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            Deze QR code is verlopen. Verleng de datum of maak
                            een nieuwe QR code aan.
                        </Alert>
                    )}
                    {isWithinExpireRange && !isExpired && (
                        <Alert status="warning" mb={4}>
                            <AlertIcon />
                            Deze QR code verloopt binnenkort. Verleng de QR code
                            indien nodig. Indien je dit niet doet, kunnen gasten
                            geen fotos meer uploaden.
                        </Alert>
                    )}
                </Box>
            )}
        </>
    );
};

export default QrFormAlert;

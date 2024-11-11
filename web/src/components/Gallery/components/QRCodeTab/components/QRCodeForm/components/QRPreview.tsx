import React from 'react';

import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { QrCodeVariants } from 'types/graphql';
import { InferType } from 'yup';

import CustomChakraFade from 'src/components/CustomChakraFade';
import Loader from 'src/components/Loader';

import ControlQrCode from '../../ControlQrCode/ControlQrCode';
import { useQRCodePreview } from '../hooks/useQRCodePreview';
import { QRValidationSchema } from '../QRCodeForm';

type QRPreviewProps = {
    loading: boolean;
    formType: 'create' | 'update';
    name?: string;
    qrCodeId?: string | null;
    variant: QrCodeVariants;
};

const QRPreview = ({
    loading,
    formType,
    name,
    qrCodeId,
    variant,
}: QRPreviewProps) => {
    const { watch, formState } =
        useFormContext<InferType<typeof QRValidationSchema>>();
    const values = watch();
    const isDirty = formState.isDirty;
    const { qrCode } = useQRCodePreview(values);

    const qrIsExample = formType === 'create' || isDirty;

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            flexDir="column"
            h="full"
        >
            <Box>
                <Heading as="h2" textAlign="center">
                    {qrIsExample ? 'Voorbeeld QR code' : 'QR code'}
                </Heading>
                <CustomChakraFade in={loading}>
                    <Loader />
                </CustomChakraFade>
                <CustomChakraFade in={!loading}>
                    {qrCode && (
                        <Image
                            transition="all 0.2s ease-in-out"
                            mt={10}
                            shadow="xl"
                            src={qrCode}
                            alt={`QR code - Album - ${name}.png`}
                            title={`QR code - Album - ${name}.png`}
                        />
                    )}
                </CustomChakraFade>
            </Box>
            <ControlQrCode
                name={name}
                qrPreview={qrCode}
                qrCodeId={qrCodeId}
                variant={variant}
            />
        </Flex>
    );
};

export default QRPreview;

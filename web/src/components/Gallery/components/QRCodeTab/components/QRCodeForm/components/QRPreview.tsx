import React from 'react';

import { Flex, Heading, Image } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { InferType } from 'yup';

import CustomChakraFade from 'src/components/CustomChakraFade';
import Loader from 'src/components/Loader';

import { useQRCodePreview } from '../hooks/useQRCodePreview';
import { validationSchema } from '../QRCodeForm';

type QRPreviewProps = {
    loading: boolean;
    formType: 'create' | 'update';
};

const QRPreview = ({ loading, formType }: QRPreviewProps) => {
    const { watch, formState } =
        useFormContext<InferType<typeof validationSchema>>();
    const values = watch();
    const isDirty = formState.isDirty;
    const { qrCode } = useQRCodePreview(values);

    const qrIsExample = formType === 'create' || isDirty;

    return (
        <Flex justifyContent="center" alignItems="center" flexDir="column">
            <Heading as="h2">
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
                        src={qrCode}
                        alt="QR Code"
                    />
                )}
            </CustomChakraFade>
        </Flex>
    );
};

export default QRPreview;

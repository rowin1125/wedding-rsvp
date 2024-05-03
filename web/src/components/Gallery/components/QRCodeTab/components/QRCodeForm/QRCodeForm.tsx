import React from 'react';

import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { number, object, string } from 'yup';

import Loader from 'src/components/Loader';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SliderControl from 'src/components/react-hook-form/components/SliderControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import SwitchControl from 'src/components/react-hook-form/components/SwitchControl';

import QrFormAlert from './components/QrFormAlert';
import QRPreview from './components/QRPreview';
import RedirectInput from './components/RedirectInput';
import { useQRCodeForm } from './hooks/useQRCodeForm';

type QRCodeFormProps = {
    formType: 'create' | 'update';
    qrCodeId?: string | null;
    loading: boolean;
};

export const validationSchema = object({
    id: string(),
    redirectUrl: string().required('Redirect URL is required'),
    isActive: string().required('Verplicht veld').oneOf(['true', 'false']),
    hasExpireDate: string().required('Verplicht veld').oneOf(['true', 'false']),
    expiresAt: string().when('hasExpireDate', {
        is: (hasExpireDate: string) => hasExpireDate === 'true',
        then: (schema) => schema.required('Verplicht veld'),
    }),
    metadata: object({
        scale: number(),
        margin: number(),
        version: number(),
        color: object({
            dark: object({
                isTransparent: string()
                    .required('Verplicht veld')
                    .oneOf(['true', 'false']),
                color: string().required(),
            }),
            light: object({
                isTransparent: string()
                    .required('Verplicht veld')
                    .oneOf(['true', 'false']),
                color: string().required(),
            }),
        }),
    }),
});

const QRCodeForm = ({
    formType,
    qrCodeId,
    loading: galleryLoading = false,
}: QRCodeFormProps) => {
    const {
        qrCode,
        updateGalleryMutationData,
        qrCodeLoading,
        loading: qrCodeFormLoading,
        methods,
        onSubmit,
    } = useQRCodeForm({
        formType,
        qrCodeId,
    });

    const loading =
        qrCodeFormLoading || updateGalleryMutationData.loading || qrCodeLoading;
    const waitForQrCode = formType === 'update' && !qrCode;

    const hasExpireDate = methods.watch('hasExpireDate');
    const darkIsTransparent = methods.watch(
        'metadata.color.dark.isTransparent'
    );
    const lightIsTransparent = methods.watch(
        'metadata.color.light.isTransparent'
    );

    if (galleryLoading || waitForQrCode) return <Loader />;

    return (
        <Box mt={4}>
            <QrFormAlert formType={formType} qrCode={qrCode} />
            {formType === 'create' ? (
                <Heading as="h2">QR code aanmaken</Heading>
            ) : (
                <Heading as="h2">QR code bewerken</Heading>
            )}
            <FormProvider {...methods}>
                <Grid
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={8}
                    w="full"
                    mt={6}
                >
                    <GridItem colSpan={{ base: 12, lg: 4 }}>
                        <VStack
                            as="form"
                            onSubmit={methods.handleSubmit(onSubmit)}
                            align="start"
                            spacing={5}
                            w="full"
                        >
                            <Text fontWeight="semibold" fontSize="xl">
                                Algemene instellingen
                            </Text>
                            <SwitchControl name="isActive" label="Is actief?" />
                            <RedirectInput />
                            <SwitchControl
                                name="hasExpireDate"
                                label="Heeft vervaldatum?"
                            />
                            {hasExpireDate === 'true' && (
                                <InputControl
                                    name="expiresAt"
                                    isRequired={hasExpireDate === 'true'}
                                    label="Verloopt op"
                                    inputProps={{
                                        type: 'date',
                                    }}
                                />
                            )}
                            <Box as="hr" w="full" />
                            <Text fontWeight="semibold" fontSize="xl">
                                QR uiterlijk
                            </Text>
                            <Flex w="full" justifyContent="space-between">
                                <Box w={'48%'}>
                                    <InputControl
                                        name="metadata.color.dark.color"
                                        label="QR Code kleur"
                                        isDisabled={
                                            darkIsTransparent === 'true'
                                        }
                                        inputProps={{
                                            type: 'color',
                                        }}
                                    />
                                    <SwitchControl
                                        mt={4}
                                        name="metadata.color.dark.isTransparent"
                                        label="Transparant?"
                                    />
                                </Box>
                                <Box w={'48%'}>
                                    <InputControl
                                        name="metadata.color.light.color"
                                        label="Achtergrondkleur"
                                        isDisabled={
                                            lightIsTransparent === 'true'
                                        }
                                        inputProps={{
                                            type: 'color',
                                        }}
                                    />
                                    <SwitchControl
                                        mt={4}
                                        ml={4}
                                        name="metadata.color.light.isTransparent"
                                        label="Transparant?"
                                    />
                                </Box>
                            </Flex>
                            <SliderControl
                                name="metadata.scale"
                                label="Formaat"
                                sliderProps={{
                                    min: 3,
                                    max: 12,
                                }}
                            />
                            <SliderControl
                                name="metadata.margin"
                                label="Dikte van de rand"
                                sliderProps={{
                                    min: 0,
                                    max: 4,
                                }}
                            />
                            <SliderControl
                                name="metadata.version"
                                label="QR complexiteit"
                                sliderProps={{
                                    min: 4,
                                    max: 10,
                                }}
                            />

                            <Flex
                                alignItems="center"
                                justifyContent="flex-end"
                                w="full"
                            >
                                <SubmitButton
                                    colorScheme="secondary"
                                    isLoading={loading}
                                    isDisabled={loading}
                                >
                                    {formType === 'create'
                                        ? 'Aanmaken'
                                        : 'Bewerken'}
                                </SubmitButton>
                            </Flex>
                        </VStack>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, lg: 8 }}>
                        <QRPreview
                            loading={waitForQrCode}
                            formType={formType}
                        />
                    </GridItem>
                </Grid>
            </FormProvider>
        </Box>
    );
};

export default QRCodeForm;

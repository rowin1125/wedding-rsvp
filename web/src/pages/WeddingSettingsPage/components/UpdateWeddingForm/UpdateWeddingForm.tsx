import React from 'react';

import { Heading, Flex, Box, Text, VStack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { InferType, number, object, string } from 'yup';

import { Metadata } from '@redwoodjs/web';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectAssetControl from 'src/components/react-hook-form/components/SelectAssetControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import { useDeleteWeddingById } from './hooks/useDeleteWeddingById';
import { useUpdateWedding } from './hooks/useUpdateWedding';

const UpdateWeddingForm = () => {
    const { wedding, loading: weddingLoading } = useGetWeddingById();
    const { updateWedding, loading: updateWeddingLoading } = useUpdateWedding();
    const { deleteWeddingById, loading } = useDeleteWeddingById();
    const toast = useToast();

    const initialDate = new Date(wedding?.date || new Date())
        .toISOString()
        .split('T')[0];

    const validationSchema = object({
        name: string().required('Naam is verplicht'),
        date: string().required('Datum is verplicht'),
        dayInvitationAmount: string()
            .required('Aantal is verplicht')
            .test(
                'isNumeric',
                'Getal mag geen tekst bevatten',
                (value) => !isNaN(Number(value))
            ),
        eveningInvitationAmount: string()
            .required('Aantal is verplicht')
            .test(
                'isNumeric',
                'Naam mag geen tekst bevatten',
                (value) => !isNaN(Number(value))
            ),
        bannerImage: object({
            id: string(),
            focalPoint: object({
                x: number(),
                y: number(),
            }),
        }),
    });

    const initialValues = {
        name: wedding?.name || '',
        date: initialDate || new Date().toISOString().split('T')[0],
        dayInvitationAmount: String(wedding?.dayInvitationAmount) || '0',
        eveningInvitationAmount:
            String(wedding?.eveningInvitationAmount) || '0',
        bannerImage: {
            id: wedding?.bannerImage?.asset.id || '',
            focalPoint: {
                x: wedding?.bannerImage?.metadata?.focalPoint?.x || 50,
                y: wedding?.bannerImage?.metadata?.focalPoint?.y || 50,
            },
        },
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    const formHasChanged = methods.formState.isDirty;

    if (weddingLoading || !wedding) return null;

    const onSubmit = async (values: InferType<typeof validationSchema>) => {
        try {
            await updateWedding({
                variables: {
                    id: wedding.id,
                    input: {
                        date: new Date(values.date).toISOString(),
                        name: values.name,
                        dayInvitationAmount: Number(values.dayInvitationAmount),
                        eveningInvitationAmount: Number(
                            values.eveningInvitationAmount
                        ),
                        bannerImageId: values.bannerImage.id || null,
                        bannerImageMetadata: values.bannerImage.id
                            ? {
                                  focalPoint: {
                                      x: values.bannerImage.focalPoint.x,
                                      y: values.bannerImage.focalPoint.y,
                                  },
                              }
                            : {},
                    },
                },
            });
            toast({
                title: 'Bruiloft aangepast',
                status: 'success',
            });
            methods.reset(values);
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Er is iets fout gegaan',
                    description: error.message,
                    status: 'error',
                });
            }
        }
    };

    return (
        <>
            <Box w={{ base: 'full', lg: '400px' }}>
                <Metadata
                    title="Bruiloft aanmaken"
                    description="Bruiloft aanmaken pagina"
                />
                <Heading>Update de bruiloft</Heading>
                <FormProvider {...methods}>
                    <VStack
                        as="form"
                        onSubmit={methods.handleSubmit(onSubmit)}
                        align="start"
                        spacing={5}
                    >
                        <InputControl
                            name="name"
                            label="Naam bruiloft"
                            inputProps={{
                                placeholder: 'Naam',
                            }}
                        />
                        <InputControl
                            name="date"
                            label="Datum bruiloft"
                            inputProps={{
                                type: 'date',
                            }}
                        />

                        <InputControl
                            name="dayInvitationAmount"
                            label="Geschatte aantal dag gasten"
                            inputProps={{
                                placeholder: 'Bijv. 22',
                                type: 'number',
                            }}
                        />
                        <InputControl
                            name="eveningInvitationAmount"
                            label="Geschatte aantal avond gasten"
                            inputProps={{
                                placeholder: 'Bijv. 22',
                                type: 'number',
                            }}
                        />
                        <SelectAssetControl name="bannerImage" />

                        <Flex justifyContent="flex-end" w="full">
                            <SubmitButton
                                colorScheme="secondary"
                                isLoading={updateWeddingLoading}
                                isDisabled={
                                    updateWeddingLoading || !formHasChanged
                                }
                            >
                                Update bruiloft
                            </SubmitButton>
                        </Flex>
                    </VStack>
                </FormProvider>
            </Box>
            <Box mt={10}>
                <Box
                    borderColor="red.500"
                    borderWidth="2px"
                    borderRadius="lg"
                    p={4}
                    w={{ base: 'full', lg: '40%' }}
                >
                    <Heading as="h3" size="md" color="red.500">
                        Danger-zone
                    </Heading>
                    <Text mt={4}>
                        Hier kun je jouw bruiloft verwijderen. Alle
                        bijbehoorende data wordt ook verwijderd en kan niet meer
                        teruggehaald worden.
                    </Text>
                    {wedding && (
                        <DeleteDialog
                            onDelete={deleteWeddingById}
                            title="Verwijder bruiloft"
                            buttonLabel="Verwijder bruiloft"
                            buttonProps={{ ml: 0, mt: 4 }}
                            id={wedding.id}
                            loading={loading}
                        >
                            <Text>
                                Weet je zeker dat je de bruiloft wilt
                                verwijderen? Dit kan niet ongedaan worden.
                            </Text>
                        </DeleteDialog>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default UpdateWeddingForm;

import React, { useMemo } from 'react';

import { Box, Flex, Heading, useToast, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import { Metadata } from '@redwoodjs/web';

import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

import { useCreateWedding } from './hooks/useCreateWedding';

const CreateWeddingForm = () => {
    const { createWedding, loading } = useCreateWedding();
    const toast = useToast();
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
    });

    const initialDate = useMemo(() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 3);

        return date.toISOString().split('T')[0];
    }, []);

    const initialValues = {
        name: 'Demi & Rowin',
        date: initialDate,
        dayInvitationAmount: '0',
        eveningInvitationAmount: '0',
    };

    const onSubmit = async (values: InferType<typeof validationSchema>) => {
        try {
            await createWedding({
                variables: {
                    input: {
                        name: values.name,
                        date: new Date(values.date).toISOString(),
                        dayInvitationAmount: Number(values.dayInvitationAmount),
                        eveningInvitationAmount: Number(
                            values.eveningInvitationAmount
                        ),
                    },
                },
            });
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

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    return (
        <Box
            maxW={{
                lg: '400px',
            }}
        >
            <Metadata
                title="Bruiloft aanmaken"
                description="Bruiloft aanmaken pagina"
            />
            <Heading>Maak eerst een bruiloft aan!</Heading>
            <FormProvider {...methods}>
                <VStack
                    as="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    align="start"
                    spacing={4}
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

                    <Flex justifyContent="flex-end" w="full">
                        <SubmitButton
                            colorScheme="secondary"
                            isLoading={loading}
                            isDisabled={loading}
                        >
                            Maak bruiloft aan
                        </SubmitButton>
                    </Flex>
                </VStack>
            </FormProvider>
        </Box>
    );
};

export default CreateWeddingForm;

import React from 'react';

import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { CreateWeddingMutationVariables } from 'types/graphql';
import { number, object, string } from 'yup';

import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import ControlledInput from 'src/components/forms/components/ControlledInput';

import { useCreateWedding } from './hooks/useCreateWedding';

const CreateWeddingForm = () => {
    const { createWedding, loading } = useCreateWedding();
    const validationSchema = object({
        name: string().required('Naam is verplicht'),
        date: string().required('Datum is verplicht'),
        dayInvitationAmount: number().required('Aantal is verplicht'),
        eveningInvitationAmount: number().required('Aantal is verplicht'),
    });

    const initialValues = {
        name: 'Demi & Rowin',
        date: '2024-05-16',
        dayInvitationAmount: 0,
        eveningInvitationAmount: 0,
    };

    const onSubmit = async (
        values: CreateWeddingMutationVariables['input']
    ) => {
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
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <Box
            maxW={{
                lg: '30%',
            }}
        >
            <MetaTags
                title="Bruiloft aanmaken"
                description="Bruiloft aanmaken pagina"
            />
            <Heading>Maak eerst een bruiloft aan!</Heading>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Box as={Form}>
                    <ControlledInput
                        id="name"
                        label="Naam bruiloft"
                        placeholder="Naam"
                    />
                    <ControlledInput
                        id="date"
                        label="Datum bruiloft"
                        placeholder="Datum"
                        type="date"
                    />
                    <ControlledInput
                        id="dayInvitationAmount"
                        label="Geschatte aantal dag gasten"
                        placeholder="Bijv. 22"
                    />
                    <ControlledInput
                        id="eveningInvitationAmount"
                        label="Geschatte aantal avond gasten"
                        placeholder="Bijv. 22"
                    />
                    <Flex justifyContent="flex-end">
                        <Button
                            colorScheme="body"
                            type="submit"
                            mt={4}
                            isDisabled={loading}
                            isLoading={loading}
                        >
                            Versturen
                        </Button>
                    </Flex>
                </Box>
            </Formik>
        </Box>
    );
};

export default CreateWeddingForm;

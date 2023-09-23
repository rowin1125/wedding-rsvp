import React from 'react';

import { Heading, Flex, Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { number, object, string } from 'yup';

import { navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import ControlledInput from 'src/components/forms/components/ControlledInput';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import { useUpdateWedding } from './hooks/useUpdateWedding';

const UpdateWeddingForm = () => {
    const { wedding, loading: weddingLoading } = useGetWeddingById();
    const { updateWedding, loading: updateWeddingLoading } = useUpdateWedding();
    const validationSchema = object({
        name: string().required('Naam is verplicht'),
        date: string().required('Datum is verplicht'),
        dayInvitationAmount: number().required('Aantal is verplicht'),
        eveningInvitationAmount: number().required('Aantal is verplicht'),
    });

    if (weddingLoading || !wedding) return null;

    const initialDate = new Date(wedding.date).toISOString().split('T')[0];

    const initialValues = {
        name: wedding.name,
        date: initialDate,
        dayInvitationAmount: wedding.dayInvitationAmount,
        eveningInvitationAmount: wedding.eveningInvitationAmount,
    };

    const onSubmit = async (values: typeof initialValues) => {
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
                    },
                },
            });
            toast.success('Bruiloft aangepast!');
            navigate(routes.dashboard());
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
            <Heading>Update de bruiloft</Heading>
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
                            isDisabled={updateWeddingLoading}
                            isLoading={updateWeddingLoading}
                        >
                            Versturen
                        </Button>
                    </Flex>
                </Box>
            </Formik>
        </Box>
    );
};

export default UpdateWeddingForm;

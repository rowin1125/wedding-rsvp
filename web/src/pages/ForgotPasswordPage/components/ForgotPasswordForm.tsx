import React, { useEffect, useRef } from 'react';

import { VStack, Heading, ButtonGroup, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'yup';

import { Link, navigate, routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton/SubmitButton';

const validationSchema = object({
    email: string().email('Geen geldig emailadres').required('Verplicht veld'),
});

const defaultValues = {
    email: '',
};

const ForgetPasswordForm = () => {
    const { forgotPassword, loading } = useAuth();
    const emailRef = useRef<HTMLInputElement>(null);

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: Record<string, string>) => {
        const response = await forgotPassword(data.email);

        if (response.error) {
            toast.error(response.error);
        } else {
            // The function `forgotPassword.handler` in api/src/functions/auth.js has
            // been invoked, let the user know how to get the link to reset their
            // password (sent in email, perhaps?)
            toast.success(
                `Er is een mail gestuurd naar ${response.email} met instructies om je wachtwoord te herstellen`
            );
            navigate(routes.login());
        }
    };

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return (
        <FormProvider {...methods}>
            <VStack
                as="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                align="start"
                spacing={5}
            >
                <Heading as="h2" size="h1">
                    Wachtwoord vergeten
                </Heading>
                <InputControl
                    name="email"
                    label="Email"
                    inputProps={{
                        placeholder: 'jouw-naam@gmail.com',
                    }}
                />

                <ButtonGroup
                    alignItems="center"
                    justifyContent="flex-end"
                    w="full"
                >
                    <Button
                        colorScheme="secondary"
                        variant="outline"
                        as={Link}
                        to={routes.login()}
                    >
                        Terug
                    </Button>
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        Herstel wachtwoord
                    </SubmitButton>
                </ButtonGroup>
            </VStack>
        </FormProvider>
    );
};

export default ForgetPasswordForm;

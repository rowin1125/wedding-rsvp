import React, { useState } from 'react';

import { VStack, Heading, Flex, Text, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'yup';

import { routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton/SubmitButton';
import RedwoodLink from 'src/components/RedwoodLink';

import ResendVerificationMail from './ResendVerificationMail';

const validationSchema = object({
    email: string()
        .email('Geen geldig emailadres')
        .required('Email is verplicht'),
    password: string()
        .min(6, 'Wachtwoord moet minimaal 6 karakters bevatten')
        .required('Wachtwoord is verplicht'),
});

const defaultValues = {
    email: '',
    password: '',
};

const LoginForm = () => {
    const { logIn, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [showResendButton, setShowResendButton] = useState(false);
    const toast = useToast();

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: Record<string, string>) => {
        const response = await logIn({
            username: data.email,
            password: data.password,
        });

        if (response.message) {
            toast({
                title: response.message,
            });
        } else if (response.error) {
            if ((response.error as string).includes('Valideer')) {
                setEmail(data.email);
                setShowResendButton(true);

                toast({
                    title: 'Valideer je account',
                    description: 'Je account is nog niet gevalideerd',
                    status: 'warning',
                });
                return;
            }
            toast({
                title: 'Er is iets fout gegaan',
                description: response.error,
                status: 'error',
            });
        } else {
            // user is signed in automatically
            toast({
                title: 'Welkom!',
                description: 'Je bent ingelogd',
                status: 'success',
            });
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <VStack
                    as="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    align="start"
                    spacing={5}
                >
                    <Heading as="h2" size="h1">
                        Login
                    </Heading>

                    <InputControl
                        name="email"
                        label="Email"
                        inputProps={{
                            placeholder: 'jouw-naam@gmail.com',
                        }}
                    />
                    <InputControl
                        name="password"
                        label="Wachtwoord"
                        inputProps={{
                            type: 'password',
                            placeholder: '********',
                        }}
                    />
                    <Flex
                        alignItems="center"
                        justifyContent="flex-end"
                        mt={0}
                        w="full"
                    >
                        <RedwoodLink
                            to={routes.forgotPassword()}
                            fontSize="sm"
                            color="secondary.400"
                        >
                            Wachtwoord vergeten?
                        </RedwoodLink>
                    </Flex>
                    <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        w="full"
                    >
                        <SubmitButton
                            colorScheme="secondary"
                            isLoading={loading}
                            isDisabled={loading}
                        >
                            Login
                        </SubmitButton>
                        <Text fontSize="sm">
                            Heb je nog geen account?{' '}
                            <RedwoodLink
                                fontSize="inherit"
                                to={routes.signup()}
                                textDecor="underline"
                            >
                                Aanmelden
                            </RedwoodLink>
                        </Text>
                    </Flex>
                </VStack>
            </FormProvider>
            <ResendVerificationMail
                showResendButton={showResendButton}
                setShowResendButton={setShowResendButton}
                email={email}
            />
        </>
    );
};

export default LoginForm;

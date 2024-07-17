import React from 'react';

import { VStack, Heading, Flex, Text, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'yup';

import { navigate, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton/SubmitButton';
import RedwoodLink from 'src/components/RedwoodLink';

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

const SignupForm = () => {
    const { signUp, loading } = useAuth();
    const toast = useToast();

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: Record<string, string>) => {
        const response = await signUp({
            username: data.email,
            password: data.password,
        });

        if (response.message) {
            methods.reset(defaultValues);
            toast({
                title: response.message,
            });
            navigate(routes.login());
        } else if (response.error) {
            toast({
                title: 'Er is iets fout gegaan',
                description: response.error,
                status: 'error',
            });
        } else {
            // user is signed in automatically
            toast({
                title: 'Welkom!',
                description: 'Je bent nu ingelogd',
                status: 'success',
            });
        }
    };

    return (
        <FormProvider {...methods}>
            <VStack
                as="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                align="start"
                spacing={5}
            >
                <Heading as="h2" size="h1">
                    Aanmelden
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
                    justifyContent="space-between"
                    w="full"
                >
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        Aanmelden
                    </SubmitButton>
                    <Text fontSize="sm">
                        Heb je a een account?{' '}
                        <RedwoodLink
                            fontSize="inherit"
                            to={routes.login()}
                            textDecor="underline"
                        >
                            Login
                        </RedwoodLink>
                    </Text>
                </Flex>
            </VStack>
        </FormProvider>
    );
};

export default SignupForm;

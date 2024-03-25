import React, { useEffect, useRef } from 'react';

import { VStack, Heading, Flex, Text } from '@chakra-ui/react';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm, FormProvider } from 'react-hook-form';
import { email, minLength, object, string } from 'valibot';

import { routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton/SubmitButton';
import RedwoodLink from 'src/components/RedwoodLink';

const validationSchema = object({
    email: string('Email is verplicht', [email('Email is niet geldig')]),
    password: string('Wachtwoord is verplicht', [
        minLength(6, 'Wachtwoord moet minimaal 6 karakters bevatten'),
    ]),
});

const defaultValues = {
    email: '',
    password: '',
};

const SignupForm = () => {
    const { signUp, loading } = useAuth();
    const emailRef = useRef<HTMLInputElement>(null);

    const methods = useForm({
        resolver: valibotResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: Record<string, string>) => {
        const response = await signUp({
            username: data.email,
            password: data.password,
        });

        if (response.message) {
            toast(response.message);
        } else if (response.error) {
            toast.error(response.error);
        } else {
            // user is signed in automatically
            toast.success('Welkom!');
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

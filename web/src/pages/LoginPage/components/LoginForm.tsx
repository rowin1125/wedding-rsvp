import React from 'react';

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

const LoginForm = () => {
    const { logIn, loading } = useAuth();

    const methods = useForm({
        resolver: valibotResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: Record<string, string>) => {
        const response = await logIn({
            username: data.email,
            password: data.password,
        });

        if (response.message) {
            toast(response.message);
        } else if (response.error) {
            toast.error(response.error);
        } else {
            // user is signed in automatically
            toast.success('Welcome!');
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
    );
};

export default LoginForm;

import React from 'react';

import {
    VStack,
    Heading,
    ButtonGroup,
    Button,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'yup';

import { Link, navigate, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton/SubmitButton';

const validationSchema = object({
    password: string()
        .min(6, 'Wachtwoord moet minimaal 6 karakters bevatten')
        .required('Wachtwoord is verplicht'),
});

const defaultValues = {
    password: '',
};

type ResetPasswordForm = {
    resetToken: string;
    enabled: boolean;
};

const ResetPasswordForm = ({ resetToken, enabled }: ResetPasswordForm) => {
    const { resetPassword, loading, reauthenticate } = useAuth();
    const toast = useToast();

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: Record<string, string>) => {
        const response = await resetPassword({
            resetToken,
            password: data.password,
        });

        if (response.error) {
            toast({
                title: 'Er is iets fout gegaan',
                description: response.error,
                status: 'error',
            });
        } else {
            toast({
                title: 'Gelukt!',
                description: 'Je wachtwoord is veranderd',
                status: 'success',
            });
            await reauthenticate();
            navigate(routes.login());
        }
    };

    return (
        <FormProvider {...methods}>
            <VStack
                as="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                align="start"
            >
                <Flex flexDir="column" as="fieldset" disabled={enabled} gap={5}>
                    <Heading as="h2" size="h1">
                        Wachtwoord herstellen
                    </Heading>
                    <InputControl
                        name="password"
                        label="Wachtwoord"
                        inputProps={{
                            placeholder: '**********',
                            type: 'password',
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
                </Flex>
            </VStack>
        </FormProvider>
    );
};

export default ResetPasswordForm;

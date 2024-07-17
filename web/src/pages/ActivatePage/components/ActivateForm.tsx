/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Box, Heading, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import {
    ActivateUserMutation,
    ActivateUserMutationVariables,
} from 'types/graphql';
import * as Yup from 'yup';

import { navigate, routes, useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

const ACTIVATE_USER = gql`
    mutation ActivateUserMutation($input: ActivateUserInput!) {
        activateUser(input: $input) {
            id
            email
        }
    }
`;

const ActivateForm = () => {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const { logIn, currentUser } = useAuth();
    const { verifiedToken, email } = useParams();
    const decodedEmail = decodeURI(email);
    const toast = useToast();

    const [activate, { loading }] = useMutation<
        ActivateUserMutation,
        ActivateUserMutationVariables
    >(ACTIVATE_USER);

    const onSubmit = async (data: Yup.InferType<typeof validationSchema>) => {
        try {
            setLoadingLogin(true);
            const result = await logIn({
                username: decodedEmail,
                password: data.password,
            });

            if ((result.error as string).includes('Incorrect password')) {
                toast({
                    title: 'Wachtwoord is incorrect!',
                    status: 'error',
                });
                setLoadingLogin(false);
                return;
            }

            // Workaround for making sure the password is correct before activating someone
            if ((result.error as string).includes('Valideer')) {
                await activate({
                    variables: { input: { ...data, verifiedToken } },
                });

                await logIn({
                    username: decodedEmail,
                    password: data.password,
                }).finally(() => {
                    navigate(routes.dashboard());
                });
                toast({
                    title: 'Account actief!',
                    status: 'success',
                });
            }

            setLoadingLogin(false);
        } catch (error: any) {
            toast({
                title: error?.message,
                status: 'error',
            });
        }
    };

    useEffect(() => {
        if (currentUser?.verified) navigate(routes.dashboard());
    }, [currentUser]);

    useEffect(() => {
        if (!verifiedToken || !email) {
            navigate(routes.login());
            toast({
                title: 'Invalide verifiedToken of email',
                status: 'error',
            });
        }
    }, [verifiedToken, email]);

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
    });

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { password: '' },
        mode: 'onBlur',
    });

    return (
        <FormProvider {...methods}>
            <Box as={'form'} w="full" onSubmit={methods.handleSubmit(onSubmit)}>
                <Heading>Even dubbelchecken!</Heading>
                <InputControl
                    name="password"
                    label="Bevestig je wachtwoord en activeer je account"
                    inputProps={{
                        placeholder: 'Jouw super geheime wachtwoord',
                        type: 'password',
                    }}
                />

                <SubmitButton
                    colorScheme="secondary"
                    isLoading={loading || loadingLogin}
                    isDisabled={loading}
                    mt={4}
                >
                    Activeer
                </SubmitButton>
            </Box>
        </FormProvider>
    );
};

export default ActivateForm;

import React from 'react';

import { Box, ButtonGroup, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

export const passwordValidationSchema = object().shape({
    password: string().required('Wachtwoord is verplicht'),
});

type RsvpPasswordFormProps = {
    onSubmit: (data: InferType<typeof passwordValidationSchema>) => void;
    loading: boolean;
};

const RsvpPasswordForm = ({ onSubmit, loading }: RsvpPasswordFormProps) => {
    const methods = useForm({
        defaultValues: {
            password: '',
        },
        resolver: yupResolver(passwordValidationSchema),
        mode: 'onBlur',
    });

    return (
        <FormProvider {...methods}>
            <Box
                as="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                pb={4}
                mt={4}
            >
                <InputControl
                    name="password"
                    label="Wachtwoord"
                    inputProps={{
                        placeholder: 'Wachtwoord',
                        type: 'password',
                    }}
                />
                <Flex justifyContent="flex-end" mt={4}>
                    <ButtonGroup spacing={4}>
                        <SubmitButton
                            isDisabled={
                                loading || methods.formState.isSubmitting
                            }
                        >
                            Valideer wachtwoord
                        </SubmitButton>
                    </ButtonGroup>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default RsvpPasswordForm;

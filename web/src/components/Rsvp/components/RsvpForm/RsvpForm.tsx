import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { InvitationType } from 'types/graphql';

import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

import { useCreateWeddingInvitation } from '../../hooks/useCreateWeddingInvitation';

import EssentialInformationFields from './components/EssentialInformationFields/EssentialInformationFields';
import ExtraInformationFields from './components/ExtraInformationFields/ExtraInformationFields';
import WeddingGuestsField from './components/WeddingGuestsField/WeddingGuestsField';

type RsvpFormProps = {
    invitationType: InvitationType;
};

const RsvpForm = ({ invitationType }: RsvpFormProps) => {
    const {
        createWeddingInvitation,
        loading,
        validationSchema,
        initialValues,
    } = useCreateWeddingInvitation({
        invitationType,
    });

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    return (
        <FormProvider {...methods}>
            <Box
                as={'form'}
                onSubmit={methods.handleSubmit(createWeddingInvitation)}
            >
                <Heading textAlign="center" fontSize="md">
                    RSVP
                </Heading>
                <Heading textAlign="center" fontSize="4xl">
                    Ben jij erbij op onze bruiloft?
                </Heading>
                <Grid
                    mt={4}
                    gridTemplateColumns={'repeat(8, 1fr)'}
                    gap={{ base: 4, lg: 4 }}
                >
                    <EssentialInformationFields />
                    <WeddingGuestsField control={methods.control} />
                    <ExtraInformationFields invitationType={invitationType} />
                </Grid>
                <Flex justifyContent="flex-end">
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        Versturen
                    </SubmitButton>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default RsvpForm;

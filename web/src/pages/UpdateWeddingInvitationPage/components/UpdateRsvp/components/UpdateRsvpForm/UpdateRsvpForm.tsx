import React, { useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { GetGuestInvitationByIdQuery, InvitationType } from 'types/graphql';

import EssentialInformationFields from 'src/components/Rsvp/components/RsvpForm/components/EssentialInformationFields/EssentialInformationFields';
import ExtraInformationFields from 'src/components/Rsvp/components/RsvpForm/components/ExtraInformationFields/ExtraInformationFields';
import WeddingGuestsField from 'src/components/Rsvp/components/RsvpForm/components/WeddingGuestsField/WeddingGuestsField';

import { useUpdateWeddingInvitation } from '../../hooks/useUpdateWeddingInvitation';

type RsvpFormProps = {
    invitationType: InvitationType;
    weddingInvitation: NonNullable<
        GetGuestInvitationByIdQuery['weddingInvitation']
    >;
};

const UpdateRsvpForm = ({
    invitationType,
    weddingInvitation,
}: RsvpFormProps) => {
    const {
        initialValues,
        updateWeddingInvitation,
        validationSchema,
        loading,
    } = useUpdateWeddingInvitation({ weddingInvitation });

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    useEffect(() => {
        methods.reset(initialValues);
    }, [initialValues, methods]);

    return (
        <FormProvider {...methods}>
            <Box
                as={'form'}
                onSubmit={methods.handleSubmit(updateWeddingInvitation)}
            >
                <Heading textAlign="center" fontSize="md">
                    RSVP
                </Heading>
                <Heading textAlign="center" fontSize="4xl">
                    Update jouw uitnodiging
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
                    <Button
                        colorScheme="body"
                        type="submit"
                        mt={4}
                        isLoading={loading}
                    >
                        Opslaan
                    </Button>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default UpdateRsvpForm;

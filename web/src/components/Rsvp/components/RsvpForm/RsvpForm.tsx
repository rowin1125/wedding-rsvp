import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InvitationType } from 'types/graphql';

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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
                const weddingInvitationResponse = await createWeddingInvitation(
                    values
                );

                if (!weddingInvitationResponse.data?.createWeddingInvitation.id)
                    return;
                resetForm();
            }}
            validationSchema={validationSchema}
        >
            <Box as={Form}>
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
                    <WeddingGuestsField />
                    <ExtraInformationFields invitationType={invitationType} />
                </Grid>
                <Flex justifyContent="flex-end">
                    <Button
                        colorScheme="body"
                        type="submit"
                        mt={4}
                        isLoading={loading}
                    >
                        Versturen
                    </Button>
                </Flex>
            </Box>
        </Formik>
    );
};

export default RsvpForm;

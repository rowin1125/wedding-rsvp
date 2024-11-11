import React from 'react';

import { Box, Heading, Grid, GridItem, Flex } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import {
    GetWeddingInvitationResponse,
    GetWeddingQuery,
    GetWeddingRsvpLandingPage,
} from 'types/graphql';

import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import GuestWeddingResponses from 'src/components/Rsvp/components/RsvpForm/components/GuestWeddingResponses';
import WeddingInvitationResponseAddress from 'src/components/Rsvp/components/RsvpForm/components/WeddingInvitationResponseAddress';

import { useUpdateRsvpForm } from './hooks/useUpdateRsvpForm';

type UpdateRsvpFormProps = {
    weddingInvitationResponse: GetWeddingInvitationResponse['weddingInvitationResponse'];
    wedding: GetWeddingQuery['wedding'];
    weddingRsvpLandingPage: GetWeddingRsvpLandingPage['weddingRsvpLandingPage'];
};

const UpdateRsvpForm = ({
    weddingInvitationResponse,
    wedding,
    weddingRsvpLandingPage,
}: UpdateRsvpFormProps) => {
    const { methods, onSubmit, mutationData } = useUpdateRsvpForm({
        weddingInvitationResponse,
        wedding,
        weddingRsvpLandingPage,
    });

    return (
        <FormProvider {...methods}>
            <Box as={'form'} onSubmit={methods.handleSubmit(onSubmit)}>
                <Heading textAlign="center" fontSize="md">
                    RSVP
                </Heading>
                <Heading textAlign="center" fontSize="4xl">
                    Ben jij erbij op onze bruiloft?
                </Heading>
                <Grid
                    mt={4}
                    gridTemplateColumns={'repeat(2, 1fr)'}
                    gap={{ base: 4, lg: 4 }}
                >
                    <GuestWeddingResponses
                        weddingRsvpLandingPage={weddingRsvpLandingPage}
                        methods={methods}
                        weddingInvitationResponse={weddingInvitationResponse}
                        type="update"
                    />
                    <GridItem colSpan={2}>
                        <Box as="hr" my={4} />
                    </GridItem>

                    <WeddingInvitationResponseAddress />
                </Grid>
                <Flex justifyContent="flex-end" w="full" mt={4}>
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={mutationData.loading}
                        isDisabled={mutationData.loading}
                    >
                        Versturen
                    </SubmitButton>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default UpdateRsvpForm;

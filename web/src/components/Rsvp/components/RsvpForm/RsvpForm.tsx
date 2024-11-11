import React from 'react';

import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { GetWeddingQuery, GetWeddingRsvpLandingPage } from 'types/graphql';

import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

import GuestWeddingResponses from './components/GuestWeddingResponses';
import WeddingInvitationResponseAddress from './components/WeddingInvitationResponseAddress';
import { useRsvpForm } from './hooks/useRsvpForm';

type RsvpFormProps = {
    wedding: GetWeddingQuery['wedding'];
    weddingRsvpLandingPage: GetWeddingRsvpLandingPage['weddingRsvpLandingPage'];
};

const RsvpForm = ({ wedding, weddingRsvpLandingPage }: RsvpFormProps) => {
    const { methods, onSubmit, createWeddingInvitationResponseMutationData } =
        useRsvpForm({ wedding, weddingRsvpLandingPage });

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
                        methods={methods}
                        weddingRsvpLandingPage={weddingRsvpLandingPage}
                    />
                    <GridItem colSpan={2}>
                        <Box as="hr" my={4} />
                    </GridItem>

                    <WeddingInvitationResponseAddress />
                </Grid>
                <Flex justifyContent="flex-end" w="full" mt={4}>
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={
                            createWeddingInvitationResponseMutationData.loading
                        }
                        isDisabled={
                            createWeddingInvitationResponseMutationData.loading
                        }
                    >
                        Versturen
                    </SubmitButton>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default RsvpForm;

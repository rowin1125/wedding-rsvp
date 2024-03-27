import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Grid, Heading, VStack } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
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
    const { createWeddingInvitation, loading, methods } =
        useCreateWeddingInvitation({
            invitationType,
        });

    return (
        <FormProvider {...methods}>
            <VStack
                spacing={4}
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
                <Flex justifyContent="flex-end" w="full">
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        Versturen
                    </SubmitButton>
                </Flex>
            </VStack>
        </FormProvider>
    );
};

export default RsvpForm;

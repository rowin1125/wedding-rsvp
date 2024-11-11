import React from 'react';

import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Alert,
    Button,
    Text,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { GetWeddingQuery } from 'types/graphql';

import WeddingDayPartsFields from 'src/pages/OnboardingPage/components/WeddingDayPartsFields';

import { useUpdateWeddingDayPartsForm } from './hooks/useUpdateWeddingDayPartsForm';

type UpdateWeddingDayPartsProps = {
    wedding: GetWeddingQuery['wedding'];
};

const UpdateWeddingDayParts = ({ wedding }: UpdateWeddingDayPartsProps) => {
    const { methods, onSubmit, loading } = useUpdateWeddingDayPartsForm({
        dayParts: wedding?.dayParts || [],
        weddingDate: wedding?.date || '',
    });

    return (
        <FormProvider {...methods}>
            <Box as="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <Flex w="full">
                    <Grid
                        gap={4}
                        w="full"
                        maxW={{
                            lg: '800px',
                        }}
                        gridTemplateColumns="repeat(2, 1fr)"
                    >
                        <GridItem colSpan={{ base: 2, lg: 2 }}>
                            <Heading>
                                Vul de dagdelen van jullie bruiloft in
                            </Heading>
                            <Alert status="info" variant="left-accent" mt={4}>
                                <Text>
                                    <strong>Dagdelen</strong> zijn super handig.
                                    Geef aanwezigheid van je gasten aan per
                                    dagdeel en maak per dagdeel een unieke
                                    website gekoppeld aan jullie registratie
                                    module. Dit is zijn nog{' '}
                                    <strong>geen</strong> dagdelen voor jullie
                                    planning, dit komt later. 🗓️
                                </Text>
                            </Alert>
                        </GridItem>
                        <WeddingDayPartsFields control={methods.control} />
                    </Grid>
                </Flex>
                <Flex justifyContent="flex-end" w="full" mt={8}>
                    <Button
                        type="submit"
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        Dagdelen opslaan
                    </Button>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default UpdateWeddingDayParts;

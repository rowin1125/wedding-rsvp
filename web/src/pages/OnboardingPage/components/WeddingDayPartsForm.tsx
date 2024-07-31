import React from 'react';

import {
    Alert,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import { useWeddingDayPartsForm } from '../hooks/useWeddingDayPartsForm';

import WeddingDayPartsFields from './WeddingDayPartsFields';

type WeddingDayPartsFormProps = {
    handlePrevious: () => void;
};

const WeddingDayPartsForm = ({ handlePrevious }: WeddingDayPartsFormProps) => {
    const { methods, onSubmit, loading } = useWeddingDayPartsForm();

    return (
        <FormProvider {...methods}>
            <Box as="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <Flex justifyContent="center" w="full">
                    <Grid
                        gap={4}
                        justifyContent="center"
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
                        mr={4}
                        variant="outline"
                        colorScheme="secondary"
                        onClick={handlePrevious}
                    >
                        Vorige
                    </Button>
                    <Button
                        type="submit"
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        Bruiloft aanmaken
                    </Button>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default WeddingDayPartsForm;

import React from 'react';

import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    VStack,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectControl from 'src/components/react-hook-form/components/SelectControl';

import { useWeddingPartnerForm } from '../hooks/useWeddingPartnerForm';

type WeddingPartnerFormProps = {
    handleNext: () => void;
    handlePrevious: () => void;
};

const WeddingPartnerForm = ({
    handleNext,
    handlePrevious,
}: WeddingPartnerFormProps) => {
    const { onSubmit, methods } = useWeddingPartnerForm({ handleNext });

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
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <Heading size="h3">Gegevens bruidegom</Heading>
                            <VStack spacing={4}>
                                <InputControl
                                    name="partners.0.firstName"
                                    label="Voornaam bruidegom"
                                    isRequired
                                    inputProps={{
                                        placeholder: 'Felonius',
                                    }}
                                />
                                <InputControl
                                    name="partners.0.lastName"
                                    label="Achternaam bruidegom"
                                    isRequired
                                    inputProps={{
                                        placeholder: 'Gru',
                                    }}
                                />
                                <SelectControl
                                    name="partners.0.gender"
                                    label="Geslacht voorkeur"
                                    isRequired
                                    selectProps={{
                                        placeholder: 'Selecteer geslacht',
                                    }}
                                >
                                    <option value="MALE">Man</option>
                                    <option value="FEMALE">Vrouw</option>
                                    <option value="OTHER">Anders</option>
                                </SelectControl>
                            </VStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <Heading size="h3">Gegevens bruid</Heading>

                            <VStack spacing={4}>
                                <InputControl
                                    name="partners.1.firstName"
                                    label="Voornaam bruid"
                                    isRequired
                                    inputProps={{
                                        placeholder: 'Lucy',
                                    }}
                                />
                                <InputControl
                                    name="partners.1.lastName"
                                    label="Achternaam bruid"
                                    isRequired
                                    inputProps={{
                                        placeholder: 'Wilde',
                                    }}
                                />
                                <SelectControl
                                    name="partners.1.gender"
                                    label="Geslacht voorkeur"
                                    isRequired
                                    selectProps={{
                                        placeholder: 'Selecteer geslacht',
                                    }}
                                >
                                    <option value="MALE">Man</option>
                                    <option value="FEMALE">Vrouw</option>
                                    <option value="OTHER">Anders</option>
                                </SelectControl>
                            </VStack>
                        </GridItem>
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
                    <Button type="submit" colorScheme="secondary">
                        Volgende
                    </Button>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default WeddingPartnerForm;

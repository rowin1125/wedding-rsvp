import React from 'react';

import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectControl from 'src/components/react-hook-form/components/SelectControl';

import { useWeddingInformationForm } from '../hooks/useWeddingInformationForm';

type WeddingInformationFormProps = {
    handleNext: () => void;
    handlePrevious: () => void;
    previousIsDisabled: boolean;
};

const WeddingInformationForm = ({
    handlePrevious,
    previousIsDisabled,
    handleNext,
}: WeddingInformationFormProps) => {
    const { methods, onSubmit } = useWeddingInformationForm({ handleNext });

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
                            <InputControl
                                name="name"
                                label="Naam bruiloft"
                                isRequired
                                inputProps={{
                                    placeholder: 'Trouwdag Gru & Lucy',
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <InputControl
                                name="date"
                                isRequired
                                label="Datum bruiloft"
                                inputProps={{
                                    type: 'date',
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <InputControl
                                name="theme"
                                label="Dresscode / thema"
                                inputProps={{
                                    placeholder: 'Pastelkleuren',
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <SelectControl
                                name="preferredSeason"
                                label="Voorkeur seizoen"
                                selectProps={{
                                    placeholder: 'Kies een seizoen',
                                }}
                                tooltipText="Deze wordt automatisch ingevuld op basis van de gekozen datum, echter kan je hem ook handmatig aanpassen"
                                tooltipIconProps={{
                                    color: 'blue.500',
                                }}
                            >
                                <option value="WINTER">Winter</option>
                                <option value="SPRING">Lente</option>
                                <option value="SUMMER">Zomer</option>
                                <option value="AUTUMN">Herfst</option>
                            </SelectControl>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <CheckboxSingleControl
                                name="isAbroad"
                                label="Bruiloft in het buitenland"
                            />
                        </GridItem>
                    </Grid>
                </Flex>
                <Flex justifyContent="flex-end" w="full" mt={8}>
                    <Button
                        mr={4}
                        variant="outline"
                        colorScheme="secondary"
                        onClick={handlePrevious}
                        isDisabled={previousIsDisabled}
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

export default WeddingInformationForm;

import React from 'react';

import { Heading, Flex, Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { GetWeddingQuery } from 'types/graphql';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectAssetControl from 'src/components/react-hook-form/components/SelectAssetControl';
import SelectControl from 'src/components/react-hook-form/components/SelectControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

import { useDeleteWeddingById } from './hooks/useDeleteWeddingById';
import { useUpdateWeddingForm } from './hooks/useUpdateWeddingForm';

type UpdateWeddingFormProps = {
    wedding: GetWeddingQuery['wedding'];
};

const UpdateWeddingForm = ({ wedding }: UpdateWeddingFormProps) => {
    const { methods, onSubmit, formHasChanged, loading } = useUpdateWeddingForm(
        { wedding }
    );
    const { deleteWeddingById, loading: deleteLoading } =
        useDeleteWeddingById();

    if (!wedding) return null;

    return (
        <>
            <FormProvider {...methods}>
                <Heading mb={4}>Update de bruiloft</Heading>
                <Box as="form" onSubmit={methods.handleSubmit(onSubmit)}>
                    <Flex w="full">
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
                                    inputProps={{
                                        placeholder: 'Trouwdag Gru & Lucy',
                                    }}
                                />
                            </GridItem>
                            <GridItem colSpan={{ base: 2, lg: 1 }}>
                                <InputControl
                                    name="date"
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
                                <SelectAssetControl name="bannerImage" />
                            </GridItem>
                            <GridItem colSpan={{ base: 2, lg: 1 }}>
                                <CheckboxSingleControl
                                    formLabel="Bruiloft in het buitenland"
                                    name="isAbroad"
                                    label="Ja, bruiloft in het buitenland"
                                    checkBoxProps={{
                                        mt: { lg: 2 },
                                    }}
                                />
                            </GridItem>
                            <GridItem colSpan={{ base: 2 }}>
                                <Flex justifyContent="flex-end" w="full" mt={4}>
                                    <SubmitButton
                                        colorScheme="secondary"
                                        isLoading={loading}
                                        isDisabled={loading || !formHasChanged}
                                    >
                                        Update bruiloft
                                    </SubmitButton>
                                </Flex>
                            </GridItem>
                        </Grid>
                    </Flex>
                </Box>
            </FormProvider>

            <Box mt={10}>
                <Box
                    borderColor="red.500"
                    borderWidth="2px"
                    borderRadius="lg"
                    p={4}
                    w={{ base: 'full', lg: '40%' }}
                >
                    <Heading as="h3" size="md" color="red.500">
                        Danger-zone
                    </Heading>
                    <Text mt={4}>
                        Hier kun je jouw bruiloft verwijderen. Alle
                        bijbehoorende data wordt ook verwijderd en kan niet meer
                        teruggehaald worden.
                    </Text>
                    {wedding && (
                        <DeleteDialog
                            onDelete={deleteWeddingById}
                            title="Verwijder bruiloft"
                            buttonLabel="Verwijder bruiloft"
                            buttonProps={{ ml: 0, mt: 4 }}
                            id={wedding.id}
                            loading={deleteLoading}
                        >
                            <Text>
                                Weet je zeker dat je de bruiloft wilt
                                verwijderen? Dit kan niet ongedaan worden.
                            </Text>
                        </DeleteDialog>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default UpdateWeddingForm;

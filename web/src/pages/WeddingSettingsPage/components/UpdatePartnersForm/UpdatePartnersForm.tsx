import React from 'react';

import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    VStack,
    Button,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { GetWeddingQuery } from 'types/graphql';

import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectControl from 'src/components/react-hook-form/components/SelectControl';

import { useUpdateWeddingPartnerForm } from './hooks/useUpdateWeddingPartnerForm';

type UpdatePartnersFormProps = {
    partners: NonNullable<GetWeddingQuery['wedding']>['partners'];
};

const UpdatePartnersForm = ({ partners }: UpdatePartnersFormProps) => {
    const { onSubmit, methods, loading } = useUpdateWeddingPartnerForm({
        initialPartnerValues: partners,
    });

    return (
        <FormProvider {...methods}>
            <Heading mb={4}>Update de partners</Heading>

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
                            <Heading size="h3">Gegevens bruidegom</Heading>
                            <VStack spacing={4}>
                                <InputControl
                                    name="partners.0.firstName"
                                    label="Voornaam bruidegom"
                                    inputProps={{
                                        placeholder: 'Felonius',
                                    }}
                                />
                                <InputControl
                                    name="partners.0.lastName"
                                    label="Achternaam bruidegom"
                                    inputProps={{
                                        placeholder: 'Gru',
                                    }}
                                />
                                <SelectControl
                                    name="partners.0.gender"
                                    label="Geslacht voorkeur"
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
                                    inputProps={{
                                        placeholder: 'Lucy',
                                    }}
                                />
                                <InputControl
                                    name="partners.1.lastName"
                                    label="Achternaam bruid"
                                    inputProps={{
                                        placeholder: 'Wilde',
                                    }}
                                />
                                <SelectControl
                                    name="partners.1.gender"
                                    label="Geslacht voorkeur"
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
                        type="submit"
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        Update partners
                    </Button>
                </Flex>
            </Box>
        </FormProvider>
    );
};

export default UpdatePartnersForm;

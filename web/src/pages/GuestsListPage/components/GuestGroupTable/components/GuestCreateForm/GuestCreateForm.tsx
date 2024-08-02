import React from 'react';

import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Grid,
    GridItem,
    useDisclosure,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';
import { dietaryOptions } from 'src/config/guestList';

import { useGuestCreateForm } from './hooks/useGuestCreateForm';

type GuestCreateFormProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    guestGroupId: string;
};

const GuestCreateForm = ({
    disclosure,
    guestGroupId,
}: GuestCreateFormProps) => {
    const { loading, methods, onSubmit } = useGuestCreateForm({
        guestGroupId,
        disclosure,
    });

    return (
        <FormProvider {...methods}>
            <Box as="form" onSubmit={methods.handleSubmit(onSubmit)} pb={4}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="firstName"
                            label="Voornaam"
                            inputProps={{
                                placeholder: 'Voornaam',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="lastName"
                            label="Achternaam"
                            inputProps={{
                                placeholder: 'Achternaam',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="phoneNumber"
                            label="Telefoonnummer"
                            inputProps={{
                                placeholder: 'Telefoonnummer',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="email"
                            label="Email"
                            inputProps={{
                                placeholder: 'Email',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2 }}>
                        <ReactSelectControl
                            name="dietary"
                            label="Dieetwensen"
                            isCreatable
                            selectProps={{
                                isMulti: true,
                            }}
                            options={dietaryOptions}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2 }}>
                        <CheckboxSingleControl
                            formLabel="Minderjarig?"
                            name="isChild"
                            label="Persoon is onder de 18 jaar"
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2 }}>
                        <TextareaControl
                            name="notes"
                            label="Notities"
                            textareaProps={{
                                placeholder: 'Notities',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Flex justifyContent="flex-end">
                            <ButtonGroup spacing={4}>
                                <Button
                                    variant="outline"
                                    colorScheme="tertiary"
                                    onClick={disclosure.onClose}
                                >
                                    Annuleren
                                </Button>
                                <SubmitButton
                                    isDisabled={
                                        loading ||
                                        methods.formState.isSubmitting
                                    }
                                >
                                    Gast toevoegen
                                </SubmitButton>
                            </ButtonGroup>
                        </Flex>
                    </GridItem>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default GuestCreateForm;

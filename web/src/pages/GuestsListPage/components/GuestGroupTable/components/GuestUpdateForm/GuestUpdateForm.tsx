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
import { GetGuestById } from 'types/graphql';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';
import { dietaryOptions } from 'src/config/guestList';

import { useDeleteGuest } from './hooks/useDeleteGuest';
import { useGuestUpdateForm } from './hooks/useGuestUpdateForm';

type GuestUpdateFormProps = {
    guest: GetGuestById['guest'];
    disclosure: ReturnType<typeof useDisclosure>;
};

const GuestUpdateForm = ({ disclosure, guest }: GuestUpdateFormProps) => {
    const { loading, methods, onSubmit } = useGuestUpdateForm({ guest });
    const { deleteGuestById, loading: deleteLoading } = useDeleteGuest();

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
                        <ButtonGroup
                            spacing={4}
                            justifyContent="space-between"
                            w="full"
                            flexDir={{
                                base: 'column',
                                lg: 'row',
                            }}
                            rowGap={{
                                base: 4,
                                lg: 0,
                            }}
                        >
                            <Flex
                                justifyContent={{
                                    base: 'flex-end',
                                    lg: 'flex-start',
                                }}
                            >
                                {guest && (
                                    <DeleteDialog
                                        buttonProps={{
                                            variant: 'outline',
                                            colorScheme: 'red',
                                        }}
                                        buttonLabel="Gast verwijderen"
                                        loading={deleteLoading}
                                        title="Gast verwijderen"
                                        deleteButtonLabel="Definitief verwijderen 👋"
                                        onDelete={deleteGuestById}
                                        id={guest.id}
                                    >
                                        Weet je zeker dat je de gast{' '}
                                        <strong>
                                            (
                                            {`${guest.firstName} ${guest.lastName}`}
                                            )
                                        </strong>{' '}
                                        wilt verwijderen? Dit kan niet ongedaan
                                        worden gemaakt
                                    </DeleteDialog>
                                )}
                            </Flex>
                            <Flex justifyContent="flex-end" gap={4}>
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
                                    Gast bijwerken
                                </SubmitButton>
                            </Flex>
                        </ButtonGroup>
                    </GridItem>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default GuestUpdateForm;

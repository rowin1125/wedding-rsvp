import React from 'react';

import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Grid,
    GridItem,
    ListItem,
    Text,
    UnorderedList,
    useDisclosure,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { GetGuestGroupById } from 'types/graphql';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import SelectControl from 'src/components/react-hook-form/components/SelectControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import {
    countriesOptions,
    GUEST_GROUP_LABEL_MAP,
    guestGroupRelationTypeOptions,
    guestGroupTypeOptions,
} from 'src/config/guestList';

import { useDeleteGuestGroup } from './hooks/useDeleteGuestGroup';
import { useGuestGroupUpdateForm } from './hooks/useGuestGroupUpdateForm';

type GuestGroupUpdateFormProps = {
    guestGroup: GetGuestGroupById['guestGroup'];
    disclosure: ReturnType<typeof useDisclosure>;
};

const GuestGroupUpdateForm = ({
    guestGroup,
    disclosure,
}: GuestGroupUpdateFormProps) => {
    const { isFamily, loading, methods, onSubmit } = useGuestGroupUpdateForm({
        guestGroup,
    });
    const { deleteGuestGroupById, loading: deleteLoading } =
        useDeleteGuestGroup();

    return (
        <FormProvider {...methods}>
            <Box as="form" onSubmit={methods.handleSubmit(onSubmit)} pb={4}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <SelectControl
                            name="guestGroupRelationType"
                            label="Relatie"
                        >
                            <option value="">Selecteer een relatie</option>
                            {guestGroupRelationTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </SelectControl>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <SelectControl
                            name="guestGroupType"
                            label="Type gastengroep"
                        >
                            <option value="">Selecteer een type</option>
                            {guestGroupTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </SelectControl>
                    </GridItem>

                    {isFamily && (
                        <GridItem colSpan={2}>
                            <InputControl
                                name="name"
                                label="Familienaam"
                                inputProps={{ placeholder: 'Familienaam' }}
                            />
                        </GridItem>
                    )}
                    <GridItem colSpan={2}>
                        <Box as="hr" my={4} />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.street"
                            label="Straat"
                            inputProps={{
                                placeholder: 'Straat',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.houseNumber"
                            label="Huisnummer"
                            inputProps={{
                                placeholder: 'Huisnummer + toevoeging',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.zipCode"
                            label="Postcode"
                            inputProps={{
                                placeholder: 'Postcode',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.city"
                            label="Plaats"
                            inputProps={{
                                placeholder: 'Plaats',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 2 }}>
                        <ReactSelectControl
                            name="address.country"
                            label="Land"
                            options={countriesOptions}
                        />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Box as="hr" my={4} />
                    </GridItem>
                    <GridItem colSpan={{ base: 2 }}>
                        <CheckboxSingleControl
                            formLabel="Afkomstig uit het buitenland"
                            name="address.livesAbroad"
                            label="Deze gast(en) wonen in het buitenland"
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
                                {guestGroup && (
                                    <DeleteDialog
                                        buttonProps={{
                                            variant: 'outline',
                                            colorScheme: 'red',
                                        }}
                                        buttonLabel={`${
                                            GUEST_GROUP_LABEL_MAP[
                                                guestGroup.guestGroupType
                                            ]
                                        } verwijderen`}
                                        loading={deleteLoading}
                                        title={`${
                                            GUEST_GROUP_LABEL_MAP[
                                                guestGroup.guestGroupType
                                            ]
                                        } verwijderen`}
                                        deleteButtonLabel="Definitief verwijderen 👋"
                                        onDelete={deleteGuestGroupById}
                                        id={guestGroup.id}
                                    >
                                        <Text my={4}>
                                            Weet je zeker dat je{' '}
                                            <strong>
                                                (
                                                {`${
                                                    GUEST_GROUP_LABEL_MAP[
                                                        guestGroup
                                                            .guestGroupType
                                                    ]
                                                }: ${guestGroup.name}`}
                                                )
                                            </strong>{' '}
                                            wilt verwijderen? Dit kan niet
                                            ongedaan worden gemaakt.
                                        </Text>
                                        <Text my={4}>
                                            Alle gasten in deze groep worden ook
                                            verwijderd. Dit gaat om{' '}
                                            <strong>
                                                {guestGroup.guests.length}
                                            </strong>{' '}
                                            gast(en). Dit zijn:
                                        </Text>
                                        <UnorderedList>
                                            {guestGroup.guests?.map((guest) => (
                                                <ListItem key={guest?.id}>
                                                    <Text>
                                                        {guest?.firstName}{' '}
                                                        {guest?.lastName}
                                                    </Text>
                                                </ListItem>
                                            ))}
                                        </UnorderedList>
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
                                    Gegevens bijwerken
                                </SubmitButton>
                            </Flex>
                        </ButtonGroup>
                    </GridItem>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default GuestGroupUpdateForm;

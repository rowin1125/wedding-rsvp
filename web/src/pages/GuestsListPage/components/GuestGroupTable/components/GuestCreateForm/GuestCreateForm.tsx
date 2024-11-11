import React from 'react';

import {
    Alert,
    AlertIcon,
    Box,
    Button,
    ButtonGroup,
    Flex,
    Grid,
    GridItem,
    Icon,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { TbMailX } from 'react-icons/tb';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import PresenceButton from 'src/components/react-hook-form/components/PresenceControl/PresenceControl';
import RadioGroupControl from 'src/components/react-hook-form/components/RadioGroupControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';
import { dietaryOptions } from 'src/config/guestList';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import { useGuestCreateForm } from './hooks/useGuestCreateForm';

type GuestCreateFormProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    guestGroupId: string;
};

const GuestCreateForm = ({
    disclosure,
    guestGroupId,
}: GuestCreateFormProps) => {
    const { wedding } = useGetWeddingById();
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
                    <GridItem colSpan={2}>
                        <Alert status="info" mt={2} mb={4}>
                            <AlertIcon />
                            {
                                "Vul hier je initiële idee van de aanwezigheid in. Dit wordt later aangepast/ingevuld door de gasten zelf door middel van een koppeling aan de rsvp landingspagina's"
                            }
                        </Alert>
                        {wedding?.dayParts.map((dayPart, dayIndex) => (
                            <RadioGroupControl
                                control={methods.control}
                                key={dayPart.id}
                                name={`dayPartsPresent[${dayIndex}].guestWeddingResponseStatus`}
                                label={`Aanwezig voor dagdeel: ${dayPart.name}`}
                            >
                                <PresenceButton
                                    value="ACCEPTED"
                                    colorScheme="green"
                                >
                                    <Tooltip
                                        label="Ja, ik ben erbij"
                                        shouldWrapChildren
                                    >
                                        <Icon as={FaCheck} fontSize="xl" />
                                    </Tooltip>
                                </PresenceButton>
                                <PresenceButton
                                    value="UNKNOWN"
                                    colorScheme="orange"
                                >
                                    <Tooltip
                                        label="Ik weet het nog niet"
                                        shouldWrapChildren
                                    >
                                        <Icon
                                            as={MdOutlineQuestionMark}
                                            fontSize="xl"
                                        />
                                    </Tooltip>
                                </PresenceButton>
                                <PresenceButton
                                    value="DECLINED"
                                    colorScheme="red"
                                >
                                    <Tooltip
                                        label="Nee, ik ben er niet bij"
                                        shouldWrapChildren
                                    >
                                        <Icon as={IoMdClose} fontSize="xl" />
                                    </Tooltip>
                                </PresenceButton>
                                <PresenceButton
                                    value="UNINVITED"
                                    colorScheme="gray"
                                >
                                    <Tooltip
                                        label="Niet uitgenodigd voor dit dagdeel"
                                        shouldWrapChildren
                                    >
                                        <Icon as={TbMailX} fontSize="xl" />
                                    </Tooltip>
                                </PresenceButton>
                            </RadioGroupControl>
                        ))}
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

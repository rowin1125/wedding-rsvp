import React, { Fragment } from 'react';

import {
    GridItem,
    Box,
    Button,
    Icon,
    Heading,
    Flex,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { FaCheck, FaPlus, FaTrash } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import PresenceButton from 'src/components/react-hook-form/components/PresenceControl/PresenceControl';
import RadioGroupControl from 'src/components/react-hook-form/components/RadioGroupControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';
import { dietaryOptions, GUEST_GROUP_MAP } from 'src/config/guestList';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

type GuestGroupPersonalInfoProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
};
const GuestGroupPersonalInfo = ({ control }: GuestGroupPersonalInfoProps) => {
    const { wedding } = useGetWeddingById();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'guests',
    });

    const guests = useWatch({
        control,
        name: 'guests',
    });
    const guestGroupType = useWatch({ name: 'guestGroupType' });
    const isIndividual = guestGroupType === GUEST_GROUP_MAP.INDIVIDUAL;
    const isPartners = guestGroupType === GUEST_GROUP_MAP.PARTNERS;
    const maxGuests = isIndividual ? 0 : isPartners ? 1 : 10;

    return (
        <>
            {fields.map((field, index) => {
                const addExtraInfo = guests[index]?.addExtraInfo;

                return (
                    <Fragment key={field.id}>
                        <GridItem colSpan={2}>
                            <Box as="hr" my={4} />
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 2 }}>
                            <Flex alignItems="center">
                                <Heading as="h3" size="h3">
                                    Gast {index + 2}
                                </Heading>
                                <IconButton
                                    ml={4}
                                    colorScheme="red"
                                    icon={<FaTrash />}
                                    aria-label="Verwijder dagdeel"
                                    variant={'outline'}
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    Verwijder
                                </IconButton>
                            </Flex>
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <InputControl
                                name={`guests.${index}.firstName`}
                                label="Voornaam"
                                inputProps={{
                                    placeholder: 'Voornaam',
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <InputControl
                                name={`guests.${index}.lastName`}
                                label="Achternaam"
                                inputProps={{
                                    placeholder: 'Achternaam',
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            {wedding?.dayParts.map((dayPart, dayIndex) => (
                                <RadioGroupControl
                                    control={control}
                                    key={dayPart.id}
                                    name={`guestWeddingResponses[${index}].dayPartsPresent[${dayIndex}].guestWeddingResponseStatus`}
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
                                            <Icon
                                                as={IoMdClose}
                                                fontSize="xl"
                                            />
                                        </Tooltip>
                                    </PresenceButton>
                                </RadioGroupControl>
                            ))}
                        </GridItem>
                        <GridItem colSpan={{ base: 2 }}>
                            <CheckboxSingleControl
                                tooltipText="Voeg extra informatie toe zoals telefoonnummer, email, dieetwensen en notities"
                                formLabel="Wil je extra gast details toevoegen?"
                                name={`guests.${index}.addExtraInfo`}
                                label="Extra gast details toevoegen"
                            />
                        </GridItem>
                        {addExtraInfo && (
                            <>
                                <GridItem colSpan={{ base: 2, lg: 1 }}>
                                    <InputControl
                                        name={`guests.${index}.phoneNumber`}
                                        label="Telefoonnummer"
                                        inputProps={{
                                            placeholder: 'Telefoonnummer',
                                        }}
                                    />
                                </GridItem>
                                <GridItem colSpan={{ base: 2, lg: 1 }}>
                                    <InputControl
                                        name={`guests.${index}.email`}
                                        label="Email"
                                        inputProps={{
                                            placeholder: 'Email',
                                        }}
                                    />
                                </GridItem>
                                <GridItem colSpan={{ base: 2 }}>
                                    <ReactSelectControl
                                        name={`guests.${index}.dietary`}
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
                                        name={`guests.${index}.isChild`}
                                        label="Persoon is onder de 18 jaar"
                                    />
                                </GridItem>
                                <GridItem colSpan={{ base: 2 }}>
                                    <TextareaControl
                                        name={`guests.${index}.notes`}
                                        label="Notities"
                                        textareaProps={{
                                            placeholder: 'Notities',
                                        }}
                                    />
                                </GridItem>
                            </>
                        )}
                    </Fragment>
                );
            })}
            {fields.length < maxGuests && !isIndividual && (
                <GridItem
                    colSpan={{
                        base: 2,
                        lg: 2,
                    }}
                >
                    <Button
                        isDisabled={fields.length >= 4}
                        colorScheme="body"
                        onClick={() =>
                            append({
                                firstName: '',
                                lastName: '',
                                addExtraInfo: false,
                                phoneNumber: '',
                                email: '',
                                dietary: [],
                                notes: '',
                                isChild: false,
                                dayPartsPresent: wedding?.dayParts.map(
                                    (dayPart) => ({
                                        guestWeddingResponseStatus: 'UNKNOWN',
                                        weddingDayPartId: dayPart.id,
                                    })
                                ),
                            })
                        }
                    >
                        <Icon as={FaPlus} mr={4} /> Voeg nog een gast toe
                    </Button>
                </GridItem>
            )}
            <GridItem colSpan={2}>
                <Box as="hr" my={4} />
            </GridItem>
        </>
    );
};

export default GuestGroupPersonalInfo;

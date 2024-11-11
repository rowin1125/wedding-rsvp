import React from 'react';

import {
    Alert,
    AlertIcon,
    GridItem,
    Heading,
    Icon,
    Tooltip,
} from '@chakra-ui/react';
import { Control, useWatch } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { TbMailX } from 'react-icons/tb';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import PresenceButton from 'src/components/react-hook-form/components/PresenceControl/PresenceControl';
import RadioGroupControl from 'src/components/react-hook-form/components/RadioGroupControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';
import { dietaryOptions } from 'src/config/guestList';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

type GuestGroupInitialGuestInfoProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
};

const GuestGroupInitialGuestInfo = ({
    control,
}: GuestGroupInitialGuestInfoProps) => {
    const { wedding } = useGetWeddingById();
    const addExtraInfo = useWatch({ name: 'initialGuest.addExtraInfo' });

    return (
        <>
            <GridItem colSpan={{ base: 2, lg: 2 }}>
                <Heading as="h3" size="h3">
                    Hoofdgast
                </Heading>
            </GridItem>
            <GridItem colSpan={{ base: 2, lg: 1 }}>
                <InputControl
                    name="initialGuest.firstName"
                    label="Voornaam"
                    inputProps={{
                        placeholder: 'Voornaam',
                    }}
                />
            </GridItem>
            <GridItem colSpan={{ base: 2, lg: 1 }}>
                <InputControl
                    name="initialGuest.lastName"
                    label="Achternaam"
                    inputProps={{
                        placeholder: 'Achternaam',
                    }}
                />
            </GridItem>
            <GridItem colSpan={2}>
                <Alert status="info" mb={4}>
                    <AlertIcon />
                    {
                        "Vul hier je initiële idee van de aanwezigheid in. Dit wordt later aangepast/ingevuld door de gasten zelf door middel van een koppeling aan de rsvp landingspagina's"
                    }
                </Alert>
                {wedding?.dayParts.map((dayPart, dayIndex) => (
                    <RadioGroupControl
                        control={control}
                        key={dayPart.id}
                        name={`initialGuest.dayPartsPresent[${dayIndex}].guestWeddingResponseStatus`}
                        label={`Aanwezig voor dagdeel: ${dayPart.name}`}
                    >
                        <PresenceButton value="ACCEPTED" colorScheme="green">
                            <Tooltip
                                label="Ja, ik ben erbij"
                                shouldWrapChildren
                            >
                                <Icon as={FaCheck} fontSize="xl" />
                            </Tooltip>
                        </PresenceButton>
                        <PresenceButton value="UNKNOWN" colorScheme="orange">
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
                        <PresenceButton value="DECLINED" colorScheme="red">
                            <Tooltip
                                label="Nee, ik ben er niet bij"
                                shouldWrapChildren
                            >
                                <Icon as={IoMdClose} fontSize="xl" />
                            </Tooltip>
                        </PresenceButton>
                        <PresenceButton value="UNINVITED" colorScheme="gray">
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
            <GridItem colSpan={{ base: 2 }}>
                <CheckboxSingleControl
                    tooltipText="Voeg extra informatie toe zoals telefoonnummer, email, dieetwensen en notities"
                    formLabel="Wil je extra gast details toevoegen?"
                    name="initialGuest.addExtraInfo"
                    label="Extra gast details toevoegen"
                />
            </GridItem>
            {addExtraInfo && (
                <>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="initialGuest.phoneNumber"
                            label="Telefoonnummer"
                            inputProps={{
                                placeholder: 'Telefoonnummer',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="initialGuest.email"
                            label="Email"
                            inputProps={{
                                placeholder: 'Email',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2 }}>
                        <ReactSelectControl
                            name="initialGuest.dietary"
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
                            name="initialGuest.isChild"
                            label="Persoon is onder de 18 jaar"
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2 }}>
                        <TextareaControl
                            name="initialGuest.notes"
                            label="Notities"
                            textareaProps={{
                                placeholder: 'Notities',
                            }}
                        />
                    </GridItem>
                </>
            )}
        </>
    );
};

export default GuestGroupInitialGuestInfo;

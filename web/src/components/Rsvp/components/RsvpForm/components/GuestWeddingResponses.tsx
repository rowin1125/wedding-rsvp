import React, { Fragment, useRef } from 'react';

import {
    GridItem,
    Flex,
    Heading,
    IconButton,
    Icon,
    Button,
    Tooltip,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { useFieldArray, useWatch } from 'react-hook-form';
import { FaTrash, FaCheck, FaPlus } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineQuestionMark } from 'react-icons/md';
import {
    GetWeddingInvitationResponse,
    GetWeddingRsvpLandingPage,
} from 'types/graphql';
import { InferType } from 'yup';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import PresenceButton from 'src/components/react-hook-form/components/PresenceControl/PresenceControl';
import RadioGroupControl from 'src/components/react-hook-form/components/RadioGroupControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';
import { dietaryOptions } from 'src/config/guestList';
import { useUpdateRsvpForm } from 'src/pages/UpdateWeddingInvitationResponsePage/components/UpdateRsvpForm/hooks/useUpdateRsvpForm';

import {
    useRsvpForm,
    weddingInvitationValidationSchema,
} from '../hooks/useRsvpForm';

type GuestWeddingResponsesProps = {
    weddingInvitationResponse?: GetWeddingInvitationResponse['weddingInvitationResponse'];
    weddingRsvpLandingPage: GetWeddingRsvpLandingPage['weddingRsvpLandingPage'];
    type?: 'create' | 'update';
    methods:
        | ReturnType<typeof useRsvpForm>['methods']
        | ReturnType<typeof useUpdateRsvpForm>['methods'];
};

const GuestWeddingResponses = ({
    methods,
    weddingRsvpLandingPage,
    type,
    weddingInvitationResponse,
}: GuestWeddingResponsesProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const isUpdate = type === 'update';

    const { fields, append, remove } = useFieldArray<
        InferType<typeof weddingInvitationValidationSchema>
    >({
        control: methods.control as never,
        name: 'guestWeddingResponses',
    });

    const guestWeddingResponses = useWatch({
        name: 'guestWeddingResponses',
    }) as InferType<
        typeof weddingInvitationValidationSchema
    >['guestWeddingResponses'];

    return (
        <>
            {fields.map((f, index) => {
                const field = f as InferType<
                    typeof weddingInvitationValidationSchema
                >['guestWeddingResponses'][0] & { id: string };
                const addExtraInfo =
                    guestWeddingResponses?.[index]?.guest?.addExtraInfo;
                const guestWeddingResponse = guestWeddingResponses?.[index];
                const isNewGuest =
                    !!weddingInvitationResponse?.guestWeddingResponses?.find(
                        (response) =>
                            response?.guest?.firstName !==
                                field.guest.firstName ||
                            response?.guest?.lastName !== field.guest.lastName
                    );

                return (
                    <Fragment key={`${field.id}-${index}`}>
                        <GridItem colSpan={2}>
                            <Flex alignItems="center">
                                <Heading as="h3" size="h3">
                                    Gast {index + 1}
                                </Heading>
                                <IconButton
                                    ml={4}
                                    colorScheme="red"
                                    icon={<FaTrash />}
                                    aria-label="Verwijder dagdeel"
                                    variant={'outline'}
                                    size="sm"
                                    onClick={onOpen}
                                    display={
                                        fields.length > 1 ? 'flex' : 'none'
                                    }
                                >
                                    Verwijder
                                </IconButton>
                                <AlertDialog
                                    isOpen={isOpen}
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose}
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogHeader
                                                fontSize="lg"
                                                fontWeight="bold"
                                            >
                                                Gast verwijderen?
                                            </AlertDialogHeader>

                                            <AlertDialogBody>
                                                Weet je het zeker dat deze echt
                                                weg moet? Indien iemand niet
                                                aanwezig kan zijn gebruik dan
                                                aub de status Nee in plaats van
                                                verwijderen.
                                            </AlertDialogBody>

                                            <AlertDialogFooter>
                                                <Button
                                                    ref={cancelRef}
                                                    onClick={onClose}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    colorScheme="red"
                                                    variant="link"
                                                    onClick={() => {
                                                        remove(index);
                                                        onClose();
                                                    }}
                                                    ml={3}
                                                >
                                                    Delete
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                            </Flex>
                        </GridItem>
                        <GridItem key={field.id} colSpan={1}>
                            <InputControl
                                name={`guestWeddingResponses[${index}].guest.firstName`}
                                label="Voornaam"
                                isDisabled={isUpdate && !isNewGuest}
                                inputProps={{
                                    placeholder: 'Voornaam',
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <InputControl
                                name={`guestWeddingResponses[${index}].guest.lastName`}
                                label="Achternaam"
                                isDisabled={isUpdate && !isNewGuest}
                                inputProps={{
                                    placeholder: 'Achternaam',
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Alert status="info" mb={2}>
                                <AlertIcon />
                                {
                                    "Geef per dagdeel aan of je aanwezig bent. Als je het nog niet zeker weet, kies dan 'Ik weet het nog niet'."
                                }
                            </Alert>
                            {guestWeddingResponse?.dayPartsPresent?.map(
                                (dayPart, dayIndex) => {
                                    const weddingDayPart =
                                        weddingRsvpLandingPage?.weddingDayParts.find(
                                            (part) =>
                                                part?.id ===
                                                dayPart.weddingDayPartId
                                        );
                                    return (
                                        <RadioGroupControl
                                            control={methods.control}
                                            key={`${weddingDayPart?.id}-${dayIndex}`}
                                            name={`guestWeddingResponses[${index}].dayPartsPresent[${dayIndex}].guestWeddingResponseStatus`}
                                            label={`Aanwezig voor dagdeel: ${weddingDayPart?.name}`}
                                        >
                                            <PresenceButton
                                                value="ACCEPTED"
                                                colorScheme="green"
                                            >
                                                <Tooltip
                                                    label="Ja, ik ben erbij"
                                                    shouldWrapChildren
                                                >
                                                    <Icon
                                                        as={FaCheck}
                                                        fontSize="xl"
                                                    />
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
                                                        as={
                                                            MdOutlineQuestionMark
                                                        }
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
                                    );
                                }
                            )}
                        </GridItem>
                        <GridItem colSpan={2}>
                            <TextareaControl
                                name={`guestWeddingResponses[${index}].remarks`}
                                label="Opmerkingen"
                                textareaProps={{
                                    placeholder: 'Opmerkingen',
                                    rows: 1,
                                }}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <CheckboxSingleControl
                                formLabel="Extra informatie"
                                name={`guestWeddingResponses[${index}].guest.addExtraInfo`}
                                label={`Extra contactinformatie toevoegen van: Gast ${
                                    guestWeddingResponses?.[0].guest
                                        .firstName || index + 1
                                }`}
                                helperText="Vul de aanvullende informatie in, dit helpt het bruidspaar enorm met de voorbereidingen en communicatie."
                                helperTextProps={{
                                    color: 'orange.500',
                                }}
                            />
                        </GridItem>
                        {addExtraInfo && (
                            <>
                                <GridItem colSpan={1}>
                                    <InputControl
                                        name={`guestWeddingResponses[${index}].guest.email`}
                                        label="Email"
                                        inputProps={{
                                            placeholder: 'Email',
                                        }}
                                    />
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <InputControl
                                        name={`guestWeddingResponses[${index}].guest.phoneNumber`}
                                        label="Telefoonnummer"
                                        inputProps={{
                                            placeholder: 'Telefoonnummer',
                                        }}
                                    />
                                </GridItem>
                                <GridItem colSpan={{ base: 2 }}>
                                    <ReactSelectControl
                                        name={`guestWeddingResponses[${index}].guest.dietary`}
                                        label="Dieetwensen"
                                        isCreatable
                                        selectProps={{
                                            isMulti: true,
                                        }}
                                        options={dietaryOptions}
                                    />
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <CheckboxSingleControl
                                        formLabel="Minderjarig?"
                                        name={`guestWeddingResponses[${index}].guest.isChild`}
                                        label="Persoon is onder de 18 jaar"
                                    />
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <TextareaControl
                                        name={`guestWeddingResponses[${index}].guest.notes`}
                                        label="Opmerkingen"
                                        textareaProps={{
                                            placeholder: 'Opmerkingen',
                                        }}
                                    />
                                </GridItem>
                            </>
                        )}
                    </Fragment>
                );
            })}
            {fields.length < 10 && (
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
                                guest: {
                                    firstName: '',
                                    lastName: '',
                                    addExtraInfo: false,
                                    email: '',
                                    phoneNumber: '',
                                    dietary: [],
                                    isChild: false,
                                    notes: '',
                                },
                                dayPartsPresent:
                                    weddingRsvpLandingPage?.weddingDayParts.map(
                                        (dayPart) => ({
                                            guestWeddingResponseStatus: '',
                                            weddingDayPartId: dayPart?.id || '',
                                        })
                                    ) ?? [
                                        {
                                            guestWeddingResponseStatus: '',
                                            weddingDayPartId: '',
                                        },
                                    ],
                                remarks: '',
                            })
                        }
                    >
                        <Icon as={FaPlus} mr={4} /> Voeg nog een gast toe
                    </Button>
                </GridItem>
            )}
        </>
    );
};

export default GuestWeddingResponses;

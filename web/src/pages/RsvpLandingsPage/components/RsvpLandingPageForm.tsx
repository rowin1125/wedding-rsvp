import React, { useEffect, useMemo, useState } from 'react';

import {
    Alert,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertIcon,
    Box,
    Button,
    ButtonGroup,
    Flex,
    Grid,
    GridItem,
    Heading,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { GetWeddingRsvpLandingPage } from 'types/graphql';
import { object, string, array, boolean, InferType } from 'yup';

import PuckStudio from 'src/components/PuckStudio/PuckStudio';
import CheckboxContainer from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxContainer';
import CheckboxControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxControl';
import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectControl from 'src/components/react-hook-form/components/SelectControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';
import SwitchControl from 'src/components/react-hook-form/components/SwitchControl';
import TiptapControl from 'src/components/react-hook-form/components/TiptapControl/TiptapControl';
import { Salter } from 'src/helpers/Salter';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import { useRsvpLandingPageForm } from '../hooks/useRsvpLandingPageForm';
import { template1 } from '../lib/templates/template-1';
import { template2 } from '../lib/templates/template-2';

import CreateRsvpLandingPageWrapper from './CreateRsvpLandingPageWrapper';

type RsvpLandingPageFormProps = {
    disclosure?: ReturnType<typeof useDisclosure>;
    type: 'create' | 'update';
    weddingRsvpLandingPage?: GetWeddingRsvpLandingPage['weddingRsvpLandingPage'];
};

export const rsvpLandingPageValidationSchema = object({
    name: string().required('Naam is verplicht'),
    weddingDayPartsIds: array(string().required('Dagdelen zijn verplicht'))
        .required('Dagdelen zijn verplicht')
        .min(1),
    passwordRequired: boolean(),
    password: string().when('passwordRequired', {
        is: (value: boolean) => value,
        then: (schema) => schema.required('Wachtwoord is verplicht'),
    }),
    isActive: boolean().required('Actief is verplicht'),
    sidebarData: object(),
    template: string(),
});

const RsvpLandingPageForm = ({
    disclosure,
    type,
    weddingRsvpLandingPage,
}: RsvpLandingPageFormProps) => {
    const { wedding } = useGetWeddingById();
    const [isLoading, setIsLoading] = useState(true);
    const [defaultValues, setDefaultValues] = useState<
        InferType<typeof rsvpLandingPageValidationSchema>
    >({
        name: '',
        weddingDayPartsIds: [],
        passwordRequired: false,
        password: '',
        isActive: false,
        template: 'none',
        sidebarData: {
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                },
            ],
        },
    });
    const dialogDisclosure = useDisclosure();
    const cancelRef = React.useRef(null);

    const methods = useForm({
        resolver: yupResolver(rsvpLandingPageValidationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const { createWeddingRsvpLandingPageData, onSubmit } =
        useRsvpLandingPageForm({
            disclosure,
            type,
            id: weddingRsvpLandingPage?.id,
            resetForm: methods.reset,
        });

    useEffect(() => {
        const loadDefaultValues = async () => {
            const salter = new Salter();
            const values: InferType<typeof rsvpLandingPageValidationSchema> = {
                name: weddingRsvpLandingPage?.name || '',
                weddingDayPartsIds:
                    weddingRsvpLandingPage?.weddingDayParts?.map(
                        (dayPart) => dayPart?.id || ''
                    ) ?? [],
                passwordRequired: !!weddingRsvpLandingPage?.password,
                password: weddingRsvpLandingPage?.password
                    ? await salter.parseString(weddingRsvpLandingPage?.password)
                    : '',
                isActive: weddingRsvpLandingPage?.isActive || false,
                sidebarData: weddingRsvpLandingPage?.sidebarData || {
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                        },
                    ],
                },
                template: 'none',
            };
            setDefaultValues(values);
            methods.reset(values);
            setIsLoading(false);
        };

        loadDefaultValues();
    }, [weddingRsvpLandingPage, methods]);

    const passwordRequired = methods.watch('passwordRequired');
    const template = methods.watch('template');
    const templateValues = useMemo(() => {
        switch (template) {
            case 'template-1':
                return template1;
            case 'template-2':
                return template2;
            default:
                return {};
        }
    }, [template]);

    if (!wedding || (!weddingRsvpLandingPage && type === 'update') || isLoading)
        return null;

    const weddingDayPartsIds = methods.watch('weddingDayPartsIds');
    const weddingDayPartsHaveBeenRemoved =
        weddingRsvpLandingPage?.weddingDayParts.some(
            (dayPart) => !weddingDayPartsIds.includes(dayPart?.id || '')
        );

    const templateIsNotNone = template !== 'none' && type === 'create';

    return (
        <FormProvider {...methods}>
            <CreateRsvpLandingPageWrapper
                templateIsNotNone={templateIsNotNone}
                disclosure={disclosure}
                isUpdate={type === 'update'}
            >
                <Grid templateColumns="repeat(12, 1fr)">
                    <GridItem
                        colSpan={{
                            base: 12,
                            lg: templateIsNotNone ? 5 : 12,
                        }}
                        borderRightColor="gray.100"
                        borderRightWidth={{ lg: templateIsNotNone ? '1px' : 0 }}
                        borderBottomWidth={{
                            base: templateIsNotNone ? 1 : 0,
                            lg: 0,
                        }}
                        pb={{
                            base: templateIsNotNone ? 4 : 0,
                            lg: 0,
                        }}
                        pr={{ lg: templateIsNotNone ? 5 : 0 }}
                    >
                        <VStack
                            as="form"
                            onSubmit={methods.handleSubmit(onSubmit)}
                            align="start"
                            spacing={5}
                        >
                            <InputControl
                                name="name"
                                label="Pagina naam"
                                inputProps={{
                                    placeholder: 'Naam',
                                }}
                            />
                            <Alert status="info">
                                <AlertIcon />
                                {` Selecteer de dagdelen waarvoor gasten zich
                                kunnen registreren. Voorbeeld, als het om gasten
                                gaat die de hele dag aanwezig zijn selecteer dan
                                alle dagdelen. Al gaat om bijvoorbeeld alleen
                                avondgasten, selecteer dan alleen het dagdeel
                                "Avond".`}
                            </Alert>

                            <CheckboxContainer
                                name="weddingDayPartsIds"
                                label="Dagdelen beschikbaar voor RSVP"
                            >
                                {wedding.dayParts.map((dayPart) => (
                                    <CheckboxControl
                                        key={dayPart.id}
                                        name="weddingDayPartsIds"
                                        value={dayPart.id}
                                        label={dayPart.name}
                                    />
                                ))}
                            </CheckboxContainer>
                            <CheckboxSingleControl
                                formLabel="Beveiliging"
                                name="passwordRequired"
                                label="Wil je de pagina beveiligen met een wachtwoord?"
                                tooltipText="Als je de pagina beveiligt met een wachtwoord, moeten gasten een wachtwoord invoeren om de pagina te kunnen bekijken. Zorg ervoor dat je dit dus meestuurt in de uitnodiging."
                            />
                            {passwordRequired && (
                                <InputControl
                                    name="password"
                                    label="Wachtwoord"
                                    inputProps={{
                                        placeholder: 'Wachtwoord',
                                    }}
                                />
                            )}
                            {type === 'create' && (
                                <SelectControl
                                    name="template"
                                    label="Template"
                                    tooltipText="Kies uit een van de templates om de landingspagina vorm te geven. De templates zijn vooraf gemaakt en kunnen hierna naar wens worden aangepast. Je kunt er ook voor kiezen om geen template te gebruiken en de landingspagina zelf vorm te geven."
                                >
                                    <option value="none">Geen</option>
                                    <option value="template-1">Modern</option>
                                    <option value="template-2">Simpel</option>
                                </SelectControl>
                            )}
                            <SwitchControl
                                name="isActive"
                                label="Pagina actief"
                            />
                            <TiptapControl
                                inputProps={{
                                    borderColor: 'gray.100',
                                    borderWidth: '1px',
                                    borderRadius: 'md',
                                }}
                                name="sidebarData"
                                label="Sidebar informatie"
                                tooltipText="Hier kun je extra informatie toevoegen voor de gasten. Denk hierbij aan een korte uitleg over de dag, de locatie of andere belangrijke informatie. Dit wordt alleen weergegeven op de live pagina en is te vinden via het menu icontje rechtsboven."
                            />

                            <Flex
                                alignItems="center"
                                justifyContent="flex-end"
                                w="full"
                                bg="white"
                                position={{
                                    base: 'sticky',
                                    lg: 'relative',
                                }}
                                left={0}
                                right={0}
                                top={10}
                                zIndex={2}
                            >
                                {disclosure?.onClose && (
                                    <Button
                                        mr={3}
                                        variant="ghost"
                                        onClick={disclosure.onClose}
                                    >
                                        Sluiten
                                    </Button>
                                )}
                                {!weddingDayPartsHaveBeenRemoved && (
                                    <SubmitButton
                                        colorScheme="secondary"
                                        isLoading={
                                            createWeddingRsvpLandingPageData.loading
                                        }
                                        isDisabled={
                                            createWeddingRsvpLandingPageData.loading
                                        }
                                    >
                                        Opslaan
                                    </SubmitButton>
                                )}
                                {weddingDayPartsHaveBeenRemoved && (
                                    <>
                                        <Button
                                            onClick={dialogDisclosure.onOpen}
                                        >
                                            Opslaan
                                        </Button>
                                        <AlertDialog
                                            motionPreset="slideInBottom"
                                            leastDestructiveRef={cancelRef}
                                            onClose={dialogDisclosure.onClose}
                                            isOpen={dialogDisclosure.isOpen}
                                            isCentered
                                        >
                                            <AlertDialogOverlay />

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    Landingspagina wijzigen
                                                </AlertDialogHeader>
                                                <AlertDialogCloseButton />
                                                <AlertDialogBody>
                                                    <Alert status="warning">
                                                        <AlertIcon />
                                                        LET OP! Je staat op het
                                                        punt om een dagdeel te
                                                        wijzigen voor de
                                                        landingspagina. Indien
                                                        je een dagdeel
                                                        verwijderd en je hebt
                                                        gasten die een
                                                        registratie hebben staan
                                                        voor dit dagdeel, wordt
                                                        dit omgezet in een
                                                        `UNKNOWN` status. Weet
                                                        je zeker dat je door
                                                        wilt gaan?
                                                    </Alert>
                                                </AlertDialogBody>
                                                <AlertDialogFooter>
                                                    <ButtonGroup>
                                                        <Button
                                                            ref={cancelRef}
                                                            onClick={
                                                                dialogDisclosure.onClose
                                                            }
                                                            variant="ghost"
                                                        >
                                                            Annuleren
                                                        </Button>
                                                        <SubmitButton
                                                            colorScheme="secondary"
                                                            onClick={methods.handleSubmit(
                                                                onSubmit
                                                            )}
                                                            isLoading={
                                                                createWeddingRsvpLandingPageData.loading
                                                            }
                                                            isDisabled={
                                                                createWeddingRsvpLandingPageData.loading
                                                            }
                                                        >
                                                            Opslaan
                                                        </SubmitButton>
                                                    </ButtonGroup>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </>
                                )}
                            </Flex>
                        </VStack>
                    </GridItem>
                    <GridItem
                        colSpan={{
                            base: 12,
                            lg: templateIsNotNone ? 7 : 0,
                        }}
                    >
                        <Box w="full" h="full">
                            <Heading
                                textAlign="center"
                                size="h3"
                                mt={{
                                    base: 10,
                                    lg: 0,
                                }}
                                mb={{
                                    base: 4,
                                    lg: 0,
                                }}
                            >
                                Template preview
                            </Heading>
                            <Box overflowY="scroll" maxH="80svh">
                                <Box pointerEvents="none">
                                    <PuckStudio
                                        initialData={templateValues}
                                        renderView
                                        isLoading={false}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </CreateRsvpLandingPageWrapper>
        </FormProvider>
    );
};

export default RsvpLandingPageForm;

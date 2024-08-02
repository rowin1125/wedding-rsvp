import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    CreateWeddingInvitationResponseInput,
    GetWeddingQuery,
    GuestWeddingResponseStatus,
} from 'types/graphql';
import { object, array, string, boolean, InferType } from 'yup';

import { useMutation } from '@redwoodjs/web';

import { countriesOptions } from 'src/config/guestList';

type UseRsvpFormType = {
    wedding: GetWeddingQuery['wedding'];
};

export const weddingInvitationValidationSchema = object().shape({
    guestWeddingResponses: array()
        .of(
            object({
                dayPartsPresent: array()
                    .of(
                        object({
                            guestWeddingResponseStatus: string().required(
                                'Dagdeel is verplicht'
                            ),
                            weddingDayPartId: string().required(
                                'Dagdeel is verplicht'
                            ),
                        })
                    )
                    .required('Dagdelen zijn verplicht'),
                remarks: string(),
                guest: object({
                    firstName: string().required('Voornaam is verplicht'),
                    lastName: string().required('Achternaam is verplicht'),
                    addExtraInfo: boolean(),
                    email: string().email('Geen geldig emailadres'),
                    phoneNumber: string(),
                    dietary: array().of(
                        object().shape({
                            label: string(),
                            value: string(),
                        })
                    ),
                    isChild: boolean(),
                    notes: string(),
                }),
            })
        )
        .required('Gasten zijn verplicht'),
    addAddress: boolean(),
    address: object({
        street: string(),
        houseNumber: string(),
        zipCode: string(),
        city: string(),
        livesAbroad: boolean().required(
            'Woonachtig in het buitenland wel/niet is verplicht'
        ),
        country: object().shape({
            label: string(),
            value: string(),
        }),
    }),
});

export const CREATE_WEDDING_INVITATION_RESPONSE = gql`
    mutation CreateWeddingInvitationResponse(
        $input: CreateWeddingInvitationResponseInput!
    ) {
        createWeddingInvitationResponse(input: $input) {
            id
        }
    }
`;

export const useRsvpForm = ({ wedding }: UseRsvpFormType) => {
    const toast = useToast();
    const defaultValues = {
        guestWeddingResponses: [
            {
                dayPartsPresent:
                    wedding?.dayParts.map((dayPart) => ({
                        guestWeddingResponseStatus: '',
                        weddingDayPartId: dayPart.id,
                    })) ?? [],
                remarks: '',
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
            },
        ],
        addAddress: false,
        address: {
            street: '',
            houseNumber: '',
            zipCode: '',
            city: '',
            country: {
                label:
                    countriesOptions.find((country) => country.value === 'NL')
                        ?.label ?? '',
                value:
                    countriesOptions.find((country) => country.value === 'NL')
                        ?.value ?? '',
            },
            livesAbroad: false,
        },
    };

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(weddingInvitationValidationSchema),
        mode: 'onBlur',
    });

    const [
        createWeddingInvitationResponse,
        createWeddingInvitationResponseMutationData,
    ] = useMutation(CREATE_WEDDING_INVITATION_RESPONSE);

    const onSubmit = async (
        data: InferType<typeof weddingInvitationValidationSchema>
    ) => {
        if (!wedding?.id) {
            toast({
                title: 'Er is iets misgegaan',
                description: 'Er is geen bruiloft gevonden',
                status: 'error',
                duration: 500,
                isClosable: true,
            });
            return;
        }

        const input: CreateWeddingInvitationResponseInput = {
            weddingId: wedding.id,
            guestWeddingResponses: data.guestWeddingResponses.map(
                (guestWeddingResponse) => ({
                    remarks: guestWeddingResponse.remarks,
                    dayPartsPresent: guestWeddingResponse.dayPartsPresent.map(
                        (dayPartPresent) => ({
                            weddingDayPartId: dayPartPresent.weddingDayPartId,
                            guestWeddingResponseStatus:
                                dayPartPresent.guestWeddingResponseStatus as GuestWeddingResponseStatus,
                        })
                    ),
                    guest: {
                        firstName: guestWeddingResponse.guest.firstName,
                        lastName: guestWeddingResponse.guest.lastName,
                        email: guestWeddingResponse.guest.email,
                        phoneNumber: guestWeddingResponse.guest.phoneNumber,
                        dietary:
                            guestWeddingResponse.guest.dietary?.map(
                                (dietary) => dietary.value ?? ''
                            ) ?? [],
                        isChild: guestWeddingResponse.guest.isChild,
                        notes: guestWeddingResponse.guest.notes,
                        guestOrigin: 'RSVP',
                    },
                })
            ),
            address: {
                street: data.address.street,
                houseNumber: data.address.houseNumber,
                zipCode: data.address.zipCode,
                city: data.address.city,
                country: data.address.country.value,
                livesAbroad: data.address.livesAbroad,
            },
        };

        try {
            await createWeddingInvitationResponse({ variables: { input } });

            methods.reset();
            toast({
                title: 'Bedankt voor je aanmelding',
                description: 'Je ontvangt een bevestiging per e-mail',
                status: 'success',
                duration: 10000,
                isClosable: true,
            });
        } catch (error) {
            console.error('error', error);
            toast({
                title: 'Er is iets misgegaan',
                description:
                    error instanceof Error
                        ? error.message
                        : 'Probeer het opnieuw',
                status: 'error',
                duration: 10000,
                isClosable: true,
            });
        }
    };

    return {
        methods,
        onSubmit,
        createWeddingInvitationResponseMutationData,
    };
};

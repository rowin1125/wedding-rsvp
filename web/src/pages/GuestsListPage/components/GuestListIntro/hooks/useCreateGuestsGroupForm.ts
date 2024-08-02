import { useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    CreateGuestGroupInput,
    GuestGroupType,
    GuestWeddingResponseStatus,
} from 'types/graphql';
import { object, string, boolean, array, InferType } from 'yup';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { countriesOptions, guestGroupTypeOptions } from 'src/config/guestList';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { GET_GUEST_GROUPS } from 'src/pages/GuestsListPage/hooks/useGetGuestGroups';

export const guestGroupValidationSchema = object().shape({
    guestGroupRelationType: string().required('Relatie is verplicht'),
    guestGroupType: string()
        .oneOf(guestGroupTypeOptions.map((option) => option.value))
        .required('Type gastengroep is verplicht'),
    name: string(),
    initialGuest: object({
        firstName: string().required('Voornaam is verplicht'),
        lastName: string().required('Achternaam is verplicht'),
        addExtraInfo: boolean(),
        isChild: boolean(),
        phoneNumber: string(),
        email: string().email('Geen geldig emailadres'),
        dietary: array().of(
            object().shape({
                label: string(),
                value: string(),
            })
        ),
        notes: string(),
        dayPartsPresent: array()
            .of(
                object({
                    guestWeddingResponseStatus: string().required(
                        'Dagdeel is verplicht'
                    ),
                    weddingDayPartId: string().required('Dagdeel is verplicht'),
                })
            )
            .required('Dagdelen zijn verplicht'),
    }),
    address: object({
        addAddress: boolean(),
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
    guests: array().of(
        object({
            firstName: string().required('Voornaam is verplicht'),
            lastName: string().required('Achternaam is verplicht'),
            addExtraInfo: boolean(),
            isChild: boolean(),
            phoneNumber: string(),
            email: string().email('Geen geldig emailadres'),
            dietary: array().of(
                object().shape({
                    label: string(),
                    value: string(),
                })
            ),
            notes: string(),
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
        })
    ),
});

export const CREATE_GUEST_GROUP = gql`
    mutation CreateGuestGroup($input: CreateGuestGroupInput!) {
        createGuestGroup(input: $input) {
            id
        }
    }
`;

type UseCreateGuestsGroupProps = {
    disclosure: ReturnType<typeof useDisclosure>;
};

export const useCreateGuestsGroupForm = ({
    disclosure,
}: UseCreateGuestsGroupProps) => {
    const { wedding } = useGetWeddingById();
    const toast = useToast();
    const { currentUser } = useAuth();

    const defaultValues = {
        guestGroupRelationType: '',
        guestGroupType: '',
        name: '',
        initialGuest: {
            firstName: '',
            lastName: '',
            addExtraInfo: false,
            phoneNumber: '',
            email: '',
            dietary: [],
            isChild: false,
            notes: '',
            dayPartsPresent:
                wedding?.dayParts.map((dayPart) => ({
                    guestWeddingResponseStatus: 'UNKNOWN',
                    weddingDayPartId: dayPart.id,
                })) ?? [],
        },
        address: {
            addAddress: false,
            street: '',
            houseNumber: '',
            zipCode: '',
            city: '',
            livesAbroad: false,
            country: {
                label:
                    countriesOptions.find((country) => country.value === 'NL')
                        ?.label ?? '',
                value: countriesOptions.find(
                    (country) => country.value === 'NL'
                )?.value,
            },
        },
        guests: [],
    };

    const methods = useForm({
        resolver: yupResolver(guestGroupValidationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const [createGuestGroup] = useMutation(CREATE_GUEST_GROUP, {
        refetchQueries: [
            {
                query: GET_GUEST_GROUPS,
                variables: {
                    weddingId: currentUser?.weddingId,
                },
            },
        ],
    });

    const onSubmit = async (
        data: InferType<typeof guestGroupValidationSchema>
    ) => {
        let name: string;
        switch (data.guestGroupType as GuestGroupType) {
            case 'FAMILY':
                name = data.name ?? data.initialGuest.lastName;
                break;

            default:
                name = data.initialGuest.lastName;
                break;
        }

        const input: CreateGuestGroupInput = {
            guestGroupRelationType: data.guestGroupRelationType,
            guestGroupType: data.guestGroupType as GuestGroupType,
            name,
            address: {
                street: data.address.street,
                livesAbroad: data.address.livesAbroad,
                houseNumber: data.address.houseNumber,
                zipCode: data.address.zipCode,
                city: data.address.city,
                country: data.address.country.value,
            },
            guests: [
                {
                    firstName: data.initialGuest.firstName,
                    lastName: data.initialGuest.lastName,
                    phoneNumber: data.initialGuest.phoneNumber,
                    email: data.initialGuest.email,
                    dietary:
                        data.initialGuest.dietary
                            ?.map((dietary) => dietary.value ?? '')
                            .filter(Boolean) ?? [],
                    isChild: data.initialGuest.isChild,
                    notes: data.initialGuest.notes,
                    guestGroupId: '',
                    dayPartsPresent: data.initialGuest.dayPartsPresent.map(
                        (dayPart) => ({
                            guestWeddingResponseStatus:
                                dayPart.guestWeddingResponseStatus as GuestWeddingResponseStatus,
                            weddingDayPartId: dayPart.weddingDayPartId,
                        })
                    ),
                },
                ...(data.guests?.map((guest) => ({
                    firstName: guest.firstName,
                    lastName: guest.lastName,
                    phoneNumber: guest.phoneNumber,
                    email: guest.email,
                    dietary:
                        guest.dietary
                            ?.map((dietary) => dietary?.value ?? '')
                            .filter(Boolean) || [],
                    isChild: guest.isChild,
                    notes: guest.notes,
                    guestGroupId: '',
                    dayPartsPresent: guest.dayPartsPresent.map((dayPart) => ({
                        guestWeddingResponseStatus:
                            dayPart.guestWeddingResponseStatus as GuestWeddingResponseStatus,
                        weddingDayPartId: dayPart.weddingDayPartId,
                    })),
                })) || []),
            ],
        };

        try {
            await createGuestGroup({ variables: { input } });
            toast({
                title: 'Gasten groep aangemaakt',
                description: 'De gasten groep is aangemaakt',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            methods.reset();
            disclosure.onClose();
        } catch (error) {
            console.log('error', error);
            toast({
                title: 'Er is iets misgegaan',
                description: 'Probeer het opnieuw',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return {
        onSubmit,
        methods,
    };
};

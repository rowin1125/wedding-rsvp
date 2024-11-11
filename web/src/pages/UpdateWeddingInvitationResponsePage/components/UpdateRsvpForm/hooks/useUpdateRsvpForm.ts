import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    GetWeddingInvitationResponse,
    GetWeddingQuery,
    GetWeddingRsvpLandingPage,
    GuestWeddingResponseStatus,
    UpdateWeddingInvitationResponse,
    UpdateWeddingInvitationResponseInput,
    UpdateWeddingInvitationResponseVariables,
} from 'types/graphql';
import { object, array, string, boolean, InferType } from 'yup';

import { useMutation } from '@redwoodjs/web';

import { countriesOptions, dietaryOptions } from 'src/config/guestList';

export const weddingInvitationValidationSchema = object().shape({
    guestWeddingResponses: array()
        .of(
            object({
                guestWeddingResponseId: string(),
                remarks: string(),
                dayPartsPresent: array()
                    .of(
                        object({
                            guestWeddingResponseStatus: string().required(
                                'Dagdeel is verplicht'
                            ),
                            weddingDayPartId: string().required(
                                'Dagdeel is verplicht'
                            ),
                            dayPartPresentId: string(),
                        })
                    )
                    .required('Dagdelen zijn verplicht'),
                guest: object({
                    id: string(),
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

export const UPDATE_WEDDING_INVITATION_RESPONSE = gql`
    mutation UpdateWeddingInvitationResponse(
        $input: UpdateWeddingInvitationResponseInput!
        $id: String!
    ) {
        updateWeddingInvitationResponse(input: $input, id: $id) {
            id
            guestWeddingResponses {
                id
                weddingInvitationResponseId
                remarks
                guest {
                    id
                    firstName
                    lastName
                    isChild
                    phoneNumber
                    email
                    dietary
                    notes
                    guestOrigin
                }
                dayPartsPresent {
                    id
                    weddingDayPartId
                    guestWeddingResponseId
                    guestWeddingResponseStatus
                    weddingDayPartId
                }
            }
            address {
                id
                street
                houseNumber
                zipCode
                city
                country
                livesAbroad
            }
        }
    }
`;

type UseUpdateRsvpFormType = {
    weddingInvitationResponse: GetWeddingInvitationResponse['weddingInvitationResponse'];
    wedding: GetWeddingQuery['wedding'];
    weddingRsvpLandingPage: GetWeddingRsvpLandingPage['weddingRsvpLandingPage'];
};

export const useUpdateRsvpForm = ({
    weddingInvitationResponse,
    wedding,
    weddingRsvpLandingPage,
}: UseUpdateRsvpFormType) => {
    const toast = useToast();

    const allowedRsvpDayParts = weddingRsvpLandingPage?.weddingDayParts?.map(
        (dayPart) => dayPart?.id
    );

    const defaultValues: InferType<typeof weddingInvitationValidationSchema> = {
        guestWeddingResponses:
            weddingInvitationResponse?.guestWeddingResponses.map((gwr) => {
                const allowedDayParts = gwr?.dayPartsPresent
                    .map((dayPartPresent) => {
                        if (
                            allowedRsvpDayParts?.includes(
                                dayPartPresent?.weddingDayPartId
                            )
                        )
                            return dayPartPresent;
                    })
                    .filter((dayPartPresent) => dayPartPresent);

                return {
                    guestWeddingResponseId: gwr?.id ?? '',
                    remarks: gwr?.remarks ?? '',
                    dayPartsPresent: allowedDayParts?.length
                        ? allowedDayParts.map((dpp) => ({
                              guestWeddingResponseStatus:
                                  dpp?.guestWeddingResponseStatus ===
                                  'UNINVITED'
                                      ? 'UNKNOWN'
                                      : dpp?.guestWeddingResponseStatus ??
                                        'UNKNOWN',
                              weddingDayPartId: dpp?.weddingDayPartId ?? '',
                              dayPartPresentId: dpp?.id ?? '',
                          }))
                        : wedding?.dayParts.map((dayPart) => ({
                              guestWeddingResponseStatus: 'UNKNOWN',
                              weddingDayPartId: dayPart.id,
                              dayPartPresentId: '',
                          })) ?? [
                              {
                                  guestWeddingResponseStatus: 'UNKNOWN',
                                  weddingDayPartId: '',
                                  dayPartPresentId: '',
                                  id: '',
                              },
                          ],
                    guest: {
                        id: gwr?.guest?.id ?? '',
                        firstName: gwr?.guest?.firstName ?? '',
                        lastName: gwr?.guest?.lastName ?? '',
                        email: gwr?.guest?.email ?? '',
                        phoneNumber: gwr?.guest?.phoneNumber ?? '',
                        dietary:
                            gwr?.guest?.dietary.map((diet) => ({
                                label:
                                    dietaryOptions.find(
                                        (option) => option.value === diet
                                    )?.label ??
                                    diet ??
                                    '',
                                value: diet ?? '',
                            })) ?? [],
                        isChild: gwr?.guest?.isChild ?? false,
                        notes: gwr?.guest?.notes ?? '',
                        addExtraInfo: true,
                    },
                };
            }) ?? [
                {
                    guestWeddingResponseId: '',
                    remarks: '',
                    guest: {
                        id: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        dietary: [],
                        isChild: false,
                        notes: '',
                        addExtraInfo: true,
                    },
                    dayPartsPresent: wedding?.dayParts.map((dayPart) => ({
                        guestWeddingResponseStatus: 'UNKNOWN',
                        weddingDayPartId: dayPart.id,
                        dayPartPresentId: '',
                    })) ?? [
                        {
                            guestWeddingResponseStatus: 'UNKNOWN',
                            weddingDayPartId: '',
                            dayPartPresentId: '',
                            id: '',
                        },
                    ],
                },
            ],
        addAddress: true,
        address: {
            street: weddingInvitationResponse?.address?.street ?? '',
            houseNumber: weddingInvitationResponse?.address?.houseNumber ?? '',
            zipCode: weddingInvitationResponse?.address?.zipCode ?? '',
            city: weddingInvitationResponse?.address?.city ?? '',
            livesAbroad:
                weddingInvitationResponse?.address?.livesAbroad ?? false,
            country: {
                label:
                    countriesOptions.find(
                        (country) =>
                            country.value ===
                            weddingInvitationResponse?.address?.country
                    )?.label ??
                    countriesOptions.find((country) => country.value === 'NL')
                        ?.label ??
                    '',
                value:
                    countriesOptions.find(
                        (country) =>
                            country.value ===
                            weddingInvitationResponse?.address?.country
                    )?.value ??
                    countriesOptions.find((country) => country.value === 'NL')
                        ?.value,
            },
        },
    };

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(weddingInvitationValidationSchema),
        mode: 'onBlur',
    });

    const [updateWeddingInvitationResponse, mutationData] = useMutation<
        UpdateWeddingInvitationResponse,
        UpdateWeddingInvitationResponseVariables
    >(UPDATE_WEDDING_INVITATION_RESPONSE);

    const onSubmit = async (
        data: InferType<typeof weddingInvitationValidationSchema>
    ) => {
        if (!weddingInvitationResponse || !wedding?.id) {
            console.error('Wedding invitation response not found');
            toast({
                title: 'Error',
                description: 'Wedding invitation response not found',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const input: UpdateWeddingInvitationResponseInput = {
            weddingId: wedding.id,
            guestWeddingResponses: data.guestWeddingResponses.map(
                (guestWeddingResponse) => {
                    return {
                        guestWeddingResponseId:
                            guestWeddingResponse.guestWeddingResponseId,
                        input: {
                            remarks: guestWeddingResponse.remarks,
                            dayPartsPresent: [
                                ...guestWeddingResponse.dayPartsPresent.map(
                                    (dayPartPresent) => ({
                                        id: dayPartPresent.dayPartPresentId,
                                        input: {
                                            weddingDayPartId:
                                                dayPartPresent.weddingDayPartId,
                                            guestWeddingResponseStatus:
                                                dayPartPresent.guestWeddingResponseStatus as GuestWeddingResponseStatus,
                                            guestWeddingResponseId:
                                                weddingInvitationResponse.id,
                                        },
                                    })
                                ),
                            ],
                            guest: {
                                guestId: guestWeddingResponse.guest.id,
                                input: {
                                    firstName:
                                        guestWeddingResponse.guest.firstName,
                                    lastName:
                                        guestWeddingResponse.guest.lastName,
                                    email: guestWeddingResponse.guest.email,
                                    phoneNumber:
                                        guestWeddingResponse.guest.phoneNumber,
                                    dietary:
                                        guestWeddingResponse.guest.dietary?.map(
                                            (diet) => diet.value ?? ''
                                        ) ?? [],
                                    isChild: guestWeddingResponse.guest.isChild,
                                    notes: guestWeddingResponse.guest.notes,
                                },
                            },
                        },
                    };
                }
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
            const newInvitationResponse = await updateWeddingInvitationResponse(
                {
                    variables: {
                        input,
                        id: weddingInvitationResponse.id,
                    },
                }
            );

            toast({
                title: 'Succes',
                description: 'RSVP is bijgewerkt',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            methods.reset({
                guestWeddingResponses:
                    newInvitationResponse?.data?.updateWeddingInvitationResponse.guestWeddingResponses.map(
                        (gwr) => ({
                            guestWeddingResponseId: gwr?.id ?? '',
                            remarks: gwr?.remarks ?? '',
                            dayPartsPresent: gwr?.dayPartsPresent.length
                                ? gwr?.dayPartsPresent.map((dpp) => ({
                                      guestWeddingResponseStatus:
                                          dpp?.guestWeddingResponseStatus ??
                                          'UNKNOWN',
                                      weddingDayPartId:
                                          dpp?.weddingDayPartId ?? '',
                                      dayPartPresentId: dpp?.id ?? '',
                                  }))
                                : wedding?.dayParts.map((dayPart) => ({
                                      guestWeddingResponseStatus: 'UNKNOWN',
                                      weddingDayPartId: dayPart.id,
                                      dayPartPresentId: '',
                                  })) ?? [
                                      {
                                          guestWeddingResponseStatus: 'UNKNOWN',
                                          weddingDayPartId: '',
                                          dayPartPresentId: '',
                                          id: '',
                                      },
                                  ],
                            guest: {
                                id: gwr?.guest?.id ?? '',
                                firstName: gwr?.guest?.firstName ?? '',
                                lastName: gwr?.guest?.lastName ?? '',
                                email: gwr?.guest?.email ?? '',
                                phoneNumber: gwr?.guest?.phoneNumber ?? '',
                                dietary:
                                    gwr?.guest?.dietary.map((diet) => ({
                                        label:
                                            dietaryOptions.find(
                                                (option) =>
                                                    option.value === diet
                                            )?.label ??
                                            diet ??
                                            '',
                                        value: diet ?? '',
                                    })) ?? [],
                                isChild: gwr?.guest?.isChild ?? false,
                                notes: gwr?.guest?.notes ?? '',
                                addExtraInfo: true,
                            },
                        })
                    ) ?? [
                        {
                            guestWeddingResponseId: '',
                            remarks: '',
                            guest: {
                                id: '',
                                firstName: '',
                                lastName: '',
                                email: '',
                                phoneNumber: '',
                                dietary: [],
                                isChild: false,
                                notes: '',
                                addExtraInfo: true,
                            },
                            dayPartsPresent: wedding?.dayParts.map(
                                (dayPart) => ({
                                    guestWeddingResponseStatus: 'UNKNOWN',
                                    weddingDayPartId: dayPart.id,
                                    dayPartPresentId: '',
                                })
                            ) ?? [
                                {
                                    guestWeddingResponseStatus: 'UNKNOWN',
                                    weddingDayPartId: '',
                                    dayPartPresentId: '',
                                    id: '',
                                },
                            ],
                        },
                    ],
                addAddress: true,
                address: {
                    street:
                        newInvitationResponse.data
                            ?.updateWeddingInvitationResponse?.address
                            ?.street ?? '',
                    houseNumber:
                        newInvitationResponse.data
                            ?.updateWeddingInvitationResponse?.address
                            ?.houseNumber ?? '',
                    zipCode:
                        newInvitationResponse.data
                            ?.updateWeddingInvitationResponse?.address
                            ?.zipCode ?? '',
                    city:
                        newInvitationResponse.data
                            ?.updateWeddingInvitationResponse?.address?.city ??
                        '',
                    livesAbroad:
                        newInvitationResponse.data
                            ?.updateWeddingInvitationResponse?.address
                            ?.livesAbroad ?? false,
                    country: {
                        label:
                            countriesOptions.find(
                                (country) =>
                                    country.value ===
                                    newInvitationResponse.data
                                        ?.updateWeddingInvitationResponse
                                        ?.address?.country
                            )?.label ??
                            countriesOptions.find(
                                (country) => country.value === 'NL'
                            )?.label ??
                            '',
                        value:
                            countriesOptions.find(
                                (country) =>
                                    country.value ===
                                    newInvitationResponse.data
                                        ?.updateWeddingInvitationResponse
                                        ?.address?.country
                            )?.value ??
                            countriesOptions.find(
                                (country) => country.value === 'NL'
                            )?.value,
                    },
                },
            });
        } catch (error) {
            console.error('error', error);
            toast({
                title: 'Error',
                description:
                    error instanceof Error
                        ? error.message
                        : 'Oeps er is iets misgegaan',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return {
        methods,
        onSubmit,
        mutationData,
    };
};

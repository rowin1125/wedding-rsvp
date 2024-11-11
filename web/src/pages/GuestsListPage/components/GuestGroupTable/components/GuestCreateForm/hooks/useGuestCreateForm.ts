import { useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GuestWeddingResponseStatus } from 'types/graphql';
import { array, boolean, InferType, object, string } from 'yup';

import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import { useCreateGuest } from './useCreateGuest';

export const guestValidationSchema = object().shape({
    firstName: string().required('Voornaam is verplicht'),
    lastName: string().required('Achternaam is verplicht'),
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
});

type UseGuestCreateFormType = {
    guestGroupId: string;
    disclosure: ReturnType<typeof useDisclosure>;
};

export const useGuestCreateForm = ({
    guestGroupId,
    disclosure,
}: UseGuestCreateFormType) => {
    const { wedding } = useGetWeddingById();
    const toast = useToast();

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dietary: [],
        isChild: false,
        notes: '',
        dayPartsPresent:
            wedding?.dayParts.map((dayPart) => ({
                guestWeddingResponseStatus: 'UNKNOWN',
                weddingDayPartId: dayPart.id,
            })) ?? [],
    };

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(guestValidationSchema),
        mode: 'onBlur',
    });

    const { createGuest, loading } = useCreateGuest();

    const onSubmit = async (data: InferType<typeof guestValidationSchema>) => {
        const guestResponse = await createGuest({
            variables: {
                input: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    dietary:
                        data.dietary?.map((diet) => diet.value ?? '') ?? [],
                    isChild: data.isChild,
                    notes: data.notes,
                    guestGroupId,
                    guestOrigin: 'GUEST_LIST',
                    dayPartsPresent: data.dayPartsPresent.map((dayPart) => ({
                        guestWeddingResponseStatus:
                            dayPart.guestWeddingResponseStatus as GuestWeddingResponseStatus,
                        weddingDayPartId: dayPart.weddingDayPartId,
                    })),
                },
            },
        });

        if (guestResponse.data?.createGuest.id) {
            toast({
                title: 'Gast toegevoegd',
                description: `${guestResponse.data?.createGuest.firstName} ${guestResponse.data?.createGuest.lastName} is toegevoegd aan de gastenlijst`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            methods.reset({
                firstName: guestResponse.data?.createGuest.firstName,
                lastName: guestResponse.data?.createGuest.lastName,
                email: guestResponse.data?.createGuest.email ?? '',
                phoneNumber: guestResponse.data?.createGuest.phoneNumber ?? '',
                dietary: guestResponse.data?.createGuest.dietary.map(
                    (diet) => ({
                        label: diet ?? '',
                        value: diet ?? '',
                    })
                ),
                dayPartsPresent:
                    guestResponse.data?.createGuest.guestDayPartsPresents?.map(
                        (dayPart) => ({
                            guestWeddingResponseStatus:
                                dayPart?.guestWeddingResponseStatus ??
                                'UNKNOWN',
                            weddingDayPartId: dayPart?.weddingDayPartId,
                        })
                    ),
                isChild: guestResponse.data?.createGuest.isChild ?? false,
                notes: guestResponse.data?.createGuest.notes ?? '',
            });
            disclosure.onClose();
        }
    };

    return {
        methods,
        onSubmit,
        loading,
    };
};

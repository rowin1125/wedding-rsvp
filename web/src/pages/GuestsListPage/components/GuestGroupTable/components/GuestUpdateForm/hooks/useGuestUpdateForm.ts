import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GetGuestById } from 'types/graphql';
import { object, string, boolean, array, InferType } from 'yup';

import { dietaryOptions } from 'src/config/guestList';

import { useUpdateGuestById } from './useUpdateGuestById';

type UseGuestUpdateFormType = {
    guest: GetGuestById['guest'];
};

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
});

export const useGuestUpdateForm = ({ guest }: UseGuestUpdateFormType) => {
    const toasts = useToast();

    const defaultValues = {
        firstName: guest?.firstName ?? '',
        lastName: guest?.lastName ?? '',
        email: guest?.email ?? '',
        phoneNumber: guest?.phoneNumber ?? '',
        dietary:
            guest?.dietary.map((diet) => ({
                label:
                    dietaryOptions.find((option) => option.value === diet)
                        ?.label ??
                    diet ??
                    '',
                value: diet ?? '',
            })) ?? [],
        isChild: guest?.isChild ?? false,
        notes: guest?.notes ?? '',
    };

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(guestValidationSchema),
        mode: 'onBlur',
    });

    const { updateGuestById, loading } = useUpdateGuestById();

    const onSubmit = async (data: InferType<typeof guestValidationSchema>) => {
        if (!guest?.id) {
            toasts({
                title: 'Er is iets misgegaan',
                description: 'Geen gast gevonden',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }

        const guestResponse = await updateGuestById({
            variables: {
                id: guest.id,
                input: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    dietary:
                        data.dietary?.map((diet) => diet.value ?? '') ?? [],
                    isChild: data.isChild,
                    notes: data.notes,
                },
            },
        });

        toasts({
            title: 'Gast bijgewerkt',
            description: 'De gast is bijgewerkt',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });

        methods.reset({
            dietary: guestResponse.data?.updateGuest?.dietary.map((diet) => ({
                label:
                    dietaryOptions.find((option) => option.value === diet)
                        ?.label ??
                    diet ??
                    '',
                value: diet ?? '',
            })),
            email: guestResponse.data?.updateGuest?.email ?? '',
            firstName: guestResponse.data?.updateGuest?.firstName,
            isChild: guestResponse.data?.updateGuest?.isChild,
            lastName: guestResponse.data?.updateGuest?.lastName,
            notes: guestResponse.data?.updateGuest?.notes ?? '',
            phoneNumber: guestResponse.data?.updateGuest?.phoneNumber ?? '',
        });
    };

    return {
        guest,
        methods,
        onSubmit,
        loading,
    };
};

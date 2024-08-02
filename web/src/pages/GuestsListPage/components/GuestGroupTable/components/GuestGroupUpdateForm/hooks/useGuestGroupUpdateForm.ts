import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GetGuestGroupById, GuestGroupType } from 'types/graphql';
import { boolean, InferType, object, string } from 'yup';

import {
    countriesOptions,
    GUEST_GROUP_MAP,
    guestGroupTypeOptions,
} from 'src/config/guestList';

import { useUpdateGuestGroupById } from './useUpdateGuestGroupById';

type UseGuestGroupFormType = {
    guestGroup: GetGuestGroupById['guestGroup'];
};

export const guestGroupValidationSchema = object().shape({
    guestGroupRelationType: string().required('Relatie is verplicht'),
    guestGroupType: string()
        .oneOf(guestGroupTypeOptions.map((option) => option.value))
        .required('Type gastengroep is verplicht'),
    name: string(),
    address: object({
        street: string(),
        houseNumber: string(),
        zipCode: string(),
        city: string(),
        country: object().shape({
            label: string(),
            value: string(),
        }),
        livesAbroad: boolean().required(
            'Woonachtig in het buitenland wel/niet is verplicht'
        ),
    }),
});

export const useGuestGroupUpdateForm = ({
    guestGroup,
}: UseGuestGroupFormType) => {
    const toast = useToast();
    const country = countriesOptions.find(
        (country) => country.value === guestGroup?.address?.country
    );

    const defaultValues = {
        guestGroupRelationType: guestGroup?.guestGroupRelationType ?? '',
        guestGroupType: guestGroup?.guestGroupType ?? '',
        name: guestGroup?.name ?? '',
        address: {
            street: guestGroup?.address?.street ?? '',
            houseNumber: guestGroup?.address?.houseNumber ?? '',
            zipCode: guestGroup?.address?.zipCode ?? '',
            city: guestGroup?.address?.city ?? '',
            country: {
                value: country?.value ?? '',
                label: country?.label ?? '',
            },
            livesAbroad: guestGroup?.address?.livesAbroad ?? false,
        },
    };

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(guestGroupValidationSchema),
        mode: 'onBlur',
    });

    const { updateGuestGroupById, loading } = useUpdateGuestGroupById();

    const onSubmit = async (
        data: InferType<typeof guestGroupValidationSchema>
    ) => {
        if (!guestGroup?.id || !guestGroup?.address?.id) {
            toast({
                title: 'Er is iets misgegaan',
                description: !guestGroup?.id
                    ? 'Geen gastengroep gevonden'
                    : 'Geen adres gevonden',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const guestGroupResponse = await updateGuestGroupById({
            variables: {
                id: guestGroup?.id,
                input: {
                    guestGroupRelationType: data.guestGroupRelationType,
                    guestGroupType: data.guestGroupType as GuestGroupType,
                    name: data.name,
                    address: {
                        id: guestGroup?.address?.id,
                        input: {
                            street: data.address.street ?? '',
                            houseNumber: data.address.houseNumber ?? '',
                            zipCode: data.address.zipCode,
                            city: data.address.city,
                            livesAbroad: data.address.livesAbroad,
                            country: data.address.country.value,
                        },
                    },
                },
            },
        });

        toast({
            title: 'Gastengroep bijgewerkt',
            description: 'De gastengroep is bijgewerkt',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        methods.reset({
            name: guestGroupResponse.data?.updateGuestGroup?.name ?? '',
            guestGroupRelationType:
                guestGroupResponse.data?.updateGuestGroup
                    .guestGroupRelationType ?? '',
            guestGroupType:
                guestGroupResponse.data?.updateGuestGroup?.guestGroupType ?? '',
            address: {
                street:
                    guestGroupResponse.data?.updateGuestGroup?.address
                        ?.street ?? '',
                houseNumber:
                    guestGroupResponse.data?.updateGuestGroup?.address
                        ?.houseNumber ?? '',
                zipCode:
                    guestGroupResponse.data?.updateGuestGroup?.address
                        ?.zipCode ?? '',
                city:
                    guestGroupResponse.data?.updateGuestGroup?.address?.city ??
                    '',
                livesAbroad:
                    guestGroupResponse.data?.updateGuestGroup?.address
                        ?.livesAbroad ?? false,
            },
        });
    };

    const guestGroupType = methods.watch('guestGroupType');
    const isFamily = guestGroupType === GUEST_GROUP_MAP.FAMILY;

    return {
        methods,
        onSubmit,
        loading,
        isFamily,
    };
};

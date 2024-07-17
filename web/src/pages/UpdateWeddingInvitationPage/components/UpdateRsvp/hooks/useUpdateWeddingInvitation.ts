import { useToast } from '@chakra-ui/react';
import {
    CreateWeddingGuestInput,
    GetGuestInvitationByIdQuery,
    UpdateWeddingInvitationMutation,
    UpdateWeddingInvitationMutationVariables,
} from 'types/graphql';
import { InferType, array, object, string } from 'yup';

import { useMutation } from '@redwoodjs/web';

export const UPDATE_WEDDING_INVITATION = gql`
    mutation UpdateWeddingInvitationMutation(
        $input: UpdateWeddingInvitationInput!
        $id: String!
    ) {
        updateWeddingInvitation(input: $input, id: $id) {
            dietaryWishes
            email
            id
            invitationType
            useCouponCode
            presence
            remarks
            wedding {
                date
                id
                name
            }
            weddingGuests {
                id
                name
                weddingId
                weddingInvitationId
            }
            weddingId
        }
    }
`;

type UseUpdateWeddingInvitation = {
    weddingInvitation: NonNullable<
        GetGuestInvitationByIdQuery['weddingInvitation']
    >;
};

export const useUpdateWeddingInvitation = ({
    weddingInvitation,
}: UseUpdateWeddingInvitation) => {
    const toast = useToast();
    const [updateWeddingInvitation, mutationMeta] = useMutation<
        UpdateWeddingInvitationMutation,
        UpdateWeddingInvitationMutationVariables
    >(UPDATE_WEDDING_INVITATION, {
        onCompleted: () => {
            toast({
                title: 'Jullie wijzigingen zijn succesvol doorgegeven.',
                status: 'success',
            });
        },
        onError: () => {
            toast({
                title: 'Er is iets misgegaan bij het doorgeven van je wijzigen.',
                status: 'error',
            });
        },
    });

    const initialWeddingInvitationValues = {
        email: weddingInvitation?.email ?? '',
        presence: weddingInvitation?.presence.toString() ?? 'true',
        useCouponCode: weddingInvitation?.useCouponCode.toString() ?? 'false',
        weddingGuests:
            weddingInvitation?.weddingGuests.map((guest) => ({
                firstName: guest?.firstName || guest?.name?.split(' ')[0] || '',
                lastName: guest?.lastName || guest?.name?.split(' ')[1] || '',
            })) ?? [],
        dietaryWishes: weddingInvitation?.dietaryWishes ?? '',
        remarks: weddingInvitation?.remarks ?? '',
    };

    const validationSchema = object({
        email: string()
            .email('Niet geldig emailadres')
            .required('Verplicht veld'),
        presence: string().required('Verplicht veld').oneOf(['true', 'false']),
        useCouponCode: string().when('presence', {
            is: (presence: string) => presence === 'true',
            then: (schema) =>
                schema.required('Verplicht veld').oneOf(['true', 'false']),
        }),
        weddingGuests: array()
            .of(
                object({
                    firstName: string(),
                    lastName: string(),
                })
            )
            .when('presence', {
                is: (presence: string) => presence === 'true',
                then: (schema) =>
                    schema.of(
                        object({
                            firstName: string().required('Verplicht veld'),
                            lastName: string().required('Verplicht veld'),
                        })
                    ),
            }),
        dietaryWishes: string().when('presence', {
            is: (presence: string) =>
                presence === 'true' &&
                weddingInvitation.invitationType === 'DAY',
            then: (schema) => schema.required('Verplicht veld'),
        }),
        remarks: string(),
    });

    const handleUpdateWeddingInvitation = async (
        values: InferType<typeof validationSchema>
    ) => {
        const { weddingGuests, ...rest } = values;

        const weddingGuestsInput: CreateWeddingGuestInput[] =
            weddingGuests?.map((guest) => ({
                weddingId: weddingInvitation.weddingId,
                firstName: guest.firstName,
                lastName: guest.lastName,
                name: `${guest.firstName} ${guest.lastName}`,
            })) || [];

        return updateWeddingInvitation({
            variables: {
                id: weddingInvitation.id,
                input: {
                    ...rest,
                    presence: values.presence === 'true',
                    useCouponCode: values.useCouponCode === 'true',
                    invitationType: weddingInvitation.invitationType,
                    weddingId: weddingInvitation.weddingId,
                    weddingGuests: [...weddingGuestsInput],
                },
            },
        });
    };

    return {
        initialValues: initialWeddingInvitationValues,
        validationSchema,
        updateWeddingInvitation: handleUpdateWeddingInvitation,
        ...mutationMeta,
    };
};

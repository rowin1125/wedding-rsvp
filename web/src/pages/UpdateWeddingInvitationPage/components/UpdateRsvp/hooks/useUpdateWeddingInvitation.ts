import {
    GetGuestInvitationByIdQuery,
    UpdateWeddingInvitationMutation,
    UpdateWeddingInvitationMutationVariables,
} from 'types/graphql';
import { array, boolean, object, string } from 'yup';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

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
    const [updateWeddingInvitation, mutationMeta] = useMutation<
        UpdateWeddingInvitationMutation,
        UpdateWeddingInvitationMutationVariables
    >(UPDATE_WEDDING_INVITATION, {
        onCompleted: () => {
            toast.success('Jullie wijzigingen zijn succesvol doorgegeven.');
        },
        onError: () => {
            toast.error(
                'Er is iets misgegaan bij het doorgeven van je wijzigen.'
            );
        },
    });

    const initialWeddingInvitationValues = {
        email: weddingInvitation?.email ?? '',
        presence: weddingInvitation?.presence.toString() ?? '',
        useCouponCode: weddingInvitation?.useCouponCode.toString() ?? '',
        weddingGuests: weddingInvitation?.weddingGuests ?? [],
        dietaryWishes: weddingInvitation?.dietaryWishes ?? '',
        remarks: weddingInvitation?.remarks ?? '',
    };

    const validationSchema = object({
        email: string()
            .email('Niet geldig emailadres')
            .required('Verplicht veld'),
        presence: boolean().required('Verplicht veld'),
        useCouponCode: boolean().when('presence', {
            is: (presence: boolean) => presence,
            then: (schema) => schema.required('Verplicht veld'),
        }),
        weddingGuests: array().when('presence', {
            is: (presence: boolean) => presence,
            then: (schema) =>
                schema.of(
                    object({
                        name: string().required('Verplicht veld'),
                    })
                ),
        }),
        dietaryWishes: string().when('presence', {
            is: (presence: boolean) =>
                presence && weddingInvitation?.invitationType === 'DAY',
            then: (schema) => schema.required('Verplicht veld'),
        }),
        remarks: string(),
    });

    const handleUpdateWeddingInvitation = async (
        values: typeof initialWeddingInvitationValues
    ) => {
        const { weddingGuests, ...rest } = values;

        const weddingGuestsInput = weddingGuests.map((guest) => ({
            weddingId: weddingInvitation.weddingId,
            name: guest?.name || '',
        }));

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

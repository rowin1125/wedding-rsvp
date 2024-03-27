import {
    CreateWeddingInvitationMutation,
    CreateWeddingInvitationMutationVariables,
    InvitationType,
} from 'types/graphql';
import { array, object, string, InferType } from 'yup';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

export const CREATE_WEDDING_INVITATION = gql`
    mutation CreateWeddingInvitationMutation(
        $input: CreateWeddingInvitationInput!
    ) {
        createWeddingInvitation(input: $input) {
            id
        }
    }
`;

type UseCreateWeddingInvitation = {
    invitationType: InvitationType;
};

export const initialWeddingInvitationValues = {
    email: '',
    presence: 'true',
    weddingGuests: [
        {
            firstName: '',
            lastName: '',
        },
    ],
    dietaryWishes: '',
    useCouponCode: 'false',
    remarks: '',
};

export const useCreateWeddingInvitation = ({
    invitationType,
}: UseCreateWeddingInvitation) => {
    const { weddingId } = useParams();

    const [createWeddingInvitation, mutationMeta] = useMutation<
        CreateWeddingInvitationMutation,
        CreateWeddingInvitationMutationVariables
    >(CREATE_WEDDING_INVITATION, {
        onCompleted: () => {
            toast.success(
                'Bedankt voor het doorgeven van jullie aanwezigheid! Bekijk de bevestiging in je mailbox (check ook je spamfolder)!',
                {
                    duration: 10000,
                }
            );
        },
        onError: () => {
            toast.error(
                'Er is iets misgegaan bij het doorgeven van jullie aanwezigheid.'
            );
        },
    });

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
                presence === 'true' && invitationType === 'DAY',
            then: (schema) => schema.required('Verplicht veld'),
        }),
        remarks: string(),
    });

    const handleCreateWeddingInvitation = async (
        values: InferType<typeof validationSchema>
    ) => {
        const { weddingGuests, ...rest } = values;

        const weddingGuestsInput =
            weddingGuests?.map((guest) => ({
                weddingId: weddingId,
                firstName: guest.firstName,
                lastName: guest.lastName,
            })) || [];

        return createWeddingInvitation({
            variables: {
                input: {
                    ...rest,
                    presence: values.presence === 'true',
                    useCouponCode: values.useCouponCode === 'true',
                    invitationType,
                    weddingId,
                    weddingGuests: [...weddingGuestsInput],
                },
            },
        });
    };

    return {
        initialValues: initialWeddingInvitationValues,
        validationSchema,
        createWeddingInvitation: handleCreateWeddingInvitation,
        ...mutationMeta,
    };
};

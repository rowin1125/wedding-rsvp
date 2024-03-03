import {
    CreateWeddingInvitationMutation,
    CreateWeddingInvitationMutationVariables,
    InvitationType,
} from 'types/graphql';
import { array, boolean, object, string } from 'yup';

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
        presence: boolean().required('Verplicht veld'),
        weddingGuests: array().when('presence', {
            is: (presence: boolean) => presence,
            then: (schema) =>
                schema.of(
                    object({
                        firstName: string().required('Verplicht veld'),
                        lastName: string().required('Verplicht veld'),
                    })
                ),
        }),
        dietaryWishes: string().when('presence', {
            is: (presence: boolean) => presence && invitationType === 'DAY',
            then: (schema) => schema.required('Verplicht veld'),
        }),
        useCouponCode: boolean().when('presence', {
            is: (presence: boolean) => presence,
            then: (schema) => schema.required('Verplicht veld'),
        }),
        remarks: string(),
    });

    const handleCreateWeddingInvitation = async (
        values: typeof initialWeddingInvitationValues
    ) => {
        const { weddingGuests, ...rest } = values;

        const weddingGuestsInput = weddingGuests.map((guest) => ({
            weddingId: weddingId,
            firstName: guest.firstName,
            lastName: guest.lastName,
        }));

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

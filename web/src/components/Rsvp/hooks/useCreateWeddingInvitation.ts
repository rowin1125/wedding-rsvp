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
    name: '',
    email: '',
    presence: 'false',
    weddingGuests: [
        {
            name: '',
        },
    ],
    dietaryWishes: '',
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
                'Bedankt voor het doorgeven van jullie aanwezigheid!'
            );
        },
        onError: () => {
            toast.error(
                'Er is iets misgegaan bij het doorgeven van jullie aanwezigheid.'
            );
        },
    });

    const validationSchema = object({
        name: string().required('Verplicht veld'),
        email: string()
            .email('Niet geldig emailadres')
            .required('Verplicht veld'),
        presence: boolean().required('Verplicht veld'),
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
            is: (presence: boolean) => presence && invitationType === 'DAY',
            then: (schema) => schema.required('Verplicht veld'),
        }),
        remarks: string(),
    });

    const handleCreateWeddingInvitation = async (
        values: typeof initialWeddingInvitationValues
    ) => {
        const { weddingGuests, name, ...rest } = values;

        const weddingGuestsInput = weddingGuests.map((guest) => ({
            weddingId: weddingId,
            name: guest.name,
        }));

        return createWeddingInvitation({
            variables: {
                input: {
                    ...rest,
                    presence: values.presence === 'true',
                    invitationType,
                    weddingId,
                    weddingGuests: [
                        {
                            name,
                            weddingId,
                        },
                        ...weddingGuestsInput,
                    ],
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

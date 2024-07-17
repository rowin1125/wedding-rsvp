import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    CreateWeddingInvitationMutation,
    CreateWeddingInvitationMutationVariables,
    InvitationType,
} from 'types/graphql';
import { array, object, string, InferType } from 'yup';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

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
    const toast = useToast();

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

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialWeddingInvitationValues,
        mode: 'onBlur',
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

        await createWeddingInvitation({
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
        methods.reset();
    };

    const [createWeddingInvitation, mutationMeta] = useMutation<
        CreateWeddingInvitationMutation,
        CreateWeddingInvitationMutationVariables
    >(CREATE_WEDDING_INVITATION, {
        onCompleted: () => {
            toast({
                title: 'Bedankt voor het doorgeven van jullie aanwezigheid!',
                description:
                    'Bekijk de bevestiging in je mailbox (check ook je spamfolder)!',
                status: 'success',
                duration: 10000,
            });
        },
        onError: () => {
            toast({
                title: 'Er is iets misgegaan bij het doorgeven van jullie aanwezigheid.',
                status: 'error',
            });
        },
    });

    return {
        initialValues: initialWeddingInvitationValues,
        validationSchema,
        createWeddingInvitation: handleCreateWeddingInvitation,
        methods,
        ...mutationMeta,
    };
};

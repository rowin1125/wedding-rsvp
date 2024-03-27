import React from 'react';

import { Alert, AlertIcon, Spinner, Link, Text } from '@chakra-ui/react';
import {
    ResendActivateUserMutation,
    ResendActivateUserMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

type ResendVerificationMailProps = {
    showResendButton: boolean;
    setShowResendButton: (value: boolean) => void;
    email: string;
};

export const RESEND_ACTIVATE_USER = gql`
    mutation ResendActivateUserMutation($input: ResendActivateUserInput!) {
        resendActivateUser(input: $input) {
            id
            verifiedToken
        }
    }
`;

const ResendVerificationMail = ({
    showResendButton,
    email,
    setShowResendButton,
}: ResendVerificationMailProps) => {
    const [resend, { loading: resendLoading }] = useMutation<
        ResendActivateUserMutation,
        ResendActivateUserMutationVariables
    >(RESEND_ACTIVATE_USER, {
        onCompleted: () => {
            setShowResendButton(false);
            toast.success('Activation email sent');
        },
    });

    const handleResend = async () =>
        await resend({
            variables: {
                input: {
                    email,
                },
            },
        });

    if (!showResendButton) return null;
    return (
        <Alert status="warning" mt={8}>
            <AlertIcon />

            <Text>
                Heb je geen email ontvangen? Verstuur hem dan nogmaals{' '}
                {resendLoading ? (
                    <Spinner as="span" ml={2} size="xs" />
                ) : (
                    <Link
                        textDecoration="underline"
                        onClick={handleResend}
                        mt={8}
                        role="button"
                        colorScheme="secondary"
                    >
                        hier
                    </Link>
                )}
            </Text>
        </Alert>
    );
};

export default ResendVerificationMail;

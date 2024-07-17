import { useEffect, useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import AuthScreen from 'src/components/AuthScreen';

import ResetPasswordForm from './components/ResetPasswordForm';

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
    const { isAuthenticated, validateResetToken } = useAuth();
    const [enabled, setEnabled] = useState(true);
    const toast = useToast();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.dashboard());
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const validateToken = async () => {
            const response = await validateResetToken(resetToken);

            if (response.error) {
                setEnabled(false);
                toast({
                    title: 'Er is iets fout gegaan',
                    description: response.error,
                    status: 'error',
                });
            } else {
                setEnabled(true);
            }
        };
        validateToken();
    }, [resetToken, validateResetToken]);

    return (
        <>
            <Metadata title="Reset Wachtwoord" />

            <main>
                <AuthScreen
                    imageSrc={
                        'https://images.prismic.io/derow-v1/ZjZskEMTzAJOCiHL_weddingDrinks.jpg?auto=format,compress'
                    }
                    title="Bijna klaar"
                    description="Nog even je wachtwoord instellen en dan ben je weer ready"
                >
                    <ResetPasswordForm
                        resetToken={resetToken}
                        enabled={!enabled}
                    />
                </AuthScreen>
            </main>
        </>
    );
};

export default ResetPasswordPage;

import { useEffect, useState } from 'react';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import AuthScreen from 'src/components/AuthScreen';

import ResetPasswordForm from './components/ResetPasswordForm';
import imageSrc from './images/weddingDrinks.jpg';

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
    const { isAuthenticated, validateResetToken } = useAuth();
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.dashboard());
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const validateToken = async () => {
            const response = await validateResetToken(resetToken);
            console.log('response', response);
            if (response.error) {
                setEnabled(false);
                toast.error(response.error);
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
                <Toaster
                    toastOptions={{ className: 'rw-toast', duration: 6000 }}
                />
                <AuthScreen
                    imageSrc={imageSrc}
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

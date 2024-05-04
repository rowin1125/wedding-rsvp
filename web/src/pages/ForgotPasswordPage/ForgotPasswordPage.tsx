import { useEffect } from 'react';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import AuthScreen from 'src/components/AuthScreen';

import ForgotPasswordForm from './components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.dashboard());
        }
    }, [isAuthenticated]);

    return (
        <>
            <Metadata title="Wachtwoord vergeten" />

            <main>
                <Toaster
                    toastOptions={{ className: 'rw-toast', duration: 6000 }}
                />
                <AuthScreen
                    title="Geeft niks!"
                    description="Kan gebeuren, vul je email in en we sturen je een link om je wachtwoord te resetten"
                    imageSrc={
                        'https://images.prismic.io/derow-v1/ZjZt7EMTzAJOCiHY_flower-bride.jpg?auto=format,compress'
                    }
                >
                    <ForgotPasswordForm />
                </AuthScreen>
            </main>
        </>
    );
};

export default ForgotPasswordPage;

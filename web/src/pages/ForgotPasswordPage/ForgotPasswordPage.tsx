import { useEffect } from 'react';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import AuthScreen from 'src/components/AuthScreen';

import ForgotPasswordForm from './components/ForgotPasswordForm';
import flowerBride from './images/flower-bride.jpg';

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
                    imageSrc={flowerBride}
                >
                    <ForgotPasswordForm />
                </AuthScreen>
            </main>
        </>
    );
};

export default ForgotPasswordPage;

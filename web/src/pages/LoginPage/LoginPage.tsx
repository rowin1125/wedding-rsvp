import { useEffect } from 'react';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import AuthScreen from 'src/components/AuthScreen';

import LoginForm from './components/LoginForm';
import imageSrc from './images/weddingWhiteFlowers.jpg';

const LoginPage = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.dashboard());
        }
    }, [isAuthenticated]);

    return (
        <>
            <Metadata title="Aanmelden" />

            <main>
                <Toaster
                    toastOptions={{ className: 'rw-toast', duration: 6000 }}
                />
                <AuthScreen
                    imageSrc={imageSrc}
                    title="Inloggen"
                    description="Het plannen van je bruiloft was nog nooit zo eenvoudig"
                >
                    <LoginForm />
                </AuthScreen>
            </main>
        </>
    );
};

export default LoginPage;

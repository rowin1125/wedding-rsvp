import { useEffect } from 'react';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';
import AuthScreen from 'src/components/AuthScreen';

import SignupForm from './components/SignupForm';
import weddingImg from './images/WeddingRing.jpg';

const SignupPage = () => {
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
                    imageSrc={weddingImg}
                    title="Aanmelden"
                    description="Het plannen van je bruiloft was nog nooit zo eenvoudig"
                >
                    <SignupForm />
                </AuthScreen>
            </main>
        </>
    );
};

export default SignupPage;

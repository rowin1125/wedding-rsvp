import { Metadata } from '@redwoodjs/web';
import { Toaster } from '@redwoodjs/web/dist/toast';

import AuthScreen from 'src/components/AuthScreen';

import ActivateForm from './components/ActivateForm';
import imageSrc from './images/beach-wedding.jpg';

const ActivatePage = () => {
    return (
        <>
            <Metadata
                title="Account activeren"
                description="Voordat je verder kunt gaan, moet je je account activeren. We hebben een email gestuurd naar het opgegeven emailadres. Klik op de link in de email om je account te activeren."
            />

            <main>
                <Toaster
                    toastOptions={{ className: 'rw-toast', duration: 6000 }}
                />

                <AuthScreen
                    imageSrc={imageSrc}
                    title="Account activeren"
                    description="Bijna klaar om je bruiloft te organiseren? Activeer je account en ga aan de slag!"
                >
                    <ActivateForm />
                </AuthScreen>
            </main>
        </>
    );
};

export default ActivatePage;

import { Metadata } from '@redwoodjs/web';

import AuthScreen from 'src/components/AuthScreen';

import ActivateForm from './components/ActivateForm';

const ActivatePage = () => {
    return (
        <>
            <Metadata
                title="Account activeren"
                description="Voordat je verder kunt gaan, moet je je account activeren. We hebben een email gestuurd naar het opgegeven emailadres. Klik op de link in de email om je account te activeren."
            />

            <main>
                <AuthScreen
                    imageSrc={
                        'https://images.prismic.io/derow-v1/ZjZuGEMTzAJOCiHa_beach-wedding.jpg?auto=format,compress'
                    }
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

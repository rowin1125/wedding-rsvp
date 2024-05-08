import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import CreateWeddingForm from './components/CreateWeddingForm/CreateWeddingForm';
import UpdateWeddingForm from './components/UpdateWeddingForm/UpdateWeddingForm';

const WeddingSettingsPage = () => {
    const { wedding, loading, called } = useGetWeddingById();
    const noWedding = !called && !loading && !wedding;

    return (
        <>
            <Metadata
                title="Bruiloft instellingen"
                description="Bruiloft instellingen pagina"
            />
            <Hero />
            <AppContentWrapper>
                {noWedding ? <CreateWeddingForm /> : <UpdateWeddingForm />}
            </AppContentWrapper>
        </>
    );
};

export default WeddingSettingsPage;

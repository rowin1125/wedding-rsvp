import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import AdminContentWrapper from 'src/layouts/AdminLayout/components/AdminContentWrapper';

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
            <AdminContentWrapper>
                {noWedding ? <CreateWeddingForm /> : <UpdateWeddingForm />}
            </AdminContentWrapper>
        </>
    );
};

export default WeddingSettingsPage;

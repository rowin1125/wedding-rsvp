import { MetaTags } from '@redwoodjs/web';

import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import CreateWeddingForm from './components/CreateWeddingForm/CreateWeddingForm';
import UpdateWeddingForm from './components/UpdateWeddingForm/UpdateWeddingForm';

const WeddingSettingsPage = () => {
    const { wedding, loading, called } = useGetWeddingById();

    const noWedding = !called && !loading && !wedding;
    if (noWedding) return <CreateWeddingForm />;

    return (
        <>
            <MetaTags
                title="Bruiloft instellingen"
                description="Bruiloft instellingen pagina"
            />

            <UpdateWeddingForm />
        </>
    );
};

export default WeddingSettingsPage;

import { Container } from '@chakra-ui/react';

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
            <Hero
                url={wedding?.bannerImage?.asset.url}
                previewUrl={wedding?.bannerImage?.asset.previewUrl}
                fileType={wedding?.bannerImage?.asset.fileType || 'image'}
                imageProps={{
                    objectPosition: wedding?.bannerImage?.metadata
                        ? `${wedding?.bannerImage?.metadata?.focalPoint?.x}% ${wedding?.bannerImage?.metadata?.focalPoint?.y}%`
                        : 'center',
                }}
            />
            <AppContentWrapper>
                <Container>
                    {noWedding ? <CreateWeddingForm /> : <UpdateWeddingForm />}
                </Container>
            </AppContentWrapper>
        </>
    );
};

export default WeddingSettingsPage;

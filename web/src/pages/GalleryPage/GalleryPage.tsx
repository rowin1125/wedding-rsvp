import { Metadata } from '@redwoodjs/web';

import Gallery from 'src/components/Gallery';
import Hero from 'src/components/Hero';
import { useControlHero } from 'src/components/Hero/hooks/useControlHero';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import { GalleryPaginationProvider } from './hooks/useGalleryPagination';

const GalleryPage = () => {
    const { heroData, setHeroData } = useControlHero({
        initialValues: {
            title: 'Foto galerij',
            subtitle: 'Bekijk hier de foto’s van onze bruiloft',
            image: 'https://images.prismic.io/derow-v1/ZjZskEMTzAJOCiHL_weddingDrinks.jpg?auto=format,compress',
            fileType: 'image',
        },
    });

    return (
        <>
            <Metadata title="Galerij pagina" description="Gallery page" />

            <Hero {...heroData} />
            <AppContentWrapper p={0} setHeroData={setHeroData}>
                <GalleryPaginationProvider>
                    <Gallery />
                </GalleryPaginationProvider>
            </AppContentWrapper>
        </>
    );
};

export default GalleryPage;

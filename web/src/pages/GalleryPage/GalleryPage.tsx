import { Metadata } from '@redwoodjs/web';

import Gallery from 'src/components/Gallery';
import Hero from 'src/components/Hero';
import { useControlHero } from 'src/components/Hero/hooks/useControlHero';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import { DEFAULT_GALLERY_PAGINATION_OFFSET } from '../GalleriesPage/components/GalleryForm/hooks/useGalleryForm';

import { QueryControlsProvider } from './hooks/useQueryControls';

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
                <QueryControlsProvider
                    defaultOffset={DEFAULT_GALLERY_PAGINATION_OFFSET}
                >
                    <Gallery />
                </QueryControlsProvider>
            </AppContentWrapper>
        </>
    );
};

export default GalleryPage;

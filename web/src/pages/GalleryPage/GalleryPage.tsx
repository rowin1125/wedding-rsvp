import { Metadata } from '@redwoodjs/web';

import Gallery from 'src/components/Gallery';
import Hero from 'src/components/Hero';
import { useControlHero } from 'src/components/Hero/hooks/useControlHero';
import AdminContentWrapper from 'src/layouts/AdminLayout/components/AdminContentWrapper';

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
            <AdminContentWrapper p={0} setHeroData={setHeroData}>
                <GalleryPaginationProvider>
                    <Gallery />
                </GalleryPaginationProvider>
            </AdminContentWrapper>
        </>
    );
};

export default GalleryPage;

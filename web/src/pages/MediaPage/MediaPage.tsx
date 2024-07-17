import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';
import { useControlHero } from 'src/components/Hero/hooks/useControlHero';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import { QueryControlsProvider } from '../GalleryPage/hooks/useQueryControls';

import MediaScreen from './components/MediaScreen';
import { DEFAULT_MEDIA_PAGINATION_OFFSET } from './hooks/useGetMediaAssets';

const MediaPage = () => {
    const { heroData, setHeroData } = useControlHero({
        initialValues: {
            title: 'Media bibliotheek',
            subtitle: 'Beheer hier al jouw media bestanden',
            image: 'https://images.prismic.io/derow-v1/ZjZskEMTzAJOCiHL_weddingDrinks.jpg?auto=format,compress',
            fileType: 'image',
        },
    });

    return (
        <>
            <Metadata title="Media" description="Al jouw media bestanden" />

            <Hero {...heroData} />

            <QueryControlsProvider
                defaultOffset={DEFAULT_MEDIA_PAGINATION_OFFSET}
            >
                <AppContentWrapper p={0} setHeroData={setHeroData}>
                    <MediaScreen />
                </AppContentWrapper>
            </QueryControlsProvider>
        </>
    );
};

export default MediaPage;

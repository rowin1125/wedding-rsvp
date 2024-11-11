import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';
import { useControlHero } from 'src/components/Hero/hooks/useControlHero';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import { QueryControlsProvider } from '../GalleryPage/hooks/useQueryControls';

import MediaScreen from './components/MediaScreen';
import { DEFAULT_MEDIA_PAGINATION_OFFSET } from './hooks/useGetMediaAssets';

const MediaPage = () => {
    const { wedding } = useGetWeddingById();
    const { heroData, setHeroData } = useControlHero({
        initialValues: {
            title: 'Media bibliotheek',
            subtitle: 'Beheer hier al jouw media bestanden',
            url: wedding?.bannerImage?.asset.url,
            previewUrl: wedding?.bannerImage?.asset.previewUrl,
            fileType: wedding?.bannerImage?.asset.fileType || 'image',
        },
    });

    return (
        <>
            <Metadata title="Media" description="Al jouw media bestanden" />

            <Hero
                {...heroData}
                color="white"
                imageProps={{
                    objectPosition: wedding?.bannerImage?.metadata
                        ? `${wedding?.bannerImage?.metadata?.focalPoint?.x}% ${wedding?.bannerImage?.metadata?.focalPoint?.y}%`
                        : 'center',
                }}
            />

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

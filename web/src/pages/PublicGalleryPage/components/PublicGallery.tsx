import React from 'react';

import { Box, Container } from '@chakra-ui/react';

import ImagesTab from 'src/components/Gallery/components/ImagesTab';
import { useFindGallery } from 'src/components/Gallery/hooks/useFindGallery';
import Hero from 'src/components/Hero';
import Loader from 'src/components/Loader';

const PublicGallery = () => {
    const { gallery, loading } = useFindGallery();

    if (loading || !gallery) return <Loader />;

    return (
        <Box>
            <Hero
                title={gallery.name || 'Foto galerij'}
                subtitle="Bekijk of upload hier de foto’s van onze bruiloft"
                url={gallery.bannerImage?.asset.url}
                fileType={gallery.bannerImage?.asset.fileType}
                previewUrl={gallery.bannerImage?.asset.previewUrl}
                objectPosition={
                    gallery.bannerImage?.metadata
                        ? `${gallery.bannerImage?.metadata?.focalPoint?.x}% ${gallery.bannerImage?.metadata?.focalPoint?.y}%`
                        : 'center'
                }
                h={'40vh'}
            />
            <Container my={10}>
                <ImagesTab gallery={gallery} isPublic />
            </Container>
        </Box>
    );
};

export default PublicGallery;

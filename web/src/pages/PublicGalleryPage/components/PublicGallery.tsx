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
                h={'40vh'}
            />
            <Container my={10} maxW="8xl">
                <ImagesTab gallery={gallery} isPublic />
            </Container>
        </Box>
    );
};

export default PublicGallery;

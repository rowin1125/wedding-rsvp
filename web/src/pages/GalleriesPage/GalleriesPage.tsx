import {
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';
import Loader from 'src/components/Loader';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import CreateNewGallery from './components/CreateNewGallery';
import GalleryForm from './components/GalleryForm';
import GalleryItem from './components/GalleryItem/GalleryItem';
import { useGetGalleries } from './hooks/useGetGalleries';

const GalleriesPage = () => {
    const { galleries, loading } = useGetGalleries();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { wedding } = useGetWeddingById();

    const hasGallery = galleries && galleries?.length > 0;

    return (
        <>
            <Metadata
                title="Galerijen pagina"
                description="Galerijen pagina's"
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
                title="Foto galerij"
                color="white"
                subtitle="Bekijk hier de foto’s van jullie bruiloft"
            />

            <Container>
                <AppContentWrapper>
                    <Flex w="full" justifyContent="space-between" mb={4}>
                        <Button
                            size={{ base: 'sm', lg: 'md' }}
                            as={Link}
                            to={routes.dashboard()}
                            variant="outline"
                        >
                            {'< Dashboard'}
                        </Button>
                        <Button
                            size={{ base: 'sm', lg: 'md' }}
                            onClick={onOpen}
                        >
                            Maak nog een album aan
                        </Button>
                    </Flex>
                    {loading && !hasGallery && <Loader />}
                    {!hasGallery && !loading && <CreateNewGallery />}
                    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={6} mt={10}>
                        {galleries?.map((gallery) => (
                            <GalleryItem key={gallery.id} gallery={gallery} />
                        ))}
                    </Grid>
                </AppContentWrapper>
            </Container>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody pb={8}>
                        <Heading as="h2" size="h1">
                            Nieuwe galerij
                        </Heading>
                        <GalleryForm formType="create" onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GalleriesPage;

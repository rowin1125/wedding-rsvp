import {
    Button,
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
import AdminContentWrapper from 'src/layouts/AdminLayout/components/AdminContentWrapper';

import CreateNewGallery from './components/CreateNewGallery';
import GalleryForm from './components/GalleryForm';
import GalleryItem from './components/GalleryItem/GalleryItem';
import { useGetGalleries } from './hooks/useGetGalleries';

const GalleriesPage = () => {
    const { galleries, loading } = useGetGalleries();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const hasGallery = galleries && galleries?.length > 0;

    return (
        <>
            <Metadata
                title="Galerijen pagina"
                description="Galerijen pagina's"
            />
            <Hero
                image="/weddingDrinks.jpg"
                imageProps={{
                    objectPosition: 'top',
                }}
                title="Foto galerij"
                subtitle="Bekijk hier de foto’s van jullie bruiloft"
                h="300px"
            />

            {loading && <Loader />}
            <AdminContentWrapper>
                <Flex w="full" justifyContent="space-between" mb={4}>
                    <Button
                        size={{ base: 'sm', lg: 'md' }}
                        as={Link}
                        to={routes.dashboard()}
                        variant="outline"
                    >
                        {'< Dashboard'}
                    </Button>
                    <Button size={{ base: 'sm', lg: 'md' }} onClick={onOpen}>
                        Maak nog een album aan
                    </Button>
                </Flex>
                {!hasGallery && <CreateNewGallery />}
                <Grid gridTemplateColumns="repeat(3, 1fr)" gap={6} mt={10}>
                    {galleries?.map((gallery) => (
                        <GalleryItem key={gallery.id} gallery={gallery} />
                    ))}
                </Grid>
            </AdminContentWrapper>
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

import React from 'react';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { FindGalleryQuery } from 'types/graphql';

import { routes } from '@redwoodjs/router';
import { Link } from '@redwoodjs/router';

import DeleteDialog from 'src/components/DeleteDialog/DeleteDialog';
import GalleryForm from 'src/pages/GalleriesPage/components/GalleryForm';

import DownloadZip from './components/DownloadZip';
import { useDeleteGallery } from './hooks/useDeleteGallery';

type SettingsTabProps = {
    gallery: NonNullable<FindGalleryQuery['gallery']>;
};

const SettingsTab = ({ gallery }: SettingsTabProps) => {
    const { deleteGallery, loading } = useDeleteGallery();

    return (
        <Box>
            <Flex justifyContent="space-between" mb={10}>
                <Button
                    size={{ base: 'sm', lg: 'md' }}
                    as={Link}
                    to={routes.galleries()}
                    variant="outline"
                >
                    {'< Terug naar galerijen'}
                </Button>
            </Flex>
            <Box maxW="xl">
                <DownloadZip gallery={gallery} />
                <Box mt={8}>
                    <Heading as="h2" size="h2">
                        Update galerij naam
                    </Heading>
                    <GalleryForm formType="update" initialData={gallery} />
                    <Box mt={10}>
                        <Box
                            borderColor="red.500"
                            borderWidth="2px"
                            borderRadius="lg"
                            p={4}
                        >
                            <Heading as="h3" size="md" color="red.500">
                                Danger-zone
                            </Heading>
                            <Text mt={4}>
                                Hier kun je jouw galerij verwijderen. Alle
                                bijbehoorende data wordt ook verwijderd en kan
                                niet meer teruggehaald worden.
                            </Text>
                            <DeleteDialog
                                onDelete={deleteGallery}
                                title="Verwijder galerij"
                                buttonLabel="Verwijder galerij"
                                buttonProps={{ ml: 0, mt: 4 }}
                                id={gallery.id}
                                loading={loading}
                            >
                                <Text>
                                    Weet je zeker dat je de galerij wilt
                                    verwijderen? Dit kan niet ongedaan worden.
                                </Text>
                            </DeleteDialog>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsTab;

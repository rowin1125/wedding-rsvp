import React from 'react';

import { GridItem, Box, Button, Icon, Heading } from '@chakra-ui/react';
import { BiEditAlt } from 'react-icons/bi';
import { GetGalleriesQuery } from 'types/graphql';

import { routes } from '@redwoodjs/router';
import { Link } from '@redwoodjs/router';

import { GALLERY_TABS } from 'src/components/Gallery/Gallery';
import ResolveAssetType from 'src/components/ImageGallery/components/ResolveAssetType';

type GalleryItemProps = {
    gallery: GetGalleriesQuery['galleries'][number];
};

const GalleryItem = ({ gallery }: GalleryItemProps) => {
    return (
        <GridItem
            cursor="pointer"
            colSpan={{ base: 3, lg: 1 }}
            shadow="xl"
            position="relative"
            h={{
                base: '200px',
                lg: '400px',
            }}
            rounded="lg"
            overflow="hidden"
            _hover={{
                shadow: '2xl',
                textDecoration: 'none',
            }}
            transition="0.3s ease-in-out all"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <ResolveAssetType
                fileType={gallery.assets?.items?.[0]?.fileType ?? 'image'}
                imageProps={{
                    src: gallery.assets?.items?.[0]?.url,
                    alt: gallery.name,
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    inset: 0,
                    filter: 'brightness(0.7) sepia(0.5)',
                }}
                videoProps={{
                    src: gallery.assets?.items?.[0]?.url,
                    objectFit: 'cover',
                    position: 'absolute',
                    inset: 0,
                    w: 'full',
                    h: 'full',
                    filter: 'brightness(0.7) sepia(0.5)',
                }}
            />
            <Box
                bgImage={
                    gallery.assets?.items?.[0]?.url ??
                    'https://images.prismic.io/derow-v1/ZjZskEMTzAJOCiHL_weddingDrinks.jpg?auto=format,compress'
                }
                bgSize="cover"
                inset={0}
                position="absolute"
                filter="brightness(0.7) sepia(0.5)"
                as={Link}
                to={routes.gallery({
                    galleryId: gallery.id,
                })}
            />
            <Button
                aria-label="Edit"
                position="absolute"
                variant="outline"
                colorScheme="tertiary"
                right={4}
                top={4}
                as={Link}
                to={routes.gallery({
                    galleryId: gallery.id,
                    tab: GALLERY_TABS.SETTINGS,
                })}
            >
                <Icon as={BiEditAlt} color="white" />
            </Button>

            <Box
                position="relative"
                as={Link}
                to={routes.gallery({ galleryId: gallery.id })}
            >
                <Heading color="white" textAlign="center">
                    {gallery.name}
                </Heading>
            </Box>
        </GridItem>
    );
};

export default GalleryItem;

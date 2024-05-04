import React from 'react';

import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { BiPhotoAlbum, BiPlus } from 'react-icons/bi';
import { FindGalleryQuery } from 'types/graphql';

import { routes } from '@redwoodjs/router';
import { Link } from '@redwoodjs/router';

import ImageGallery from 'src/components/ImageGallery/ImageGallery';
import Pagination from 'src/components/Pagination';
import {
    DEFAULT_PAGINATION_OFFSET,
    useGalleryPagination,
} from 'src/pages/GalleryPage/hooks/useGalleryPagination';

import { useCreateAssets } from '../../hooks/useCreateAssets';
import { useDeleteAsset } from '../../hooks/useDeleteAsset';

import CreateAssetModal from './components/CreateAssetModal';

type ImagesTabProps = {
    gallery: NonNullable<FindGalleryQuery['gallery']>;
    isPublic?: boolean;
};

const ImagesTab = ({ gallery, isPublic }: ImagesTabProps) => {
    const { assets, weddingId } = gallery;
    const assetManager = useCreateAssets({ weddingId });
    const { deleteAsset, loading } = useDeleteAsset({
        id: gallery.id,
    });

    const { currentPage, setCurrentPage, totalPages, offset } =
        useGalleryPagination();

    const hasAssets = assets?.items?.length > 0;
    const maxImages = Math.min(
        currentPage * DEFAULT_PAGINATION_OFFSET,
        gallery.assets.count
    );

    return (
        <Box>
            <Flex justifyContent={isPublic ? 'flex-end' : 'space-between'}>
                {!isPublic && (
                    <Button
                        size={{ base: 'sm', lg: 'md' }}
                        as={Link}
                        to={routes.galleries()}
                        variant="outline"
                    >
                        {'< Terug naar galerijen'}
                    </Button>
                )}
                <Button
                    size={{ base: 'sm', lg: 'md' }}
                    onClick={assetManager.modalDisclosure.onOpen}
                >{`Foto's toevoegen`}</Button>
            </Flex>
            {!hasAssets && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                >
                    <Heading textAlign="center">
                        Voeg de eerste fotos toe:{' '}
                    </Heading>
                    <Flex my={10} justifyContent="center">
                        <Button
                            variant="ghost"
                            h={{
                                base: '200px',
                                lg: '400px',
                            }}
                            w={{
                                base: '200px',
                                lg: '400px',
                            }}
                            borderColor="secondary.500"
                            borderStyle="dashed"
                            borderWidth="1px"
                            justifyContent="center"
                            onClick={assetManager.modalDisclosure.onOpen}
                            alignItems="center"
                            transition="all 0.3s ease"
                            _hover={{
                                bg: 'primary.600',
                            }}
                            _active={{
                                bg: 'primary.800',
                            }}
                        >
                            <Icon
                                as={BiPhotoAlbum}
                                fontSize={{
                                    base: '75px',
                                    lg: '150px',
                                }}
                                color="secondary.500"
                            />
                            <Icon
                                as={BiPlus}
                                fontSize={{
                                    base: '75px',
                                    lg: '150px',
                                }}
                                color="secondary.500"
                            />
                        </Button>
                    </Flex>
                </Flex>
            )}
            {hasAssets && (
                <>
                    <ImageGallery
                        containerWidth="full"
                        galleryType="grid"
                        gridGap="4"
                        images={assets.items}
                        deleteCallback={async (id) => {
                            await deleteAsset({
                                variables: { id },
                            });
                        }}
                        deleteLoading={loading}
                    />
                    <Flex
                        justifyContent={isPublic ? 'flex-end' : 'space-between'}
                        mt={6}
                    >
                        {!isPublic && (
                            <Button
                                size={{ base: 'sm', lg: 'md' }}
                                as={Link}
                                to={routes.galleries()}
                                variant="outline"
                            >
                                {'< Terug naar galerijen'}
                            </Button>
                        )}
                        <Button
                            size={{ base: 'sm', lg: 'md' }}
                            onClick={assetManager.modalDisclosure.onOpen}
                        >{`Foto's toevoegen`}</Button>
                    </Flex>
                    <Pagination
                        currentPage={currentPage}
                        pages={totalPages}
                        setCurrentPage={setCurrentPage}
                        subPagination={{
                            totalCount: gallery.assets.count,
                            end: maxImages,
                            start: offset + 1,
                        }}
                    />
                </>
            )}
            <CreateAssetModal assetManager={assetManager} />
        </Box>
    );
};

export default ImagesTab;

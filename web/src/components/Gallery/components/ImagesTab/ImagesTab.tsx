import React from 'react';

import { Box, Button, Flex } from '@chakra-ui/react';
import { FindGalleryQuery } from 'types/graphql';

import { routes } from '@redwoodjs/router';
import { Link } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import ImageGallery from 'src/components/ImageGallery/ImageGallery';
import Pagination from 'src/components/Pagination';
import { DEFAULT_GALLERY_PAGINATION_OFFSET } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';
import { useQueryControls } from 'src/pages/GalleryPage/hooks/useQueryControls';
import MediaLibraryAssetSelection from 'src/pages/MediaPage/components/MediaLibraryAssetSelection';
import { useDeleteAssets } from 'src/pages/MediaPage/hooks/useDeleteAssets';

import { useCreateAssets } from '../../hooks/useCreateAssets';

import CreateAssetModal from './components/CreateAssetModal';
import NoAssets from './components/NoAssets';

type ImagesTabProps = {
    gallery: NonNullable<FindGalleryQuery['gallery']>;
    isPublic?: boolean;
    handleSelectAsset?: (
        event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string
    ) => void;
    selectedAssets?: string[];
    allIsSelected?: boolean;
    setSelectedAssets?: (selectedAssets: string[]) => void;
};

const ImagesTab = ({
    gallery,
    isPublic,
    allIsSelected,
    handleSelectAsset,
    selectedAssets,
    setSelectedAssets,
}: ImagesTabProps) => {
    const { currentUser } = useAuth();
    const { assets, weddingId } = gallery;
    const assetManager = useCreateAssets({
        gcloudPath: `galleries/${weddingId}/${gallery.id}`,
        weddingId,
    });

    const { deleteAssets, loading } = useDeleteAssets({
        type: 'gallery',
        id: gallery.id,
    });

    const { currentPage, setCurrentPage, totalPages, offset } =
        useQueryControls();

    const hasAssets = assets?.items?.length > 0;
    const maxImages = Math.min(
        currentPage * DEFAULT_GALLERY_PAGINATION_OFFSET,
        gallery.assets.count
    );
    const isOwnWedding = currentUser?.weddingId === gallery.weddingId;

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
                        {'< Terug'}
                        <Box
                            as="span"
                            display={{
                                base: 'none',
                                lg: 'inline',
                            }}
                            ml={1}
                        >
                            naar gallerijen
                        </Box>{' '}
                    </Button>
                )}
                <Flex>
                    <Button
                        size={{ base: 'sm', lg: 'md' }}
                        onClick={assetManager.modalDisclosure.onOpen}
                    >{`Foto's toevoegen`}</Button>
                </Flex>
            </Flex>
            {!hasAssets && (
                <NoAssets
                    modalDisclosure={assetManager.modalDisclosure}
                    loading={false}
                />
            )}
            {setSelectedAssets && (
                <Flex
                    justifyContent="space-between"
                    flexDir={{ base: 'column-reverse', lg: 'row' }}
                    mt={10}
                >
                    <Button
                        size="sm"
                        variant="outline"
                        colorScheme="secondary"
                        isDisabled={(gallery?.assets.count ?? 0) <= 0}
                        onClick={() =>
                            setSelectedAssets(
                                allIsSelected
                                    ? []
                                    : gallery?.assets.items.map(
                                          (asset) => asset?.id ?? ''
                                      ) ?? []
                            )
                        }
                    >
                        {allIsSelected
                            ? 'Deselecteer alles'
                            : 'Selecteer alles'}
                    </Button>
                </Flex>
            )}
            {handleSelectAsset && selectedAssets && setSelectedAssets && (
                <MediaLibraryAssetSelection
                    selectedAssets={selectedAssets}
                    setSelectedAssets={setSelectedAssets}
                    type="gallery"
                />
            )}
            {hasAssets && (
                <>
                    <ImageGallery
                        containerWidth="large"
                        galleryType="grid"
                        gridGap="4"
                        images={assets.items}
                        {...(isOwnWedding
                            ? {
                                  deleteCallback: async (id) => {
                                      await deleteAssets({
                                          variables: { ids: [id] },
                                      });
                                  },
                              }
                            : {})}
                        deleteLoading={loading}
                        handleSelectAsset={handleSelectAsset}
                        selectedAssets={selectedAssets}
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
                                {'< Terug'}
                                <Box
                                    as="span"
                                    display={{
                                        base: 'none',
                                        lg: 'inline',
                                    }}
                                    ml={1}
                                >
                                    naar gallerijen
                                </Box>{' '}
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

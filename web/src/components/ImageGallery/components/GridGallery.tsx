import React from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Grid, GridItem, IconButton, useDisclosure } from '@chakra-ui/react';

import { useAuth } from 'src/auth';
import { WEDDING_OWNER } from 'src/lib/contants';

import ResolveAssetType from './ResolveAssetType';

export type GridSettingsType = 'full' | 'large' | 'medium' | 'small';

type GridGalleryProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: (Record<string, any> | null)[];
    modalControls: ReturnType<typeof useDisclosure>;
    containerWidth?: GridSettingsType;
    deleteLoading: boolean;
    gridGap?: string;
    deleteCallback?: (id: string) => void;
    setInitialIndex: (index: number) => void;
};

const resolveHeight = (containerWidth?: GridSettingsType) => {
    switch (containerWidth) {
        case 'full':
            return {
                base: '300px',
                lg: '400px',
            };

        case 'large':
            return {
                base: '200px',
                lg: '300px',
            };

        case 'medium':
            return {
                base: '150px',
                lg: '200px',
            };

        case 'small':
            return {
                base: '125px',
                lg: '150px',
            };

        default:
            return {
                base: '200px',
                lg: '300px',
            };
    }
};

const GridGallery = ({
    modalControls,
    images,
    containerWidth,
    gridGap,
    deleteCallback,
    setInitialIndex,
    deleteLoading,
}: GridGalleryProps) => {
    const { currentUser, hasRole } = useAuth();
    const { onOpen } = modalControls;
    const gridMap = {
        '0': '0px',
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
    };
    const isOwner = hasRole(WEDDING_OWNER);

    return (
        <Grid
            templateColumns="repeat(4, 1fr)"
            gap={gridMap[gridGap as keyof typeof gridGap] || 0}
        >
            {images?.map((image, index) => {
                if (!image || !image.id) return null;

                return (
                    <GridItem
                        colSpan={{ base: 2, lg: 1 }}
                        key={`image-${index}`}
                        position="relative"
                        h={resolveHeight(containerWidth)}
                        cursor={'zoom-in'}
                    >
                        {deleteCallback && currentUser && isOwner && (
                            <IconButton
                                position="absolute"
                                top={2}
                                right={2}
                                variant="solid"
                                isLoading={deleteLoading}
                                isDisabled={deleteLoading}
                                colorScheme="red"
                                aria-label="Remove file"
                                onClick={() => deleteCallback(image.id)}
                                zIndex={1}
                                size={{
                                    base: 'sm',
                                    lg: 'md',
                                }}
                                icon={<DeleteIcon color="white" />}
                            />
                        )}
                        <ResolveAssetType
                            imageProps={{
                                src: image.url,
                                thumbnailUrl: image.thumbnailUrl,
                                w: 'full',
                                h: 'full',
                                objectFit: 'cover',
                                loading: 'lazy',
                                onClick: () => {
                                    setInitialIndex(index);
                                    onOpen();
                                },
                                inset: 0,
                                position: 'absolute',
                                borderRadius: 'xl',
                                shadow: 'xl',
                            }}
                            fileType={image.fileType}
                            videoProps={{
                                objectFit: 'cover',
                                src: image.url,
                                onClick: () => {
                                    setInitialIndex(index);
                                    modalControls.onOpen();
                                },
                                cursor: 'zoom-in',
                            }}
                        />
                    </GridItem>
                );
            })}
        </Grid>
    );
};

export default GridGallery;

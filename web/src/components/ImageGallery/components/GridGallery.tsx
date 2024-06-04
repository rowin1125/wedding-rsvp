import React from 'react';

import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import {
    Grid,
    GridItem,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react';
import { BiDotsVertical } from 'react-icons/bi';

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

                const handleDownload = async () => {
                    window.open(image.url);
                };

                return (
                    <GridItem
                        colSpan={{ base: 2, lg: 1 }}
                        key={`image-${index}`}
                        position="relative"
                        h={resolveHeight(containerWidth)}
                        cursor={'zoom-in'}
                    >
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<BiDotsVertical />}
                                variant="solid"
                                position="absolute"
                                right={2}
                                top={2}
                                zIndex={1}
                                isDisabled={deleteLoading}
                                isLoading={deleteLoading}
                            />
                            <MenuList>
                                <MenuItem
                                    icon={<DownloadIcon color="blue.500" />}
                                    onClick={handleDownload}
                                    isDisabled={deleteLoading}
                                >
                                    Download origineel
                                </MenuItem>
                                {deleteCallback && currentUser && isOwner && (
                                    <MenuItem
                                        icon={<DeleteIcon color="red.500" />}
                                        onClick={() => deleteCallback(image.id)}
                                    >
                                        Verwijder bestand
                                    </MenuItem>
                                )}
                            </MenuList>
                        </Menu>
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

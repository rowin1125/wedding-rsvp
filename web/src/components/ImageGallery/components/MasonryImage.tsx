import React, { useMemo } from 'react';

import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import {
    Box,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react';
import { BiDotsVertical } from 'react-icons/bi';

import { useAuth } from 'src/auth';
import { useIsDevice } from 'src/hooks/useIsDevice';
import { WEDDING_OWNER } from 'src/lib/contants';

import ResolveAssetType from './ResolveAssetType';

type MasonryImageProps = {
    modalControls: ReturnType<typeof useDisclosure>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: Record<string, any>;
    deleteLoading: boolean;
    setInitialIndex: (index: number) => void;
    deleteCallback?: (id: string) => void;
    index: number;
};

const getRandomHeight = (min = 150, max = 800) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const MasonryImage = ({
    modalControls,
    image,
    deleteCallback,
    setInitialIndex,
    index,
    deleteLoading,
}: MasonryImageProps) => {
    const { isDesktop } = useIsDevice();
    const { currentUser, hasRole } = useAuth();

    const randomHeight = useMemo(() => {
        if (isDesktop) {
            return getRandomHeight(300, 500);
        }
        return getRandomHeight(150, 300);
    }, [isDesktop]);

    if (!image || !image.id) return null;
    const isOwner = hasRole(WEDDING_OWNER);

    const handleDownload = async () => {
        window.open(image.url);
    };

    return (
        <Box
            w="full"
            borderRadius="xl"
            overflow="hidden"
            shadow="xl"
            position="relative"
            height={randomHeight}
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
                fileType={image.fileType}
                imageProps={{
                    src: image.url,
                    thumbnailUrl: image.thumbnailUrl,
                    mb: 2,
                    w: 'full',
                    h: 'full',

                    objectFit: {
                        base: 'cover',
                    },
                    loading: 'lazy',
                    onClick: () => {
                        setInitialIndex(index);
                        modalControls.onOpen();
                    },
                    inset: 0,
                    position: 'absolute',
                    cursor: 'zoom-in',
                }}
                videoProps={{
                    src: image.url,
                    onClick: () => {
                        setInitialIndex(index);
                        modalControls.onOpen();
                    },
                    objectFit: 'cover',
                    cursor: 'zoom-in',
                }}
            />
        </Box>
    );
};

export default MasonryImage;

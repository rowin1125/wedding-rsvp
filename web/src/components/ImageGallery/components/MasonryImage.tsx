import React, { useMemo } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';

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

    return (
        <Box
            w="full"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            height={randomHeight}
        >
            {deleteCallback && currentUser && isOwner && (
                <IconButton
                    position="absolute"
                    top={2}
                    right={2}
                    variant="solid"
                    colorScheme="red"
                    isLoading={deleteLoading}
                    isDisabled={deleteLoading}
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
                fileType={image.fileType}
                imageProps={{
                    src: image.url,
                    mb: 2,
                    w: 'full',
                    h: 'full',
                    objectFit: {
                        base: 'contain',
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

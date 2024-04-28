/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';

import GridGallery, { GridSettingsType } from './components/GridGallery';
import ImageModal from './components/ImageModal';
import MasonryGallery from './components/MasonryGallery';

type ImageGalleryProps = {
    images: (Record<string, any> | null)[];
    containerWidth: GridSettingsType;
    galleryType: 'masonry' | 'grid';
    gridGap: string;
    deleteCallback?: (id: string) => void;
    deleteLoading: boolean;
};

const ImageGallery = ({
    images,
    containerWidth,
    galleryType,
    gridGap,
    deleteCallback,
    deleteLoading,
}: ImageGalleryProps) => {
    const modalControls = useDisclosure();
    const [initialIndex, setInitialIndex] = React.useState<number>(0);

    const isMasonry = galleryType === 'masonry';
    const isGrid = galleryType === 'grid';

    if (!images || images.length === 0) return null;

    return (
        <>
            <Box>
                <Box mb={16}></Box>
                {isMasonry && (
                    <MasonryGallery
                        images={images}
                        modalControls={modalControls}
                        gridGap={gridGap}
                        deleteCallback={deleteCallback}
                        deleteLoading={deleteLoading}
                        setInitialIndex={setInitialIndex}
                    />
                )}
                {isGrid && (
                    <GridGallery
                        images={images}
                        modalControls={modalControls}
                        containerWidth={containerWidth}
                        gridGap={gridGap}
                        deleteCallback={deleteCallback}
                        setInitialIndex={setInitialIndex}
                        deleteLoading={deleteLoading}
                    />
                )}
            </Box>
            <ImageModal
                initialIndex={initialIndex}
                images={images}
                {...modalControls}
            />
        </>
    );
};

export default ImageGallery;

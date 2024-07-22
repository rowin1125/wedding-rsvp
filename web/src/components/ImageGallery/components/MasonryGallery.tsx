import React from 'react';

import { useDisclosure } from '@chakra-ui/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import MasonryImage from './MasonryImage';

type MasonryGalleryProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: (Record<string, any> | null)[];
    modalControls: ReturnType<typeof useDisclosure>;
    gridGap?: string;
    deleteLoading: boolean;
    setInitialIndex: (index: number) => void;
    deleteCallback?: (id: string) => void;
    selectedAssets?: string[];
    handleSelectAsset?: (
        event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string
    ) => void;
};

const MasonryGallery = ({
    images,
    modalControls,
    gridGap = '0',
    deleteCallback,
    deleteLoading,
    setInitialIndex,
    handleSelectAsset,
    selectedAssets,
}: MasonryGalleryProps) => {
    const gridMap = {
        '0': '0px',
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
    };

    return (
        <>
            <ResponsiveMasonry
                columnsCountBreakPoints={{
                    350: 2,
                    750: 2,
                    900: 3,
                    1024: 4,
                }}
            >
                <Masonry
                    columnsCount={4}
                    gutter={gridMap[gridGap as keyof typeof gridMap]}
                >
                    {images?.map((image, index) => {
                        if (!image) return null;

                        return (
                            <MasonryImage
                                index={index}
                                deleteLoading={deleteLoading}
                                key={image?.url}
                                setInitialIndex={setInitialIndex}
                                image={image}
                                modalControls={modalControls}
                                deleteCallback={deleteCallback}
                                selectedAssets={selectedAssets}
                                handleSelectAsset={handleSelectAsset}
                            />
                        );
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </>
    );
};

export default MasonryGallery;

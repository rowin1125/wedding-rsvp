import React from 'react';

import { Grid, GridItem, Box } from '@chakra-ui/react';
import { GetMediaAssets } from 'types/graphql';

import ResolveAssetType from 'src/components/ImageGallery/components/ResolveAssetType';

type SelectAssetModalGridProps = {
    mediaLibrary: GetMediaAssets['mediaLibrary'];
    handleClickAsset: (assetId: string) => void;
    hasAssets?: boolean;
};

const SelectAssetModalGrid = ({
    mediaLibrary,
    handleClickAsset,
    hasAssets,
}: SelectAssetModalGridProps) => {
    if (!hasAssets) return null;

    return (
        <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            gap={{
                base: 2,
                lg: 6,
            }}
            w="full"
            mt={6}
        >
            {mediaLibrary?.assets?.items?.map((asset) => {
                if (!asset) return null;

                return (
                    <GridItem
                        colSpan={{ base: 6, lg: 4, xl: 3 }}
                        key={asset?.id}
                        _hover={{
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: 'primary.500',
                            borderTopRadius: 'xl',
                        }}
                        border="1px solid transparent"
                        transition="all 0.3s ease"
                        onClick={() => handleClickAsset(asset.id)}
                    >
                        <Box
                            shadow="lg"
                            minH="200px"
                            position="relative"
                            borderRadius="xl"
                            overflow="hidden"
                        >
                            <ResolveAssetType
                                fileType={asset.fileType}
                                imageProps={{
                                    src: asset.url,
                                    thumbnailUrl: asset.thumbnailUrl,
                                    mb: 2,
                                    w: 'full',
                                    h: 'full',
                                    objectFit: {
                                        base: 'cover',
                                    },
                                    loading: 'lazy',
                                    inset: 0,
                                    position: 'absolute',
                                }}
                                videoProps={{
                                    src: asset.url,
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    inset: 0,
                                }}
                            />
                        </Box>
                    </GridItem>
                );
            })}
        </Grid>
    );
};

export default SelectAssetModalGrid;

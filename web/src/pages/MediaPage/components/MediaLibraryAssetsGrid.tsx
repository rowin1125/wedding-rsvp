import React from 'react';

import {
    Grid,
    GridItem,
    Box,
    Button,
    Checkbox,
    useDisclosure,
    Text,
} from '@chakra-ui/react';
import { GetMediaAssets } from 'types/graphql';

import NoAssets from 'src/components/Gallery/components/ImagesTab/components/NoAssets';
import { useCreateAssets } from 'src/components/Gallery/hooks/useCreateAssets';
import ResolveAssetType from 'src/components/ImageGallery/components/ResolveAssetType';
import { truncateText } from 'src/helpers/textHelpers/truncateText/truncateText';

type MediaLibraryAssetsGridProps = {
    mediaLibrary: GetMediaAssets['mediaLibrary'];
    setCurrentAsset: (
        asset: NonNullable<GetMediaAssets['mediaLibrary']>['assets']['items'][0]
    ) => void;
    modalDisclosure: ReturnType<typeof useDisclosure>;
    handleSelectAsset: (
        event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string
    ) => void;
    selectedAssets: string[];
    hasAssets?: boolean;
    assetManager: ReturnType<typeof useCreateAssets>;
    loading: boolean;
    searchQuery?: string;
};

const MediaLibraryAssetsGrid = ({
    mediaLibrary,
    setCurrentAsset,
    modalDisclosure,
    handleSelectAsset,
    selectedAssets,
    hasAssets,
    assetManager,
    loading,
    searchQuery,
}: MediaLibraryAssetsGridProps) => {
    if (!hasAssets)
        return (
            <NoAssets
                modalDisclosure={assetManager.modalDisclosure}
                loading={loading}
                hasAssets={hasAssets}
                searchQuery={searchQuery}
            />
        );

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
                        colSpan={{ base: 6, lg: 4, xl: 2 }}
                        key={asset?.id}
                        _hover={{
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: 'primary.500',
                            borderTopRadius: 'xl',
                        }}
                        border="1px solid transparent"
                        transition="all 0.3s ease"
                        borderBottomRadius="lg"
                    >
                        <Box
                            shadow="lg"
                            minH="200px"
                            position="relative"
                            borderTopRadius="xl"
                            overflow="hidden"
                            onClick={() => {
                                setCurrentAsset(asset);
                                modalDisclosure.onOpen();
                            }}
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
                        <Button
                            variant="ghost"
                            w="full"
                            onClick={(e) => handleSelectAsset(e, asset.id)}
                            justifyContent="flex-start"
                        >
                            <Checkbox
                                size="sm"
                                onClick={(e) => handleSelectAsset(e, asset.id)}
                                colorScheme="tertiary"
                                mr={2}
                                isChecked={selectedAssets.includes(asset.id)}
                            />
                            <Text fontSize="xx-small">
                                {truncateText(
                                    asset.originalFilename ??
                                        `${asset.id}.${asset.fileType}`,
                                    20
                                )}
                            </Text>
                        </Button>
                    </GridItem>
                );
            })}
        </Grid>
    );
};

export default MediaLibraryAssetsGrid;

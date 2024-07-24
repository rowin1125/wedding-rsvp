import React, { useMemo } from 'react';

import { Box, Flex, Button, Text, Tooltip } from '@chakra-ui/react';
import { GetMediaAssets } from 'types/graphql';

import DeleteAssetsDialog from './DeleteAssetsDialog';

type MediaLibraryAssetSelectionProps = {
    selectedAssets: string[];
    setSelectedAssets: (value: string[]) => void;
    type: 'media' | 'gallery';
    mediaLibrary?: GetMediaAssets['mediaLibrary'];
};

const MediaLibraryAssetSelection = ({
    selectedAssets,
    setSelectedAssets,
    type,
    mediaLibrary,
}: MediaLibraryAssetSelectionProps) => {
    const hasAssetsSelected = selectedAssets.length > 0;

    const assetWithReference = useMemo(() => {
        const assets = mediaLibrary?.assets?.items?.filter(
            (asset) =>
                selectedAssets.includes(asset?.id ?? '') &&
                asset?.assetReferences &&
                asset?.assetReferences?.length > 0
        );

        return assets?.[0];
    }, [mediaLibrary, selectedAssets]);
    const hasAssetsInUse = !!assetWithReference;

    if (!hasAssetsSelected) return null;

    return (
        <>
            <Box as="hr" mt={6} pb={hasAssetsSelected ? 0 : 6} />
            <Box bg="gray.50" py={1}>
                <Flex alignItems="center">
                    <Text fontSize="xs" fontWeight="bold" px={4}>
                        {selectedAssets.length} bestanden geselecteerd
                    </Text>
                    <Button
                        size="sm"
                        variant="ghost"
                        fontSize="xs"
                        fontWeight="semibold"
                        onClick={() => setSelectedAssets([])}
                    >
                        Annuleren
                    </Button>

                    <Tooltip
                        isDisabled={!hasAssetsInUse}
                        shouldWrapChildren
                        label={`Een van de geselecteerde bestanden is in gebruik, verwijder eerst de referenties zodat we er zeker van zijn dat er nergens een pagina kapot gaat. Het bestand dat in gebruik is: ${assetWithReference?.originalFilename}`}
                    >
                        <DeleteAssetsDialog
                            isDisabled={!!hasAssetsInUse}
                            selectedAssets={selectedAssets}
                            setSelectedAssets={setSelectedAssets}
                            type={type}
                        />
                    </Tooltip>
                </Flex>
            </Box>
        </>
    );
};

export default MediaLibraryAssetSelection;

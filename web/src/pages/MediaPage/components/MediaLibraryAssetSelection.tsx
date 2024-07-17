import React from 'react';

import { Box, Flex, Button, Text } from '@chakra-ui/react';

import DeleteAssetsDialog from './DeleteAssetsDialog';

type MediaLibraryAssetSelectionProps = {
    selectedAssets: string[];
    setSelectedAssets: (value: string[]) => void;
};

const MediaLibraryAssetSelection = ({
    selectedAssets,
    setSelectedAssets,
}: MediaLibraryAssetSelectionProps) => {
    const hasAssetsSelected = selectedAssets.length > 0;
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

                    <DeleteAssetsDialog
                        selectedAssets={selectedAssets}
                        setSelectedAssets={setSelectedAssets}
                    />
                </Flex>
            </Box>
        </>
    );
};

export default MediaLibraryAssetSelection;

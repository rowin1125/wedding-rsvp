import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

type MediaLibraryNoAssetsFoundProps = {
    loading: boolean;
    searchQuery?: string;
    hasAssets?: boolean;
};

const MediaLibraryNoAssetsFound = ({
    hasAssets,
    loading,
    searchQuery,
}: MediaLibraryNoAssetsFoundProps) => {
    if (loading || !searchQuery || hasAssets) return null;

    return (
        <Flex
            justifyContent="center"
            flexDir="column"
            alignItems="center"
            mt={4}
        >
            <Text fontSize="lg">
                Geen bestanden gevonden op basis van de zoekopdracht:
            </Text>
            <Text mt={4} fontSize="4xl">
                <Box as="span" fontSize="6xl">
                    {'"'}
                </Box>
                <strong>{searchQuery}</strong>
                <Box as="span" fontSize="6xl">
                    {'"'}
                </Box>
            </Text>
        </Flex>
    );
};

export default MediaLibraryNoAssetsFound;

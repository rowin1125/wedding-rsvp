import React from 'react';

import { Flex, Box, Heading, Button } from '@chakra-ui/react';

import { navigate, routes } from '@redwoodjs/router';

type SelectAssetModalGridNoAssetsProps = {
    hasAssets?: boolean;
};
const SelectAssetModalGridNoAssets = ({
    hasAssets,
}: SelectAssetModalGridNoAssetsProps) => {
    if (hasAssets) return null;

    return (
        <Flex justifyContent="center" alignContent="center">
            <Box>
                <Heading as="h3" size="md" mb={10}>
                    Geen assets gevonden
                </Heading>
                <Button
                    variant="outline"
                    onClick={() => {
                        navigate(routes.media());
                    }}
                >
                    Naar bibliotheek
                </Button>
            </Box>
        </Flex>
    );
};

export default SelectAssetModalGridNoAssets;

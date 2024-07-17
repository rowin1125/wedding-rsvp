import React from 'react';

import { Flex, Button, Icon } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa6';

import { Link, routes } from '@redwoodjs/router';

import { useCreateAssets } from 'src/components/Gallery/hooks/useCreateAssets';

type MediaLibraryHeadingProps = {
    assetManager: ReturnType<typeof useCreateAssets>;
    noFilesRemaining: boolean;
};

const MediaLibraryHeading = ({
    assetManager,
    noFilesRemaining,
}: MediaLibraryHeadingProps) => {
    return (
        <Flex w="full" justifyContent="space-between">
            <Button
                size={{ base: 'sm', lg: 'md' }}
                as={Link}
                to={routes.dashboard()}
                variant="outline"
            >
                {'< Dashboard'}
            </Button>
            <Button
                size={{ base: 'sm', lg: 'md' }}
                onClick={assetManager.modalDisclosure.onOpen}
                isDisabled={noFilesRemaining}
            >
                <Icon as={FaUpload} mr={2} />
                Bestand toevoegen
            </Button>
        </Flex>
    );
};

export default MediaLibraryHeading;

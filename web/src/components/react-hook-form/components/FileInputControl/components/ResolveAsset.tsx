import React from 'react';

import { Box, Icon, Image } from '@chakra-ui/react';
import { BiImage, BiVideo } from 'react-icons/bi';

type ResolveAssetProps = {
    file: File;
};

const ResolveAsset = ({ file }: ResolveAssetProps) => {
    if (file.type.includes('image')) {
        return (
            <>
                <Image
                    src={URL.createObjectURL(file)}
                    inset={0}
                    w="100%"
                    h="100%"
                    loading="lazy"
                    objectFit="cover"
                />
                <Icon
                    as={BiImage}
                    position="absolute"
                    bottom={2}
                    right={2}
                    color="green.500"
                    zIndex={1}
                    fontSize={{
                        base: 'md',
                        lg: '2xl',
                    }}
                />
            </>
        );
    }

    if (file.type.includes('video')) {
        return (
            <>
                <Box
                    as="video"
                    src={URL.createObjectURL(file)}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                />
                <Icon
                    as={BiVideo}
                    position="absolute"
                    bottom={2}
                    right={2}
                    color="green.500"
                    zIndex={1}
                    fontSize={{
                        base: 'md',
                        lg: '2xl',
                    }}
                />
            </>
        );
    }

    return null;
};

export default ResolveAsset;

import React, { ReactNode, VideoHTMLAttributes } from 'react';

import { Box, BoxProps, Icon, Image, ImageProps } from '@chakra-ui/react';
import { BiImage, BiVideo } from 'react-icons/bi';

type ResolveAssetTypeProps = {
    fileType: string;
    imageProps?: ImageProps;
    videoProps?: BoxProps &
        VideoHTMLAttributes<HTMLVideoElement> & {
            locked?: boolean;
        };
    customVideo?: (
        props: BoxProps & VideoHTMLAttributes<HTMLVideoElement>
    ) => ReactNode;
};

const ResolveAssetType = ({
    fileType,
    imageProps,
    videoProps,
    customVideo: CustomVideo,
}: ResolveAssetTypeProps) => {
    if (fileType.includes('image')) {
        if (!imageProps?.src) return null;

        return (
            <>
                <Image loading="lazy" {...imageProps} />
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

    if (fileType.includes('video')) {
        if (CustomVideo) {
            return <CustomVideo {...videoProps} />;
        }
        return (
            <>
                <Box
                    {...videoProps}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    as="video"
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

export default ResolveAssetType;

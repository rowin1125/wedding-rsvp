import React, {
    ReactNode,
    VideoHTMLAttributes,
    useEffect,
    useState,
} from 'react';

import { Box, BoxProps, Flex, Icon, ImageProps } from '@chakra-ui/react';
import { BiImage, BiVideo } from 'react-icons/bi';
import { IoDocumentAttachOutline } from 'react-icons/io5';

import ResizableImage from 'src/components/ResizableImage/ResizableImage';

type ResolveAssetTypeProps = {
    fileType: string;
    imageProps?: ImageProps & {
        thumbnailUrl?: string;
        previewUrl?: string;
    };
    videoProps?: BoxProps &
        VideoHTMLAttributes<HTMLVideoElement> & {
            locked?: boolean;
        };
    customVideo?: (
        props: BoxProps & VideoHTMLAttributes<HTMLVideoElement>
    ) => ReactNode;
    hideIcon?: boolean;
};

const ResolveAssetType = ({
    fileType,
    imageProps,
    videoProps,
    customVideo: CustomVideo,
    hideIcon,
}: ResolveAssetTypeProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageData = async () => {
            if (fileType.includes('svg') && imageProps?.src) {
                try {
                    const response = await fetch(imageProps.src);
                    const blob = await response.blob();
                    const file = new File([blob], 'image.svg', {
                        type: fileType,
                    });
                    const url = URL.createObjectURL(file);
                    setImageUrl(url);
                } catch (error) {
                    console.error('Failed to fetch image data:', error);
                }
            } else if (imageProps?.src) {
                setImageUrl(imageProps.src);
            }
        };

        fetchImageData();

        // Clean up the object URL
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileType, imageProps?.src]);

    if (fileType.includes('image')) {
        if (!imageUrl) return null;

        return (
            <>
                <ResizableImage loading="lazy" {...imageProps} src={imageUrl} />
                {!hideIcon && (
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
                )}
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
                {!hideIcon && (
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
                )}
            </>
        );
    }

    // For the rest show file icon
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            h="full"
            position="absolute"
            inset={0}
        >
            {!hideIcon && (
                <Icon
                    as={IoDocumentAttachOutline}
                    color="tertiary.500"
                    zIndex={1}
                    fontSize={{
                        base: '5xl',
                        lg: '8xl',
                    }}
                />
            )}
        </Flex>
    );
};

export default ResolveAssetType;

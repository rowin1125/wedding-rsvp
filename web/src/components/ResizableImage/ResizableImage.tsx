import React, { useEffect, useState } from 'react';

import { Image, Spinner, ImageProps, Flex } from '@chakra-ui/react';

type ResizableImageProps = {
    thumbnailUrl?: string;
    previewUrl?: string;
    alt?: string;
} & ImageProps;

const ResizableImage = ({
    src: originalSrc,
    thumbnailUrl,
    previewUrl,
    alt,
    ...props
}: ResizableImageProps) => {
    const [src, setSrc] = useState(thumbnailUrl || previewUrl || originalSrc);

    const handleError = () => {
        if (src === thumbnailUrl && previewUrl) {
            setSrc(previewUrl);
        } else if (
            (src === thumbnailUrl || src === previewUrl) &&
            originalSrc
        ) {
            setSrc(originalSrc);
        }
    };

    useEffect(() => {
        setSrc(thumbnailUrl || previewUrl || originalSrc);
    }, [thumbnailUrl, previewUrl, originalSrc]);

    return (
        <>
            {false && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex="1"
                >
                    <Spinner size="xl" />
                </Flex>
            )}
            <Image src={src} alt={alt} onError={handleError} {...props} />
        </>
    );
};

export default ResizableImage;

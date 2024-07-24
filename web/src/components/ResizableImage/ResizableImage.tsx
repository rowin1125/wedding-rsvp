import React, { useEffect, useState } from 'react';

import { Box, Image, ImageProps } from '@chakra-ui/react';

import ImageFocalPoint, { FocalPoint } from '../FocalPoint';

export type ResizableImageProps = {
    thumbnailUrl?: string;
    previewUrl?: string;
    alt?: string;
    focalPoint?: {
        setFocalPoint?: React.Dispatch<React.SetStateAction<FocalPoint>>;
        focalPoint?: FocalPoint;
    };
    imageProps?: ImageProps;
} & ImageProps;

const ResizableImage = ({
    src: originalSrc,
    thumbnailUrl,
    previewUrl,
    alt,
    focalPoint,
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

    if (focalPoint?.setFocalPoint && focalPoint.focalPoint) {
        return (
            <Box
                as={ImageFocalPoint}
                src={src}
                alt={alt}
                onError={handleError}
                onChange={focalPoint.setFocalPoint}
                focalPoint={focalPoint.focalPoint}
                focalPointProps={{
                    borderColor: 'blue.500',
                }}
                {...props}
            />
        );
    }

    return <Image src={src} alt={alt} onError={handleError} {...props} />;
};

export default ResizableImage;

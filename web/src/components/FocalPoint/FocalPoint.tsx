import React from 'react';

import { Box, BoxProps, ImageProps, Img } from '@chakra-ui/react';

import { useIsDevice } from 'src/hooks/useIsDevice';

import { useFocalPoint } from './hooks/useFocalPoint';

export type FocalPoint = {
    x: number;
    y: number;
};

type LabelProps = {
    focalPoint?: string;
};

const defaultLabels: LabelProps = {
    focalPoint: 'Focal point',
};

export type ImageFocalPointProps = {
    src: string;
    onChange: (focalPoint: FocalPoint) => void;
    focalPoint?: FocalPoint;
    alt?: string;
    labels?: LabelProps;
    rootProps?: BoxProps;
    focalPointProps?: BoxProps;
    imageProps?: ImageProps;
};

const ImageFocalPoint = (props: ImageFocalPointProps) => {
    const { isDesktop } = useIsDevice();
    const {
        src,
        onChange,
        alt,
        focalPoint,
        rootProps,
        focalPointProps,
        imageProps,
    } = props;
    const labels = { ...defaultLabels, ...(props.labels || {}) };
    const { ref, x, y, onMove, canMove, setCanMove } = useFocalPoint({
        focalPoint,
        onChange,
    });

    const handleMouseDown = () => setCanMove(true);
    const handleMouseUp = () => setCanMove(false);

    const handleClick = (
        e: React.MouseEvent<HTMLDivElement | HTMLImageElement>
    ) => {
        if (isDesktop) return;

        onMove(e);
    };

    return (
        <Box
            ref={ref}
            position="relative"
            w="100%"
            h="100%"
            userSelect="none"
            onMouseMove={onMove}
            onClick={handleClick}
            {...rootProps}
        >
            <Box
                as="button"
                type="button"
                aria-label={labels.focalPoint}
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    cursor: canMove ? 'grabbing' : 'grab',
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                position="absolute"
                transform="translate(calc(-50%), calc(-50%))"
                backgroundColor="rgba(0,0,0,0.4)"
                border="3px solid white"
                display="block"
                w="25px"
                h="25px"
                borderRadius="50%"
                {...focalPointProps}
            />
            <Img
                style={{
                    objectPosition: `${x}% ${y}%`,
                }}
                userSelect="none"
                draggable="false"
                w="100%"
                h="100%"
                objectFit="cover"
                src={src}
                alt={alt}
                {...imageProps}
            />
        </Box>
    );
};

export default ImageFocalPoint;

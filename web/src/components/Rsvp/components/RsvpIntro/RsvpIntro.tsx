import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, GridItem, Image } from '@chakra-ui/react';

import Tiptap from 'src/components/PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';
import { RsvpFormBlockProps } from 'src/components/PuckStudio/blocks/RsvpFormBlock';

const RsvpIntro = ({
    textContent,
    backgroundImage,
    bgSize,
    imageOne,
    imageThree,
    imageTwo,
}: RsvpFormBlockProps) => {
    const hasImages = imageOne || imageTwo || imageThree;

    const hasTwoImages =
        (imageOne && imageTwo) ||
        (imageOne && imageThree) ||
        (imageTwo && imageThree);
    const hasThreeImages = imageOne && imageTwo && imageThree;
    const hasOneImage =
        (imageOne && !imageTwo && !imageThree) ||
        (!imageOne && imageTwo && !imageThree) ||
        (!imageOne && !imageTwo && imageThree);

    const imageSpanWidth = hasThreeImages
        ? 2
        : hasTwoImages
        ? 3
        : hasOneImage
        ? 6
        : 2;

    return (
        <>
            <Box
                bgImage={backgroundImage?.asset.previewUrl}
                bgPosition={
                    backgroundImage?.metadata?.focalPoint
                        ? `${backgroundImage.metadata.focalPoint.x}% ${backgroundImage.metadata.focalPoint.y}%`
                        : 'center'
                }
                bgSize={bgSize ?? 'cover'}
                bgRepeat="repeat-y"
                position="absolute"
                inset={0}
                w="full"
                maxW="1200px"
                mx="auto"
                h="full"
            />
            {hasImages && (
                <Grid
                    gridTemplateColumns="repeat(6, 1fr)"
                    gap={8}
                    px={8}
                    position="relative"
                    overflowX="auto"
                    maxW={{ base: '100vw', lg: '1600px' }}
                    mx="auto"
                    mb={{ base: 16, lg: 28 }}
                >
                    <GridItem colSpan={6}>
                        {textContent && (
                            <Tiptap
                                content={textContent}
                                editorConfig={{
                                    editable: false,
                                }}
                            />
                        )}
                    </GridItem>
                    {imageOne && (
                        <GridItem
                            colSpan={{ base: 3, lg: imageSpanWidth }}
                            display={{ base: 'none', lg: 'unset' }}
                            w="full"
                        >
                            <Image
                                w="full"
                                src={
                                    imageOne?.asset.previewUrl ??
                                    'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
                                }
                                h={{ base: '150px', lg: '360px' }}
                                objectFit="cover"
                                objectPosition={
                                    imageOne?.metadata?.focalPoint
                                        ? `${imageOne.metadata.focalPoint.x}% ${imageOne.metadata.focalPoint.y}%`
                                        : 'center'
                                }
                            />
                        </GridItem>
                    )}
                    {imageTwo && (
                        <GridItem colSpan={{ base: 3, lg: imageSpanWidth }}>
                            <Box
                                h={{ base: '150px', lg: '360px' }}
                                overflow="hidden"
                                w="full"
                            >
                                <Image
                                    w="full"
                                    h="full"
                                    src={
                                        imageTwo?.asset.previewUrl ??
                                        'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
                                    }
                                    objectFit="cover"
                                    objectPosition={
                                        imageTwo?.metadata?.focalPoint
                                            ? `${imageTwo.metadata.focalPoint.x}% ${imageTwo.metadata.focalPoint.y}%`
                                            : 'center'
                                    }
                                />
                            </Box>
                        </GridItem>
                    )}
                    {imageThree && (
                        <GridItem
                            colSpan={{ base: 3, lg: imageSpanWidth }}
                            w="full"
                        >
                            <Image
                                w="full"
                                src={
                                    imageThree?.asset.previewUrl ??
                                    'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
                                }
                                h={{ base: '150px', lg: '360px' }}
                                objectFit="cover"
                                objectPosition={
                                    imageThree?.metadata?.focalPoint
                                        ? `${imageThree.metadata.focalPoint.x}% ${imageThree.metadata.focalPoint.y}%`
                                        : 'center'
                                }
                            />
                        </GridItem>
                    )}
                </Grid>
            )}
        </>
    );
};

export default RsvpIntro;

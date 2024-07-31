import React from 'react';

import {
    Box,
    BoxProps,
    Container,
    Grid,
    GridItem,
    Image,
    ImageProps,
} from '@chakra-ui/react';

import { resolveContainerWidth } from 'src/helpers/marketingBlockHelpers';

type ImageTextBlockProps = {
    gridLayout?: string;
    containerWidth?: 'small' | 'medium' | 'large' | 'full';
    imageFirst?: boolean;
    children: React.ReactNode;
    roundImage?: boolean;
    imageSrc: string;
    imageProps?: ImageProps;
} & BoxProps;

const ImageTextBlock = ({
    gridLayout = '6',
    containerWidth = 'large',
    children,
    imageFirst,
    roundImage,
    imageSrc,
    imageProps,
    ...props
}: ImageTextBlockProps) => {
    const imageColumnWidth = parseInt(gridLayout);
    const textColumnWidth = 12 - imageColumnWidth;

    return (
        <Box as="section" py={{ base: 8, lg: 16 }} {...props}>
            <Container maxW={resolveContainerWidth(containerWidth)}>
                <Grid
                    templateColumns="repeat(12, 1fr)"
                    gap={{
                        base: 0,
                        lg: 10,
                    }}
                    rowGap={6}
                >
                    <GridItem
                        colSpan={{ base: 12, lg: textColumnWidth }}
                        h="full"
                        order={{
                            base: imageFirst ? 1 : 0,
                        }}
                        textAlign={{ base: 'center', lg: 'left' }}
                    >
                        {children}
                    </GridItem>
                    <GridItem
                        colSpan={{ base: 12, lg: imageColumnWidth }}
                        position="relative"
                        w={{
                            base: 'full',
                        }}
                        order={{
                            base: -1,
                            lg: imageFirst ? 0 : 1,
                        }}
                        overflow="hidden"
                        borderRadius={roundImage ? 'full' : '10px'}
                        boxShadow="xl"
                    >
                        <Image
                            src={imageSrc}
                            alt={'Bruiloft Buddy'}
                            objectFit="contain"
                            w="full"
                            h="auto"
                            {...imageProps}
                        />
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
};

export default ImageTextBlock;

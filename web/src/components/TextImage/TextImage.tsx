import React from 'react';

import { Grid, GridItem, Image } from '@chakra-ui/react';

import Tiptap from '../PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';
import { TextImageBlockProps } from '../PuckStudio/blocks/TextImageBlock';

type TextImageProps = TextImageBlockProps;

const TextImage = ({
    imageFirst,
    textContent,
    assetReference,
    assetPositioning,
}: TextImageProps) => {
    return (
        <Grid
            templateColumns="repeat(12, 1fr)"
            gap={{
                base: 0,
                lg: 10,
            }}
            rowGap={6}
        >
            <GridItem
                colSpan={{ base: 12, lg: 6 }}
                h="full"
                order={{
                    base: imageFirst ? 1 : 0,
                }}
                textAlign={{ base: 'center', lg: 'left' }}
            >
                {textContent && (
                    <Tiptap
                        content={textContent}
                        editorConfig={{
                            editable: false,
                        }}
                    />
                )}
            </GridItem>
            <GridItem
                colSpan={{ base: 12, lg: 6 }}
                position="relative"
                h={{
                    base: 'full',
                    lg: '500px',
                }}
                w={{
                    base: 'full',
                }}
                aspectRatio={1}
                order={{
                    base: -1,
                    lg: imageFirst ? 0 : 1,
                }}
                overflow="hidden"
                boxShadow={'lg'}
                borderRadius="xl"
            >
                <Image
                    position="absolute"
                    inset={0}
                    w="full"
                    h="full"
                    src={
                        assetReference?.asset.previewUrl ??
                        'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
                    }
                    objectFit={assetPositioning ?? 'cover'}
                />
            </GridItem>
        </Grid>
    );
};

export default TextImage;

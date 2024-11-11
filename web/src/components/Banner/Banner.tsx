import {
    Box,
    BoxProps,
    Container,
    ContainerProps,
    Flex,
    Image,
} from '@chakra-ui/react';
import { JSONContent } from '@tiptap/react';

import { BannerBlockProps } from '../PuckStudio/blocks/BannerBlock';
import Tiptap from '../PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';

type BannerProps = {
    assetReference?: BannerBlockProps['assetReference'];
    content?: JSONContent;
    containerProps?: ContainerProps;
} & Omit<BoxProps, 'content'>;

const Banner = ({
    assetReference,
    content,
    containerProps,
    ...props
}: BannerProps) => {
    const imageUrl =
        assetReference?.asset.previewUrl ??
        'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress';
    const focalPoint = assetReference?.metadata?.focalPoint;

    return (
        <Box position="relative" h="400px" {...props}>
            <Image
                bgSize="cover"
                w="full"
                h="full"
                objectFit="cover"
                objectPosition={
                    focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : 'center'
                }
                position="absolute"
                inset={0}
                src={imageUrl}
            />
            <Container
                {...containerProps}
                h="full"
                position="relative"
                w="full"
            >
                <Flex h="full" alignItems="center" w="full">
                    {content && (
                        <Tiptap
                            content={content}
                            editorConfig={{
                                editable: false,
                            }}
                        />
                    )}
                </Flex>
            </Container>
        </Box>
    );
};

export default Banner;

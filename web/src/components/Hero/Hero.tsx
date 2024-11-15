import {
    Box,
    BoxProps,
    Flex,
    Heading,
    ImageProps,
    Text,
} from '@chakra-ui/react';

import { useGetPageTitle } from 'src/hooks/useGetPageTitle';

import ResolveAssetType from '../ImageGallery/components/ResolveAssetType';

export type HeroData = {
    title?: string;
    subtitle?: string;
    url?: string;
    thumbnailUrl?: string;
    fileType?: string;
    previewUrl?: string;
    objectPosition?: string;
};

type HeroProps = {
    imageProps?: ImageProps;
} & HeroData &
    BoxProps;

const Hero = ({
    subtitle,
    fileType = 'image/png',
    title,
    url = 'https://images.prismic.io/derow-v1/ZjZuGEMTzAJOCiHa_beach-wedding.jpg?auto=format,compress',
    previewUrl,
    imageProps,
    height = '350px',
    objectPosition,
    ...props
}: HeroProps) => {
    const { pageTitle } = useGetPageTitle();
    const heroTitle = title ?? pageTitle;

    return (
        <Box w="full" position="relative" height={height} {...props}>
            <ResolveAssetType
                fileType={fileType}
                imageProps={{
                    w: 'full',
                    h: 'full',
                    src: url,
                    previewUrl: previewUrl,
                    objectFit: 'cover',
                    objectPosition: objectPosition ?? 'center',
                    filter: 'brightness(0.7)',
                    ...imageProps,
                }}
                videoProps={{
                    src: url,
                    objectFit: 'cover',
                    position: 'absolute',
                    inset: 0,
                    w: 'full',
                    h: 'full',
                    filter: 'brightness(0.7)',
                    autoPlay: true,
                    loop: true,
                }}
            />

            <Flex
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                inset={0}
            >
                <Heading
                    fontWeight="normal"
                    fontSize={{ base: '40px', lg: '80px' }}
                    color="inherit"
                    textAlign={{
                        base: 'center',
                        lg: 'center',
                    }}
                >
                    {heroTitle}
                </Heading>
                {subtitle && (
                    <Text
                        color="inherit"
                        textAlign={{
                            base: 'center',
                            lg: 'center',
                        }}
                        fontSize="3xl"
                        textTransform="uppercase"
                        fontFamily="butler"
                    >
                        {subtitle}
                    </Text>
                )}
            </Flex>
        </Box>
    );
};

export default Hero;

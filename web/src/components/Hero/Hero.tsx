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
    image?: string;
    fileType?: string;
    previewUrl?: string;
};

type HeroProps = {
    imageProps?: ImageProps;
} & HeroData &
    BoxProps;

const Hero = ({
    subtitle,
    fileType = 'image',
    title,
    image = 'https://images.prismic.io/derow-v1/ZjZmyEMTzAJOCiGi_Screenshotfrom2023-08-2517-41-23.png?auto=format,compress',
    previewUrl,
    imageProps,
    height = '300px',
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
                    src: image,
                    previewUrl: previewUrl,
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'brightness(0.7)',
                    ...imageProps,
                }}
                videoProps={{
                    src: image,
                    objectFit: 'cover',
                    position: 'absolute',
                    inset: 0,
                    w: 'full',
                    h: 'full',
                    filter: 'brightness(0.7)',
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
                    color="white"
                    textAlign={{
                        base: 'center',
                        lg: 'center',
                    }}
                >
                    {heroTitle}
                </Heading>
                {subtitle && (
                    <Text
                        color="white"
                        textAlign={{
                            base: 'center',
                            lg: 'center',
                        }}
                        fontSize="xl"
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

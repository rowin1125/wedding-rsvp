import React from 'react';

import { Box, Container, Image } from '@chakra-ui/react';

import HeroContainerScroll from './components/HeroContainerScroll';
import HeroTitle from './components/HeroTitle';
import HeroWebsiteFakeBody from './components/HeroWebsiteFakeBody';
import HeroWebsiteFakeHeader from './components/HeroWebsiteFakeHeader';
import imageSrc2 from './images/chairs.jpg';
import imageSrc from './images/homepage.jpg';

const HomepageHero = () => {
    return (
        <Box position="relative">
            <Box
                inset={0}
                w="full"
                position="absolute"
                bgRepeat="no-repeat"
                bgSize="cover"
                bgImage={imageSrc2}
                filter="blur(5px)"
            />
            <Box inset={0} w="full" position="absolute" bg="blackAlpha.400" />

            <Container>
                <HeroContainerScroll titleComponent={<HeroTitle />}>
                    <HeroWebsiteFakeHeader />
                    <Image
                        src={imageSrc}
                        alt="Grip"
                        w="full"
                        objectFit="cover"
                        objectPosition="top"
                        h={'full'}
                        roundedBottom="2xl"
                    />
                    <HeroWebsiteFakeBody />
                </HeroContainerScroll>
            </Container>
        </Box>
    );
};

export default HomepageHero;

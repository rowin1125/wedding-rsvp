import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, GridItem, Heading, Image } from '@chakra-ui/react';

import rsvpBg from '../../images/banner.jpg';
import image1 from '../../images/image-1.jpg';
import image2 from '../../images/image-2.jpg';
import image3 from '../../images/image-3.jpg';

const RsvpIntro = () => {
    return (
        <>
            <Box
                bgImage={`url(${rsvpBg})`}
                bgPosition="center"
                bgSize="cover"
                bgRepeat="repeat-y"
                position="absolute"
                inset={0}
                w="full"
                maxW="1200px"
                mx="auto"
                h="full"
            />
            <Grid
                gridTemplateColumns="repeat(6, 1fr)"
                gap={8}
                px={8}
                position="relative"
                overflowX="auto"
                maxW={{ base: '100vw', lg: '1600px' }}
                mx="auto"
            >
                <GridItem colSpan={6}>
                    <Heading
                        textAlign="center"
                        fontSize={{ base: '3xl', lg: '5xl' }}
                    >
                        Wedding time!
                    </Heading>
                </GridItem>
                <GridItem
                    colSpan={{ base: 3, lg: 2 }}
                    display={{ base: 'none', lg: 'unset' }}
                    w="full"
                >
                    <Image
                        w="full"
                        src={image3}
                        h={{ base: '150px', lg: '360px' }}
                        objectFit="cover"
                        objectPosition="center"
                        filter="grayscale(0.8)"
                    />
                </GridItem>
                <GridItem colSpan={{ base: 3, lg: 2 }}>
                    <Box
                        h={{ base: '150px', lg: '360px' }}
                        overflow="hidden"
                        w="full"
                    >
                        <Image
                            w="full"
                            h="full"
                            src={image2}
                            objectFit="cover"
                            objectPosition="top"
                            filter="grayscale(1)"
                            transform={{
                                base: 'scale(1.4) translateX(-20px)',
                                lg: 'scale(1.4) translateX(-50px)',
                            }}
                        />
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 3, lg: 2 }} w="full">
                    <Image
                        w="full"
                        src={image1}
                        h={{ base: '150px', lg: '360px' }}
                        objectFit="cover"
                        objectPosition="center"
                        filter="grayscale(1)"
                    />
                </GridItem>
            </Grid>
        </>
    );
};

export default RsvpIntro;

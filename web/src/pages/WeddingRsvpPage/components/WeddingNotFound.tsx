import React from 'react';

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';

import brokenHeart from './images/broken hart.png';

const WeddingNotFound = () => {
    return (
        <Box>
            <Metadata
                title="Geen bruiloft gevonden"
                description="WeddingRsvp page"
            />
            <Hero
                title="Geen bruiloft gevonden"
                subtitle="Deze bruiloft bestaat niet"
                height={{
                    base: '30vh',
                    lg: '30vh',
                }}
            />
            <Box h="calc(100vh - 30vh - 92px - 57px)" position="relative">
                <Box
                    inset={0}
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                >
                    <Box>
                        <Heading
                            textAlign="center"
                            fontSize={{
                                base: '4xl',
                                lg: '8xl',
                            }}
                            color="#FF0404"
                        >
                            Oeps
                        </Heading>
                        <Flex alignItems="center" justifyContent="center">
                            <Heading
                                fontSize={{
                                    base: '4xl',
                                    lg: '8xl',
                                }}
                                color="black"
                            >
                                4
                            </Heading>
                            <Image
                                src={brokenHeart}
                                alt="broken heart"
                                h="70px"
                            />
                            <Heading
                                fontSize={{
                                    base: '4xl',
                                    lg: '8xl',
                                }}
                                color="black"
                            >
                                4
                            </Heading>
                        </Flex>
                        <Text>
                            Deze bruiloft bestaat niet, misschien heb je een
                            verkeerde link gekregen?
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default WeddingNotFound;

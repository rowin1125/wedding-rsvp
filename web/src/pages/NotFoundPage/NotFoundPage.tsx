import { Heading, Flex, Box, Image, Text } from '@chakra-ui/react';

import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';

import brokenHeart from '../WeddingRsvpPage/components/images/broken hart.png';

export default () => (
    <Box as="main">
        <Metadata
            title="Pagina niet gevonden"
            description="Pagina niet gevonden"
        />
        <Hero
            title="Pagina niet gevonden"
            subtitle="Check de url en probeer het opnieuw"
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
                        <Image src={brokenHeart} alt="broken heart" h="70px" />
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
                        De pagina die je probeert te bezoeken bestaat niet
                    </Text>
                </Box>
            </Box>
        </Box>
    </Box>
);

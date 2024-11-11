import { Heading, Flex, Box, Image, Text, Button } from '@chakra-ui/react';

import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';

export default () => (
    <Box as="main">
        <Metadata
            title="Pagina niet gevonden"
            description="Pagina niet gevonden"
        />
        <Hero
            color="white"
            title="Pagina niet gevonden"
            subtitle="Check de url en probeer het opnieuw"
            height={{
                base: '30vh',
                lg: '30vh',
            }}
            fileType="image"
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
                            src={
                                'https://images.prismic.io/derow-v1/ZjZsKkMTzAJOCiHG_brokenhart.png?auto=format,compress'
                            }
                            alt="broken heart"
                            h={{
                                base: '30px',
                                lg: '70px',
                            }}
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
                        De pagina die je probeert te bezoeken bestaat niet
                    </Text>
                    <Flex mt={6} justifyContent="center">
                        <Button as={Link} to={routes.home()}>
                            Terug naar home
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    </Box>
);

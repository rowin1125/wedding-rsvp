import React from 'react';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import { Link, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

const HeroWebsiteFakeBody = () => {
    const { currentUser } = useAuth();

    return (
        <Flex
            mx={{
                base: 2,
                lg: 4,
            }}
            mb={{
                base: 2,
                lg: 4,
            }}
            inset={0}
            position="absolute"
            roundedBottom="2xl"
            bg="blackAlpha.500"
            mt="80px"
            color="white"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Box
                mx={{
                    base: 10,
                    lg: 20,
                }}
            >
                <Heading
                    color="inherit"
                    as="h2"
                    fontSize={{
                        base: '4xl',
                        lg: '7xl',
                    }}
                    fontWeight="semibold"
                >
                    Jouw bruiloft website
                </Heading>
                <Text
                    color="inherit"
                    fontSize={{
                        base: 'xl',
                        lg: '2xl',
                    }}
                >
                    {`Maak je eigen bruiloft website met Bruiloft
                                    Buddy. Hiermee beheer je alles van
                                    uitnodigingen tot gastenlijst en van RSVP's
                                    tot cadeaulijst.`}
                </Text>
                {currentUser ? (
                    <Button
                        as={Link}
                        to={routes.dashboard()}
                        colorScheme="secondary"
                        mt={10}
                    >
                        Ga naar dashboard
                    </Button>
                ) : (
                    <Button
                        as={Link}
                        to={routes.signup()}
                        colorScheme="secondary"
                        mt={10}
                    >
                        Maak jouw gratis account
                    </Button>
                )}
            </Box>
        </Flex>
    );
};

export default HeroWebsiteFakeBody;

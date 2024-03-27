import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import SmartLoginButton from '../../SmartLoginButton';

const HeroWebsiteFakeBody = () => {
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
                <SmartLoginButton mt={10}>Maak nu je website</SmartLoginButton>
            </Box>
        </Flex>
    );
};

export default HeroWebsiteFakeBody;

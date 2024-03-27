import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

const HeroWebsiteFakeHeader = () => {
    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            w="full"
            h="80px"
            bg="primary.500"
            zIndex={2}
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                w="full"
                transform="scale(0.7)"
            >
                <Image
                    src={'/Bruiloft buddy logo.png'}
                    width={20}
                    alt="Demi & Rowin"
                />
                <Text
                    ml={4}
                    color="secondary.900"
                    fontWeight="semibold"
                    fontSize={{
                        base: '2xl',
                        xl: '3xl',
                    }}
                >
                    Bruiloft Buddy
                </Text>
            </Flex>
        </Box>
    );
};

export default HeroWebsiteFakeHeader;

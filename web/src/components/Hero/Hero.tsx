import { Box, BoxProps, Flex, Heading, Image, Text } from '@chakra-ui/react';

import coverImage from './images/Screenshot from 2023-08-25 17-41-23.png';

type HeroProps = {
    title: string;
    subtitle: string;
} & BoxProps;

const Hero = ({ subtitle, title, ...props }: HeroProps) => {
    return (
        <Box
            w="full"
            h={{
                base: '50vh',
                lg: 'calc(80vh - 93px)',
            }}
            position="relative"
            {...props}
        >
            <Image
                w="full"
                h="full"
                src={coverImage}
                alt="Demi & Rowin"
                objectFit={'cover'}
                objectPosition={'center'}
                filter="brightness(0.7)"
            />
            <Flex
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                inset={0}
            >
                <Text
                    color="white"
                    fontSize="xl"
                    textTransform="uppercase"
                    fontFamily="butler"
                >
                    {title}
                </Text>
                <Heading
                    fontWeight="normal"
                    fontSize={{ base: '40px', lg: '80px' }}
                    color="white"
                >
                    {subtitle}
                </Heading>
            </Flex>
        </Box>
    );
};

export default Hero;

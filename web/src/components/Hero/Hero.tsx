import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import RsvpLinkButton from './components/RsvpLinkButton/RsvpLinkButton';
import coverImage from './images/Screenshot from 2023-08-25 17-41-23.png';

const Hero = () => {
    return (
        <Box
            w="full"
            h={{
                base: '50vh',
                lg: 'calc(80vh - 93px)',
            }}
            position="relative"
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
                    Demi & Rowin
                </Text>
                <Heading
                    fontWeight="normal"
                    fontSize={{ base: '40px', lg: '80px' }}
                    color="white"
                >
                    Wij gaan trouwen!
                </Heading>
            </Flex>
            <RsvpLinkButton />
        </Box>
    );
};

export default Hero;

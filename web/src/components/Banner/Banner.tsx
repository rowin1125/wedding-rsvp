import { Box, Container, Heading } from '@chakra-ui/react';

import banner from './images/banner.jpg';

const Banner = () => {
    return (
        <Box
            bgImage={`url(${banner})`}
            bgRepeat="repeat-x"
            py={{ base: 20, lg: 28 }}
        >
            <Container>
                <Heading
                    fontStyle="italic"
                    fontSize={{ base: '3xl', lg: '5xl' }}
                    textAlign="center"
                >
                    We kijken er naar uit om deze mooie dag samen met jullie te
                    vieren!
                </Heading>
            </Container>
        </Box>
    );
};

export default Banner;

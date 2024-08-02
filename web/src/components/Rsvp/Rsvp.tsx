/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Card, Center, Container } from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';

import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import RsvpForm from './components/RsvpForm/RsvpForm';
import RsvpIntro from './components/RsvpIntro/RsvpIntro';

const Rsvp = () => {
    const { weddingId } = useParams();
    const { wedding } = useGetWeddingById(weddingId);

    return (
        <Box
            py={{ base: 10, lg: 20 }}
            mb={{ base: 10, lg: 20 }}
            position="relative"
            w="full"
            id="rsvp"
        >
            <RsvpIntro />
            <Container>
                <Center>
                    <Card
                        mt={{ base: 16, lg: 28 }}
                        maxW="750px"
                        px={{ base: 10, lg: 20 }}
                        id="rsvpForm"
                    >
                        {wedding && <RsvpForm wedding={wedding} />}
                    </Card>
                </Center>
            </Container>
        </Box>
    );
};

export default Rsvp;

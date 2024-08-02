import { Flex, Box, Container, Center, Card } from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import RsvpIntro from 'src/components/Rsvp/components/RsvpIntro/RsvpIntro';
import Sidebar from 'src/components/Sidebar/Sidebar';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import UpdateRsvpForm from './components/UpdateRsvpForm/UpdateRsvpForm';
import { useGetWeddingInvitationResponse } from './hooks/useGetWeddingInvitationResponse';

const UpdateWeddingInvitationResponsePage = () => {
    const { weddingId } = useParams();
    const { currentUser, loading } = useAuth();
    const { weddingInvitationResponse } = useGetWeddingInvitationResponse();
    const { wedding } = useGetWeddingById();

    const isConnectedToWedding =
        currentUser?.weddingId === weddingId && !loading;

    return (
        <>
            <Metadata title="Update je RSVP" description="Update je RSVP" />
            <Flex
                justifyContent="space-between"
                mx={{ base: 0, xl: 0 }}
                position="relative"
            >
                {isConnectedToWedding && (
                    <Box position="relative">
                        <Sidebar />
                    </Box>
                )}
                <Flex
                    flexDir="column"
                    w="full"
                    mb={10}
                    pt={{ base: 32, lg: 52 }}
                    pb={{ base: 10, lg: 20 }}
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
                                {weddingInvitationResponse && (
                                    <UpdateRsvpForm
                                        weddingInvitationResponse={
                                            weddingInvitationResponse
                                        }
                                        wedding={wedding}
                                    />
                                )}
                            </Card>
                        </Center>
                    </Container>
                </Flex>
            </Flex>
        </>
    );
};

export default UpdateWeddingInvitationResponsePage;

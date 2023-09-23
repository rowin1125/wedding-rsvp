/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Card, Center, Container } from '@chakra-ui/react';
import { InvitationType } from 'types/graphql';

import { useParams } from '@redwoodjs/router';

import { useGetGuestInvitationById } from 'src/components/GuestDataTable/hooks/useGetGuestInvitationById';

import UpdateRsvpForm from './components/RsvpForm/RsvpForm';
import RsvpIntro from './components/RsvpIntro/RsvpIntro';

type RsvpProps = {
    invitationType: InvitationType;
};

const Rsvp = ({ invitationType }: RsvpProps) => {
    const { weddingInvitationId } = useParams();
    const { weddingInvitation, loading } =
        useGetGuestInvitationById(weddingInvitationId);

    if (!weddingInvitation || loading) return null;

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
                        <UpdateRsvpForm
                            invitationType={invitationType}
                            weddingInvitation={weddingInvitation}
                        />
                    </Card>
                </Center>
            </Container>
        </Box>
    );
};

export default Rsvp;

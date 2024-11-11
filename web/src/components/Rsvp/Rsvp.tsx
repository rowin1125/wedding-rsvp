/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Card, Center, Container } from '@chakra-ui/react';

import { useParams, useRouteName } from '@redwoodjs/router';

import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { useGetWeddingRsvpLandingPage } from 'src/pages/RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPage';
import UpdateRsvpForm from 'src/pages/UpdateWeddingInvitationResponsePage/components/UpdateRsvpForm/UpdateRsvpForm';
import { useGetWeddingInvitationResponse } from 'src/pages/UpdateWeddingInvitationResponsePage/hooks/useGetWeddingInvitationResponse';

import { RsvpFormBlockProps } from '../PuckStudio/blocks/RsvpFormBlock';

import RsvpForm from './components/RsvpForm/RsvpForm';
import RsvpIntro from './components/RsvpIntro/RsvpIntro';

type RsvpProps = RsvpFormBlockProps;

const Rsvp = (props: RsvpProps) => {
    const routeName = useRouteName();
    const { weddingId } = useParams();
    const { wedding } = useGetWeddingById(weddingId);
    const { weddingRsvpLandingPage } = useGetWeddingRsvpLandingPage();
    const { weddingInvitationResponse } = useGetWeddingInvitationResponse();

    const isUpdatePage = routeName === 'updateWeddingInvitationResponse';

    return (
        <Box py={{ base: 10, lg: 20 }} position="relative" w="full" id="rsvp">
            <RsvpIntro {...props} />
            <Container>
                <Center>
                    <Card maxW="750px" px={{ base: 10, lg: 20 }} id="rsvpForm">
                        {isUpdatePage ? (
                            <>
                                {weddingInvitationResponse && (
                                    <UpdateRsvpForm
                                        weddingRsvpLandingPage={
                                            weddingRsvpLandingPage
                                        }
                                        weddingInvitationResponse={
                                            weddingInvitationResponse
                                        }
                                        wedding={wedding}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {wedding && (
                                    <RsvpForm
                                        wedding={wedding}
                                        weddingRsvpLandingPage={
                                            weddingRsvpLandingPage
                                        }
                                    />
                                )}
                            </>
                        )}
                    </Card>
                </Center>
            </Container>
        </Box>
    );
};

export default Rsvp;

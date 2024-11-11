import { Flex, useToast } from '@chakra-ui/react';
import { Data } from '@measured/puck';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import PuckStudio from 'src/components/PuckStudio/PuckStudio';

import { useGetWeddingRsvpLandingPage } from '../RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPage';

import { useGetWeddingInvitationResponse } from './hooks/useGetWeddingInvitationResponse';

const UpdateWeddingInvitationResponsePage = () => {
    const { weddingInvitationResponse, loading: invitationLoading } =
        useGetWeddingInvitationResponse();
    const toast = useToast();
    const { weddingRsvpLandingPage, loading } = useGetWeddingRsvpLandingPage();

    if (!loading && !weddingInvitationResponse && !invitationLoading) {
        toast({
            title: 'Deze pagina bestaat niet, controleer de link',
            status: 'error',
        });

        navigate(routes.home(), { replace: true });
    }
    if (!weddingRsvpLandingPage?.pageBuilderData) return null;

    const landingPage = {
        ...(weddingRsvpLandingPage.pageBuilderData as object),
    } as Partial<Data>;
    const filteredContent = landingPage?.content?.filter(
        (content) => content.type === 'RsvpForm'
    );
    landingPage.content = filteredContent;

    return (
        <>
            <Metadata title="Update je RSVP" description="Update je RSVP" />
            <Flex
                justifyContent="space-between"
                mx={{ base: 0, xl: 0 }}
                position="relative"
            >
                <Flex
                    flexDir="column"
                    w="full"
                    mb={10}
                    pt={{ base: 32, lg: 36 }}
                    pb={{ base: 10, lg: 20 }}
                >
                    <PuckStudio
                        initialData={landingPage}
                        renderView
                        isLoading={loading}
                    />
                </Flex>
            </Flex>
        </>
    );
};

export default UpdateWeddingInvitationResponsePage;

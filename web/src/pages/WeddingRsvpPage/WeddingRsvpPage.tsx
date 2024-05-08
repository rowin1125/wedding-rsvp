import { Box, Flex } from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import Banner from 'src/components/Banner';
import Countdown from 'src/components/Countdown/Countdown';
import DayProgram from 'src/components/DayProgram/DayProgram';
import Hero from 'src/components/Hero';
import Mvps from 'src/components/Mvps';
import PartyInformation from 'src/components/PartyInformation';
import Rsvp from 'src/components/Rsvp';
import Sidebar from 'src/components/Sidebar/Sidebar';
import StoryTimeline from 'src/components/StoryTimeline/StoryTimeline';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import WeddingNotFound from './components/WeddingNotFound';

const WeddingRsvpPage = () => {
    const { currentUser } = useAuth();
    const { weddingId } = useParams();
    const { invitationType } = useParams();
    const { wedding, loading } = useGetWeddingById(weddingId);

    const isFullDay = invitationType.toUpperCase() === 'F';
    const isEvening = invitationType.toUpperCase() === 'E';

    if ((!loading && !wedding) || (!isFullDay && !isEvening)) {
        toast.error('Deze bruiloft bestaat niet');

        return <WeddingNotFound />;
    }

    const isConnectedToWedding =
        currentUser?.weddingId === weddingId && !loading;

    return (
        <>
            <Metadata title="Uitnodiging" description="WeddingRsvp page" />
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
                <Flex flexDir="column" w="full" mb={10}>
                    <Hero
                        title="Wij gaan trouwen!"
                        subtitle="Demi & Rowin"
                        h={{
                            base: '50vh',
                            lg: 'calc(80vh - 93px)',
                        }}
                    />
                    <Countdown targetDate={'2024-05-16T00:00:00+02:00'} />
                    <Banner />
                    <StoryTimeline />
                    <Mvps />
                    <DayProgram
                        invitationType={isFullDay ? 'DAY' : 'EVENING'}
                    />
                    <PartyInformation />
                    <Rsvp invitationType={isFullDay ? 'DAY' : 'EVENING'} />
                </Flex>
            </Flex>
        </>
    );
};

export default WeddingRsvpPage;

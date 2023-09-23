import { useParams } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import Banner from 'src/components/Banner';
import Countdown from 'src/components/Countdown/Countdown';
import DayProgram from 'src/components/DayProgram/DayProgram';
import Hero from 'src/components/Hero';
import Mvps from 'src/components/Mvps';
import PartyInformation from 'src/components/PartyInformation';
import Rsvp from 'src/components/Rsvp';
import StoryTimeline from 'src/components/StoryTimeline/StoryTimeline';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import WeddingNotFound from './components/WeddingNotFound';

const WeddingRsvpPage = () => {
    const { weddingId } = useParams();
    const { invitationType } = useParams();
    const { wedding, loading } = useGetWeddingById(weddingId);

    const isFullDay = invitationType.toUpperCase() === 'F';
    const isEvening = invitationType.toUpperCase() === 'E';

    if ((!loading && !wedding) || (!isFullDay && !isEvening)) {
        toast.error('Deze bruiloft bestaat niet');

        return <WeddingNotFound />;
    }

    return (
        <>
            <MetaTags title="Uitnodiging" description="WeddingRsvp page" />
            <Hero title="Demi & Rowin" subtitle="Wij gaan trouwen!" />
            <Countdown targetDate={'2024-05-16T00:00:00+02:00'} />
            <Banner />
            <StoryTimeline />
            <Mvps />
            <DayProgram invitationType={isFullDay ? 'DAY' : 'EVENING'} />
            <PartyInformation />
            <Rsvp invitationType={isFullDay ? 'DAY' : 'EVENING'} />
        </>
    );
};

export default WeddingRsvpPage;

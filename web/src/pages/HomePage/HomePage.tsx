import { MetaTags } from '@redwoodjs/web';

import Banner from 'src/components/Banner/Banner';
import Countdown from 'src/components/Countdown/Countdown';
import DayProgram from 'src/components/DayProgram/DayProgram';
import Hero from 'src/components/Hero';
import Mvps from 'src/components/Mvps/Mvps';
import PartyInformation from 'src/components/PartyInformation/PartyInformation';
import Rsvp from 'src/components/Rsvp/Rsvp';
import StoryTimeline from 'src/components/StoryTimeline/StoryTimeline';

const HomePage = () => {
    return (
        <>
            <MetaTags title="Home" description="Home page" />

            <Hero />
            <Countdown targetDate={'2024-05-16 00:00:00'} />
            <Banner />
            <StoryTimeline />
            <Mvps />
            <DayProgram />
            <PartyInformation />
            <Rsvp />
        </>
    );
};

export default HomePage;

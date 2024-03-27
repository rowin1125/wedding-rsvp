import React from 'react';

import { Button, Heading, Text } from '@chakra-ui/react';

import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import HomepageHero from 'src/components/marketing/HomepageHero';
import ImageTextBlock from 'src/components/marketing/ImageTextBlock';

import dashboardBB from './images/bb.png';
import weddingRing from './images/WeddingRing.jpg';

const HomePage = () => {
    return (
        <>
            <Metadata title="Home" description="Home page" />

            <HomepageHero />

            <ImageTextBlock imageSrc={weddingRing} gridLayout="7">
                <Heading as="h2" size="xl" mb={4}>
                    Alles in 1 overzicht
                </Heading>
                <Text>
                    In de app van Bruiloft Buddy heb je alles in 1 overzicht.
                    Van je gastenlijst tot je budget en van je takenlijst tot je
                    leveranciers. Alles is te vinden in de app van Bruiloft
                    Buddy. Zo houd je het overzicht en kan je zorgeloos genieten
                    van de voorbereidingen van je bruiloft.
                </Text>
                <br />
                <Text>
                    Daarnaast kan je ook je eigen bruiloft website maken. Zo kan
                    je al je gasten op de hoogte houden van de laatste
                    ontwikkelingen en kunnen ze ook direct hun RSVP doorgeven.
                    Zo weet je precies wie er wel en niet bij zijn op jullie
                    mooiste dag.
                </Text>
            </ImageTextBlock>

            <ImageTextBlock imageSrc={dashboardBB} gridLayout="7" imageFirst>
                <Heading as="h2" size="xl" mb={4}>
                    Een uitgebreid dashboard
                </Heading>
                <Text>
                    Alle gegevens die je nodig hebt voor je bruiloft zijn te
                    vinden in het dashboard van Bruiloft Buddy. Zo kan je in 1
                    oogopslag zien hoeveel budget je nog over hebt, hoeveel
                    taken je nog moet doen en welke leveranciers je nog moet
                    betalen. Zo houd je het overzicht en kan je zorgeloos
                    genieten van de voorbereidingen van je bruiloft.
                </Text>
                <br />
                <Text>
                    Daarnaast zie je precies wie er wel en niet bij zijn op
                    jullie mooiste dag. Zo weet je precies hoeveel gasten je kan
                    verwachten en kan je hier rekening mee houden bij het
                    regelen van je bruiloft. Dit alles komt samen in het
                    dashboard van Bruiloft Buddy.
                </Text>

                <Button
                    mt={4}
                    as={Link}
                    to={routes.signup()}
                    colorScheme="secondary"
                >
                    Start met plannen
                </Button>
            </ImageTextBlock>
        </>
    );
};

export default HomePage;

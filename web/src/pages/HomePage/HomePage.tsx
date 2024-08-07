import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

import { Metadata } from '@redwoodjs/web';

import HomepageHero from 'src/components/marketing/HomepageHero';
import ImageTextBlock from 'src/components/marketing/ImageTextBlock';
import SmartLoginButton from 'src/components/marketing/SmartLoginButton';

const HomePage = () => {
    return (
        <>
            <Metadata title="Home" description="Home page" />

            <HomepageHero />

            <ImageTextBlock
                imageSrc={
                    'https://images.prismic.io/derow-v1/ZjZox0MTzAJOCiGw_WeddingRing.jpg?auto=format,compress'
                }
                gridLayout="7"
            >
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

            <ImageTextBlock
                imageSrc={
                    'https://images.prismic.io/derow-v1/ZjZoxkMTzAJOCiGv_bb.png?auto=format,compress'
                }
                gridLayout="6"
                imageFirst
                imageProps={{
                    objectFit: 'cover',
                    height: '100%',
                    objectPosition: 'left',
                }}
            >
                <Box
                    as="iframe"
                    width="full"
                    height={{
                        base: '850px',
                        lg: '600px',
                    }}
                    src="https://9add87d7.sibforms.com/serve/MUIFAMWhoc_ytqrp4WfFuV1aE7oKUvMZcbiGvJnAgg1G06_yf2rKajf_gseetmXjy9irVJKkli3Ijl6jObolmPKFFWHzyeqVfVceztFpJ_gw5PqRlvhqTgj_vVWDcmqushHipTAVw0Wp6GLVnt6jgsZTf8-dXfV3lBxzN1QNIhrSXVBrPhHyRfg9edtR4si4P2bYo6-FLQTNT0jf"
                    frameBorder="0"
                    scrolling="auto"
                    display="block"
                    marginLeft="auto"
                    marginRight="auto"
                    maxW="100%"
                />
            </ImageTextBlock>

            <ImageTextBlock
                imageSrc={
                    'https://images.prismic.io/derow-v1/ZjZoxkMTzAJOCiGv_bb.png?auto=format,compress'
                }
                gridLayout="7"
            >
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

                <SmartLoginButton mt={4}>Start met plannen</SmartLoginButton>
            </ImageTextBlock>
        </>
    );
};

export default HomePage;

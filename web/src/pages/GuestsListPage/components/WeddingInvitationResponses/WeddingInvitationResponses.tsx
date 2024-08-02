import React from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    Button,
    GridItem,
    Heading,
    Text,
} from '@chakra-ui/react';
import { GetWeddingInvitationResponses, GetWeddingQuery } from 'types/graphql';

import Loader from 'src/components/Loader';

import WeddingInvitationResponsesAccordionButton from './components/WeddingInvitationResponsesAccordionButton';
import WeddingInvitationResponsesAccordionGuest from './components/WeddingInvitationResponsesAccordionGuest';
import WeddingInvitationResponsesIntro from './components/WeddingInvitationResponsesIntro';

type WeddingInvitationResponsesProps = {
    weddingInvitationResponses?: GetWeddingInvitationResponses['weddingInvitationResponses'];
    wedding: GetWeddingQuery['wedding'];
    handleTabChange: (index: number) => void;
};

const WeddingInvitationResponses = ({
    wedding,
    weddingInvitationResponses,
    handleTabChange,
}: WeddingInvitationResponsesProps) => {
    if (!weddingInvitationResponses) {
        return <Loader />;
    }

    if (weddingInvitationResponses && !weddingInvitationResponses?.length) {
        return (
            <GridItem colSpan={{ base: 12, lg: 12 }}>
                <Heading as="h3" size="h3" mt={4} mb={6}>
                    {"Er zijn geen RSVP's binnengekomen"}
                </Heading>
                <Text my={4}>
                    Je hebt of nog geen RSVP aanmeldingen ontvangen of je hebt
                    alles netjes verwerkt, lekker bezig!
                </Text>
                <Button onClick={() => handleTabChange(0)}>
                    Terug naar gastenlijst
                </Button>
            </GridItem>
        );
    }

    return (
        <>
            <WeddingInvitationResponsesIntro wedding={wedding} />
            <GridItem colSpan={{ base: 12, lg: 12 }}>
                <Heading as="h3" size="h3" mt={4} mb={6}>
                    {"Binnengekomen RSVP's"}
                </Heading>
                <Accordion
                    allowMultiple
                    defaultIndex={
                        weddingInvitationResponses?.map(
                            (_, index) => index
                        ) ?? [0]
                    }
                >
                    {weddingInvitationResponses?.map(
                        (weddingInvitationResponse, groupIndex) => {
                            return (
                                <AccordionItem
                                    key={weddingInvitationResponse.id}
                                    borderColor="secondary.300"
                                    borderTopWidth={groupIndex === 0 ? 0 : 1}
                                    _last={{
                                        borderBottomWidth: 0,
                                    }}
                                >
                                    <WeddingInvitationResponsesAccordionButton
                                        weddingInvitationResponse={
                                            weddingInvitationResponse
                                        }
                                    />
                                    <AccordionPanel
                                        pt={0}
                                        pb={0}
                                        pr={0}
                                        pl="60px"
                                        display="flex"
                                        flexDir="column"
                                        overflow="visible"
                                        backgroundColor="primary.100"
                                    >
                                        {weddingInvitationResponse.guestWeddingResponses.map(
                                            (
                                                guestWeddingResponse,
                                                responseIndex
                                            ) => (
                                                <WeddingInvitationResponsesAccordionGuest
                                                    weddingInvitationResponse={
                                                        weddingInvitationResponse
                                                    }
                                                    key={
                                                        guestWeddingResponse?.id
                                                    }
                                                    guestWeddingResponse={
                                                        guestWeddingResponse
                                                    }
                                                    showArrows
                                                    index={responseIndex}
                                                    isFirst={
                                                        responseIndex === 0
                                                    }
                                                    isLast={
                                                        responseIndex ===
                                                        weddingInvitationResponse
                                                            .guestWeddingResponses
                                                            .length -
                                                            1
                                                    }
                                                />
                                            )
                                        )}
                                    </AccordionPanel>
                                </AccordionItem>
                            );
                        }
                    )}
                </Accordion>
            </GridItem>
        </>
    );
};

export default WeddingInvitationResponses;

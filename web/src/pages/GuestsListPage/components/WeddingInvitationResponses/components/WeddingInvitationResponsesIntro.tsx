import React from 'react';

import { GridItem, Box, Heading, Alert, Text } from '@chakra-ui/react';
import { GetWeddingQuery } from 'types/graphql';

type WeddingInvitationResponsesIntroProps = {
    wedding: GetWeddingQuery['wedding'];
};

const WeddingInvitationResponsesIntro = ({
    wedding,
}: WeddingInvitationResponsesIntroProps) => {
    return (
        <GridItem colSpan={{ base: 12, lg: 7 }}>
            <Box>
                <Heading>{wedding?.name} gastenlijst</Heading>
                <Alert mt={4} status="info" variant="left-accent">
                    <Box>
                        <Text>
                            Hieronder zie je de binnengekomen RSVP&rsquo;s van
                            de uitnodigingen die zijn verstuurd.
                        </Text>
                        <Text mt={4}>
                            Klik op de gasten om de details van de RSVP te
                            bekijken en om ze vervolgens te koppelen aan de
                            individuele gasten.
                        </Text>
                    </Box>
                </Alert>
            </Box>
        </GridItem>
    );
};

export default WeddingInvitationResponsesIntro;

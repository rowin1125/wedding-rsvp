import React, { useState } from 'react';

import {
    GridItem,
    Checkbox,
    Alert,
    AlertIcon,
    Link as ChakraLink,
    Text,
} from '@chakra-ui/react';
import { GetWeddingInvitationResponses, GetGuests } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import GuestAddressChangeRow from './GuestAddressChangeRow';
import GuestChangeRow from './GuestChangeRow';

type GuestRemainingCheckingRowsProps = {
    guestWeddingResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0]['guestWeddingResponses'][0];
    guest?: GetGuests['guests'][0];
    weddingInvitationResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0];
};

const GuestRemainingCheckingRows = ({
    guestWeddingResponse,
    guest,
    weddingInvitationResponse,
}: GuestRemainingCheckingRowsProps) => {
    const [showAll, setShowAll] = useState(false);

    return (
        <>
            <GridItem colSpan={11}>
                <Checkbox onChange={() => setShowAll(!showAll)}>
                    <Text fontWeight="semibold">
                        Laat alle data zien van de gast
                    </Text>
                </Checkbox>
            </GridItem>
            {showAll && (
                <>
                    <GuestChangeRow
                        guestWeddingResponse={guestWeddingResponse}
                        guest={guest}
                        property="email"
                        label="Email"
                    />
                    <GuestChangeRow
                        guestWeddingResponse={guestWeddingResponse}
                        guest={guest}
                        property="phoneNumber"
                        label="Telefoonnummer"
                    />
                    <GuestChangeRow
                        guestWeddingResponse={guestWeddingResponse}
                        guest={guest}
                        property="isChild"
                        label="Adres"
                    />
                    <GuestChangeRow
                        guestWeddingResponse={guestWeddingResponse}
                        guest={guest}
                        property="dietary"
                        label="Dieetwensen"
                    />
                    <GridItem colSpan={11}>
                        {guestWeddingResponse?.guest?.weddingId && (
                            <Alert status="info" mb={4} variant="left-accent">
                                <AlertIcon />
                                {weddingInvitationResponse?.weddingRsvpLandingPageId && (
                                    <Text>
                                        Hieronder vind je het adres van de gast
                                        en het adres van de RSVP. Als deze niet
                                        overeenkomen, kun je het adres van de
                                        gast aanpassen in het RSVP-formulier:
                                        <ChakraLink
                                            ml={1}
                                            as={Link}
                                            textDecor={'underline'}
                                            to={routes.updateWeddingInvitationResponse(
                                                {
                                                    weddingId:
                                                        guestWeddingResponse
                                                            ?.guest?.weddingId,
                                                    weddingInvitationResponseId:
                                                        weddingInvitationResponse.id,
                                                    landingPageId:
                                                        weddingInvitationResponse?.weddingRsvpLandingPageId,
                                                }
                                            )}
                                        >
                                            Formulier
                                        </ChakraLink>{' '}
                                    </Text>
                                )}
                            </Alert>
                        )}
                    </GridItem>
                    <GuestAddressChangeRow
                        guestInvitationAddress={
                            weddingInvitationResponse.address
                        }
                        guestAddress={guest?.address}
                        property="street"
                        label="Straat"
                    />
                    <GuestAddressChangeRow
                        guestInvitationAddress={
                            weddingInvitationResponse.address
                        }
                        guestAddress={guest?.address}
                        property="houseNumber"
                        label="Huisnummer"
                    />
                    <GuestAddressChangeRow
                        guestInvitationAddress={
                            weddingInvitationResponse.address
                        }
                        guestAddress={guest?.address}
                        property="zipCode"
                        label="Postcode"
                    />
                    <GuestAddressChangeRow
                        guestInvitationAddress={
                            weddingInvitationResponse.address
                        }
                        guestAddress={guest?.address}
                        property="city"
                        label="Plaats"
                    />
                    <GuestAddressChangeRow
                        guestInvitationAddress={
                            weddingInvitationResponse.address
                        }
                        guestAddress={guest?.address}
                        property="country"
                        label="Land"
                    />
                    <GuestAddressChangeRow
                        guestInvitationAddress={
                            weddingInvitationResponse.address
                        }
                        guestAddress={guest?.address}
                        property="livesAbroad"
                        label="Woont in het buitenland"
                    />
                </>
            )}
        </>
    );
};

export default GuestRemainingCheckingRows;

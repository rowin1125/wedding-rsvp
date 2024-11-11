import React from 'react';

import { Box, Badge, Icon, Tooltip, Text } from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa6';
import { GetGuestGroupsQuery } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';

type GuestAccordionConnectedViaRsvpProps = {
    guest: NonNullable<GetGuestGroupsQuery['guestGroups'][0]['guests'][0]>;
};

const GuestAccordionConnectedViaRsvp = ({
    guest,
}: GuestAccordionConnectedViaRsvpProps) => {
    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (
            !guest.guestWeddingResponse?.weddingInvitationResponseId ||
            !guest.guestWeddingResponse?.weddingRsvpLandingPageId ||
            !guest.weddingId
        )
            return;

        navigate(
            routes.updateWeddingInvitationResponse({
                weddingId: guest.weddingId,
                weddingInvitationResponseId:
                    guest.guestWeddingResponse?.weddingInvitationResponseId ??
                    '',
                landingPageId:
                    guest.guestWeddingResponse?.weddingRsvpLandingPageId ?? '',
            })
        );
    };
    return (
        <Box>
            {guest.connectedViaRsvp &&
                guest.guestWeddingResponse?.weddingInvitationResponseId && (
                    <Tooltip label="Gast gekoppeld via RSVP ✅ ">
                        <Badge
                            colorScheme="green"
                            display="flex"
                            onClick={handleOnClick}
                            as={Badge}
                            justifyContent="center"
                            _hover={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                            alignItems="center"
                            borderRadius={5}
                            px={2}
                            py={1.5}
                        >
                            <Icon as={FaLink} fontSize="md" mr={2} />
                            <Text fontSize="xx-small">via RSVP</Text>
                        </Badge>
                    </Tooltip>
                )}
        </Box>
    );
};

export default GuestAccordionConnectedViaRsvp;

import React from 'react';

import { Badge, Icon, Tooltip } from '@chakra-ui/react';
import { CiWarning } from 'react-icons/ci';
import { GetGuestGroupsQuery } from 'types/graphql';

type GuestAccordionDayPresentsMissingProps = {
    guest: NonNullable<GetGuestGroupsQuery['guestGroups'][0]['guests'][0]>;
};

const GuestAccordionDayPresentsMissing = ({
    guest,
}: GuestAccordionDayPresentsMissingProps) => {
    const guestHasMissingDayPartsPresents = guest.guestDayPartsPresents.some(
        (dayPart) =>
            (!!dayPart?.guestWeddingResponseStatus &&
                dayPart?.guestWeddingResponseStatus === 'UNKNOWN') ??
            true
    );
    if (!guestHasMissingDayPartsPresents) return null;

    return (
        <Tooltip label="Deze gast mist nog een reactie op een dagdeel">
            <Badge
                colorScheme="orange"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius={5}
                px={2}
                py={1}
                mr={4}
            >
                <Icon as={CiWarning} color="red.500" fontSize="xl" />
            </Badge>
        </Tooltip>
    );
};

export default GuestAccordionDayPresentsMissing;

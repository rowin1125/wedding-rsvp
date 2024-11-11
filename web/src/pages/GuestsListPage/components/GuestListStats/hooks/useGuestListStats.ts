import { useMemo } from 'react';

import { GetGuestGroupsQuery } from 'types/graphql';

export const useGuestListStats = (
    guestGroups?: GetGuestGroupsQuery['guestGroups']
) => {
    return useMemo(() => {
        const totalGroupCount = guestGroups?.length ?? 0;
        const totalGuestsCount = guestGroups?.reduce((acc, group) => {
            return acc + (group?.guests?.length ?? 0);
        }, 0);
        const totalChildCount = guestGroups?.reduce((acc, group) => {
            return (
                acc +
                (group?.guests?.filter((guest) => guest?.isChild).length ?? 0)
            );
        }, 0);
        const totalForeignCount = guestGroups?.reduce((acc, group) => {
            return (
                acc + (group?.address?.livesAbroad ? group.guests.length : 0)
            );
        }, 0);
        const totalWithCompletedAddressCount = guestGroups?.reduce(
            (acc, group) => {
                return acc + (!group?.address?.addressDataMissing ? 1 : 0);
            },
            0
        );

        const addressesProgress =
            ((totalWithCompletedAddressCount ?? 0) / totalGroupCount) * 100;

        const totalGuestCount =
            guestGroups?.reduce((acc, group) => {
                return acc + (group?.guests?.length ?? 0);
            }, 0) ?? 0;
        const totalGuestCountWithConnectViaRsvp =
            guestGroups?.reduce((acc, group) => {
                return (
                    acc +
                    (group?.guests?.filter((guest) => guest?.connectedViaRsvp)
                        .length ?? 0)
                );
            }, 0) ?? 0;
        const totalGuestCountWithConnectViaRsvpPercentage =
            (totalGuestCountWithConnectViaRsvp / totalGuestCount) * 100;

        const totalGuestWithCorrectDayPresentsResponse =
            guestGroups?.reduce((acc, group) => {
                return (
                    acc +
                    (group?.guests?.filter((guest) =>
                        guest?.guestDayPartsPresents.every(
                            (dayPart) =>
                                (!!dayPart?.guestWeddingResponseStatus &&
                                    dayPart?.guestWeddingResponseStatus !==
                                        'UNKNOWN') ??
                                false
                        )
                    ).length ?? 0)
                );
            }, 0) ?? 0;
        const totalGuestWithCorrectDayPresentsResponsePercentage =
            (totalGuestWithCorrectDayPresentsResponse / totalGuestCount) * 100;

        return {
            totalGroupCount,
            totalGuestsCount,
            totalChildCount,
            totalForeignCount,
            totalWithCompletedAddressCount,
            addressesProgress,
            totalGuestCount,
            totalGuestCountWithConnectViaRsvp,
            totalGuestCountWithConnectViaRsvpPercentage,
            totalGuestWithCorrectDayPresentsResponse,
            totalGuestWithCorrectDayPresentsResponsePercentage,
        };
    }, [guestGroups]);
};

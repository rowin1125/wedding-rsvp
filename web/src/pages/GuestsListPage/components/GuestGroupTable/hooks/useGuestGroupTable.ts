import { useEffect, useMemo, useState } from 'react';

import Fuse from 'fuse.js';
import { GetGuestGroupsQuery } from 'types/graphql';

type UseSearchGuestGroupTableType = {
    guestGroups: GetGuestGroupsQuery['guestGroups'];
};

export const useGuestGroupTable = ({
    guestGroups,
}: UseSearchGuestGroupTableType) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<
        GetGuestGroupsQuery['guestGroups']
    >(guestGroups ?? []);

    useEffect(() => {
        setSearchResults(guestGroups ?? []);
    }, [guestGroups]);

    const fuse = new Fuse(guestGroups ?? [], {
        keys: ['name', 'guests.firstName', 'guests.lastName'],
        threshold: 0.4,
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        if (!value || value.length < 2) {
            return setSearchResults(guestGroups ?? []);
        }

        const results = fuse.search(value);
        setSearchResults(results.map((result) => result.item));
    };

    const guestGroupSet = useMemo(() => {
        const guestMap = new Map<
            string,
            GetGuestGroupsQuery['guestGroups'][0][]
        >();
        searchResults?.forEach((group) => {
            if (guestMap.has(group.guestGroupRelationType)) {
                guestMap.set(group.guestGroupRelationType, [
                    ...(guestMap.get(group.guestGroupRelationType) ?? []),
                    group,
                ]);
            } else {
                guestMap.set(group.guestGroupRelationType, [group]);
            }
        });

        return guestMap;
    }, [searchResults]);

    const [expendedIndexes, setExpendedIndexes] = useState<number[]>([]);
    const [childExpendedIndexes, setChildExpendedIndexes] = useState<
        Record<string, number[]> | undefined
    >(undefined);

    useEffect(() => {
        if (guestGroups) {
            setExpendedIndexes(
                Array.from(guestGroupSet).map((_group, index) => index)
            );
            setChildExpendedIndexes(
                Array.from(guestGroupSet).reduce((acc, curr) => {
                    return {
                        ...acc,
                        [curr[0]]: Array.from(Array(curr[1].length).keys()).map(
                            (index) => index
                        ),
                    };
                }, {})
            );
        }
    }, [guestGroupSet, guestGroups]);

    const toggleAll = () => {
        if (expendedIndexes.length === 0) {
            setExpendedIndexes(
                Array.from(guestGroupSet).map((_group, index) => index)
            );
            setChildExpendedIndexes(
                Array.from(guestGroupSet).reduce((acc, curr) => {
                    return {
                        ...acc,
                        [curr[0]]: Array.from(Array(curr[1].length).keys()).map(
                            (index) => index
                        ),
                    };
                }, {})
            );
        } else {
            setExpendedIndexes([]);
            setChildExpendedIndexes({});
        }
    };

    const hasExpendedIndex = expendedIndexes.length > 0;

    return {
        search,
        searchResults,
        guestGroupSet,
        expendedIndexes,
        hasExpendedIndex,
        childExpendedIndexes,
        toggleAll,
        handleSearch,
        setSearchResults,
        setExpendedIndexes,
    };
};

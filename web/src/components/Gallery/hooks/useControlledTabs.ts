import { useCallback, useEffect } from 'react';

import { useLocation } from '@redwoodjs/router';

export const useControlledTabs = <
    T extends Array<string>,
    C extends (tab: string) => void
>({
    tabs,
    navigationCallback,
}: {
    tabs: T;
    navigationCallback?: C;
}) => {
    const { search } = useLocation();
    const [tabIndex, setTabIndex] = React.useState(0);
    const currentTab = tabs[tabIndex];

    const handleTabChange = useCallback(
        (index: number) => {
            setTabIndex(index);
            const tab = tabs[index];

            navigationCallback?.(tab);
        },
        [navigationCallback, tabs]
    );

    useEffect(() => {
        if (!navigationCallback) return;
        const REVERSE_TAB_MAP = tabs.reduce<Record<string, number>>(
            (acc, tab, index) => {
                acc[tab] = index;
                return acc;
            },
            {}
        );

        const query = new URLSearchParams(search);
        const tab = query.get('tab');
        const tabIndex = REVERSE_TAB_MAP[tab as keyof typeof REVERSE_TAB_MAP];

        if (!tab) return;

        handleTabChange(tabIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        currentTab,
        tabIndex,
        handleTabChange,
    };
};

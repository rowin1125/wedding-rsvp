import React, { useMemo } from 'react';

import { Data, usePuck } from '@measured/puck';
import isEqual from 'lodash/isEqual';

type PuckPreviewWrapperProps = {
    children: React.ReactNode;
    initialData?: Partial<Data>;
    onPublish?: (data: Partial<Data>) => Promise<void>;
    isLoading: boolean;
};

type GlobalPuckContextType = {
    onPublish?: (data: Partial<Data>) => Promise<void>;
    isLoading: boolean;
    initialData?: Partial<Data>;
    puck: ReturnType<typeof usePuck>;
    dataUpdated: boolean;
};
export const GlobalPuckContext = React.createContext<GlobalPuckContextType>({
    onPublish: async () => {},
    isLoading: false,
    initialData: {},
    puck: {} as ReturnType<typeof usePuck>,
    dataUpdated: false,
});

export const useGlobalPuckContext = () => React.useContext(GlobalPuckContext);

const PuckPreviewWrapper = ({
    children,
    onPublish,
    isLoading,
    initialData,
}: PuckPreviewWrapperProps) => {
    const puck = usePuck();
    const isInitialDataDifferent = useMemo(() => {
        return !isEqual(initialData, puck.appState.data);
    }, [initialData, puck.appState.data]);

    return (
        <GlobalPuckContext.Provider
            value={{
                onPublish,
                isLoading,
                puck,
                dataUpdated: isInitialDataDifferent,
            }}
        >
            {children}
        </GlobalPuckContext.Provider>
    );
};

export default PuckPreviewWrapper;

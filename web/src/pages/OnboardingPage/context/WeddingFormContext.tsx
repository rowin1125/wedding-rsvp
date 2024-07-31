import { createContext, useContext } from 'react';

import { useSteps } from '@chakra-ui/react';
import { CreateWeddingMutationVariables } from 'types/graphql';

export type WeddingFormContextType = {
    formValues: Partial<CreateWeddingMutationVariables['input']>;
    steps: WeddingFormProviderProps['steps'];
    stepControls?: WeddingFormProviderProps['stepControls'];
    globalFormState?: WeddingFormProviderProps['initialGlobalFormState'];
};

export const WeddingFormContext = createContext<WeddingFormContextType>({
    formValues: {},
    stepControls: undefined,
    steps: [],
    globalFormState: undefined,
});

export const useWeddingFormContext = () => {
    const context = useContext(WeddingFormContext);

    if (!context) {
        throw new Error(
            'useWeddingFormContext must be used within a WeddingFormProvider'
        );
    }

    return context;
};

type WeddingFormProviderProps = {
    children: React.ReactNode;
    steps: { title: string; description: string }[];
    stepControls: ReturnType<typeof useSteps>;
    initialGlobalFormState?: [
        WeddingFormContextType['formValues'],
        React.Dispatch<
            React.SetStateAction<WeddingFormContextType['formValues']>
        >
    ];
};

export const WeddingFormProvider = ({
    children,
    stepControls,
    steps,
    initialGlobalFormState,
}: WeddingFormProviderProps) => {
    const [formValues] = initialGlobalFormState ?? [];

    return (
        <WeddingFormContext.Provider
            value={{
                globalFormState: initialGlobalFormState,
                steps,
                stepControls,
                formValues: {
                    ...formValues,
                },
            }}
        >
            {children}
        </WeddingFormContext.Provider>
    );
};

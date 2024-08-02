import { createContext, useContext } from 'react';

import { useSteps } from '@chakra-ui/react';
import { CreateWeddingMutationVariables } from 'types/graphql';

import { CustomDate } from 'src/lib/CustomDate';

export type WeddingFormContextType = {
    formValues: Partial<CreateWeddingMutationVariables['input']>;
    steps: WeddingFormProviderProps['steps'];
    stepControls?: WeddingFormProviderProps['stepControls'];
    globalFormState?: WeddingFormProviderProps['initialGlobalFormState'];
};

export const initialDevFormValues: WeddingFormContextType['formValues'] = {
    date: new Date('05-16-2025').toISOString().split('T')[0],
    name: 'Bruiloft Demi & Rowin',
    theme: 'Bohemian',
    preferredSeason: 'Summer',
    isAbroad: false,
    dayParts: [
        {
            name: 'DayGuests',
            startTime: new CustomDate(
                '2025-05-15T00:01:00.000Z'
            ).formatForInput(),

            endTime: new CustomDate(
                '2025-05-15T00:02:00.000Z'
            ).formatForInput(),
            description: 'Day guests arrive',
        },
        {
            name: 'EveningGuests',
            startTime: new CustomDate(
                '2025-05-15T00:03:00.000Z'
            ).formatForInput(),
            endTime: new CustomDate(
                '2025-05-15T00:04:00.000Z'
            ).formatForInput(),
            description: 'Evening guests arrive',
        },
    ],
    partners: [
        {
            firstName: 'Demi',
            lastName: 'Verdoren',
            gender: 'FEMALE',
            type: 'BRIDE',
        },
        {
            firstName: 'Rowin',
            lastName: 'Mol',
            gender: 'MALE',
            type: 'GROOM',
        },
    ],
};

export const WeddingFormContext = createContext<WeddingFormContextType>({
    formValues:
        process.env.NODE_ENV === 'development' ? initialDevFormValues : {},
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

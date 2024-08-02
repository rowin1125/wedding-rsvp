import { useMemo, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { object, string, boolean, InferType } from 'yup';

import useDebounce from 'src/hooks/useDebounce';

import { useWeddingFormContext } from '../context/WeddingFormContext';
import { getSeason } from '../helpers/getSeason';

type UseWeddingInformationFormType = {
    handleNext: () => void;
};

export const useWeddingInformationForm = ({
    handleNext,
}: UseWeddingInformationFormType) => {
    const validationSchema = object({
        name: string().required('Naam is verplicht'),
        date: string()
            .required('Datum is verplicht')
            .test('isFuture', 'Datum moet in de toekomst liggen', (value) => {
                const currentDate = new Date();
                const selectedDate = new Date(value);

                return currentDate < selectedDate;
            })
            .test(
                'isWithinFiveYears',
                'Datum moet binnen 5 jaar liggen, er is ook iets als te vroeg beginnen met de voorbereiding 😆',
                (value) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);
                    const fiveYearsFromNow = new Date();
                    fiveYearsFromNow.setFullYear(
                        fiveYearsFromNow.getFullYear() + 5
                    );

                    return (
                        currentDate < selectedDate &&
                        selectedDate < fiveYearsFromNow
                    );
                }
            ),
        theme: string(),
        preferredSeason: string(),
        isAbroad: boolean(),
    });

    const initialDate = useMemo(() => {
        const date = new Date();

        return date.toISOString().split('T')[0];
    }, []);

    const { globalFormState } = useWeddingFormContext();
    const [globalFormValues, setGlobalFormState] = globalFormState ?? [];

    const initialValues = {
        name: globalFormValues?.name ?? '',
        date: globalFormValues?.date ?? initialDate,
        theme: globalFormValues?.theme ?? '',
        preferredSeason: globalFormValues?.preferredSeason ?? '',
        isAbroad: globalFormValues?.isAbroad ?? false,
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    const onSubmit = async (values: InferType<typeof validationSchema>) => {
        setGlobalFormState?.((prev) => ({
            ...prev,
            name: values.name,
            date: values.date,
            theme: values.theme,
            preferredSeason: values.preferredSeason,
            isAbroad: values.isAbroad,
        }));
        handleNext();
    };

    const dateValue = useWatch({
        control: methods.control,
        name: 'date',
    });

    const debouncedDateValue = useDebounce(dateValue, 200);

    useEffect(() => {
        const season = getSeason(debouncedDateValue);
        methods.setValue('preferredSeason', season);

        setGlobalFormState?.((prev) => ({
            ...prev,
            dayParts: prev.dayParts?.map((dayPart) => {
                const currentStartDate = new Date(dayPart.startTime);
                const newStartDate = new Date(debouncedDateValue);
                newStartDate.setHours(currentStartDate.getHours());
                newStartDate.setMinutes(currentStartDate.getMinutes());

                const currentEndDate = new Date(dayPart.endTime);
                const newEndDate = new Date(debouncedDateValue);
                newEndDate.setHours(currentEndDate.getHours());
                newEndDate.setMinutes(currentEndDate.getMinutes());

                return {
                    ...dayPart,
                    startTime: (newStartDate
                        ? new Date(newStartDate)
                        : new Date()
                    )
                        ?.toISOString()
                        ?.slice(0, 16),
                    endTime: (newEndDate ? new Date(newEndDate) : new Date())
                        ?.toISOString()
                        ?.slice(0, 16),
                };
            }),
        }));
    }, [debouncedDateValue, methods, setGlobalFormState]);

    return {
        methods,
        onSubmit,
    };
};

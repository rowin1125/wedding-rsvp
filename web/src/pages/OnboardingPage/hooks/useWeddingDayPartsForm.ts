import { useMemo, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, array, string, ValidationError, InferType } from 'yup';

import { useWeddingFormContext } from '../context/WeddingFormContext';

import { useCreateWedding } from './useCreateWedding';

export const useWeddingDayPartsForm = () => {
    const { globalFormState } = useWeddingFormContext();
    const [globalFormValues, setGlobalFormState] = globalFormState ?? [];

    const validationSchema = object().shape({
        dayParts: array()
            .of(
                object().shape({
                    name: string().required('Naam is verplicht'),
                    description: string(),
                    startTime: string()
                        .test(
                            'isFuture',
                            'Starttijd moet in de toekomst liggen',
                            (value) => {
                                const currentDate = new Date();
                                const selectedDate = new Date(
                                    value ?? new Date()
                                );
                                return currentDate < selectedDate;
                            }
                        )
                        .required('Starttijd is verplicht'),
                    endTime: string()
                        .test(
                            'isFuture',
                            'Eindtijd moet in de toekomst liggen',
                            (value) => {
                                const currentDate = new Date();
                                const selectedDate = new Date(
                                    value ?? new Date()
                                );
                                return currentDate < selectedDate;
                            }
                        )
                        .test(
                            'isAfterStartTime',
                            'Eindtijd moet na de starttijd liggen',
                            (value, context) => {
                                const startTime = new Date(
                                    context.parent.startTime
                                );
                                const endTime = new Date(value ?? new Date());
                                return startTime < endTime;
                            }
                        )
                        .required('Eindtijd is verplicht'),
                })
            )
            .test('orderedStartTimes', '', function (dayParts) {
                if (!dayParts || dayParts.length <= 1) return true;

                const errors = [];

                for (let i = 0; i < dayParts.length - 1; i++) {
                    const currentStartTime = new Date(dayParts[i].startTime);
                    const nextStartTime = new Date(dayParts[i + 1].startTime);

                    if (currentStartTime >= nextStartTime) {
                        errors.push(
                            this.createError({
                                path: `dayParts[${i + 1}].startTime`,
                                message: `Moet na de starttijd van dagdeel ${
                                    i + 1
                                } liggen`,
                            })
                        );
                    }
                }

                if (errors.length > 0) {
                    return new ValidationError(errors);
                }

                return true;
            })
            .test(
                'allStartAndEndTimesShouldBeWithinADayOfTheWedding',
                '',
                function (dayParts) {
                    if (!dayParts || dayParts.length <= 0) return true;

                    const weddingDate = new Date(
                        globalFormValues?.date ?? new Date()
                    );

                    const errors = [];

                    for (let i = 0; i < dayParts.length; i++) {
                        const startTime = new Date(dayParts[i].startTime);
                        const endTime = new Date(dayParts[i].endTime);

                        const weekOffset = 7 * 24 * 60 * 60 * 1000;
                        const startDateOffset =
                            weddingDate.getTime() - weekOffset;
                        const endDateOffset =
                            weddingDate.getTime() + weekOffset;

                        if (
                            startTime.getTime() < startDateOffset ||
                            endTime.getTime() > endDateOffset
                        ) {
                            errors.push(
                                this.createError({
                                    path: `dayParts[${i}].startTime`,
                                    message: `Start en einddatum + tijd moet binnen een week van de trouwerij zijn`,
                                })
                            );
                            errors.push(
                                this.createError({
                                    path: `dayParts[${i}].endTime`,
                                    message: `Start en einddatum + tijd moet binnen een week van de trouwerij zijn`,
                                })
                            );
                        }
                    }

                    if (errors.length > 0) {
                        return new ValidationError(errors);
                    }

                    return true;
                }
            ),
    });

    const initialValues: InferType<typeof validationSchema> = useMemo(
        () => ({
            dayParts: globalFormValues?.dayParts
                ? globalFormValues.dayParts.map((part) => ({
                      ...part,
                      startTime:
                          part.startTime ??
                          new Date().toISOString().slice(0, 16),
                      endTime:
                          part.endTime ?? new Date().toISOString().slice(0, 16),
                      description: part.description ?? '',
                  }))
                : [
                      {
                          startTime: new Date().toISOString().slice(0, 16),
                          endTime: new Date().toISOString().slice(0, 16),
                          name: '',
                          description: '',
                      },
                  ],
        }),
        [globalFormValues]
    );

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    useEffect(() => {
        if (globalFormValues?.date) {
            methods.reset(initialValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    const { createWedding, loading } = useCreateWedding();

    const onSubmit = async (values: InferType<typeof validationSchema>) => {
        setGlobalFormState?.((prev) => ({
            ...prev,
            dayParts: values.dayParts,
        }));

        if (
            !globalFormValues?.date ||
            !globalFormValues?.name ||
            !globalFormValues?.partners ||
            !values.dayParts
        ) {
            throw new Error('Bruiloftsdatum of bruiloftsnaam is niet ingevuld');
        }

        await createWedding({
            variables: {
                input: {
                    date: new Date(globalFormValues.date).toISOString(),
                    name: globalFormValues.name,
                    theme: globalFormValues.theme,
                    isAbroad: globalFormValues.isAbroad,
                    partners: globalFormValues.partners,
                    dayParts: values.dayParts.map((part) => ({
                        name: part.name,
                        description: part.description,
                        startTime: part.startTime + ':00.000Z',
                        endTime: part.endTime + ':00.000Z',
                    })),
                    preferredSeason: globalFormValues.preferredSeason,
                },
            },
        });
    };

    return {
        onSubmit,
        methods,
        loading,
    };
};

import { useMemo } from 'react';

import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    GetWeddingQuery,
    UpdateWeddingDayPartsMutation,
    UpdateWeddingDayPartsMutationVariables,
} from 'types/graphql';
import { object, array, string, ValidationError, InferType } from 'yup';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { GET_WEDDING_BY_ID } from 'src/hooks/useGetWeddingById';

type UseUpdateWeddingDayPartsFormType = {
    dayParts: NonNullable<GetWeddingQuery['wedding']>['dayParts'];
    weddingDate: string;
};

export const UPDATE_WEDDING_DAY_PARTS = gql`
    mutation UpdateWeddingDayPartsMutation(
        $input: [UpdateWeddingDayPartsInput!]!
    ) {
        updateWeddingDayParts(input: $input) {
            id
        }
    }
`;

export const useUpdateWeddingDayPartsForm = ({
    dayParts,
    weddingDate,
}: UseUpdateWeddingDayPartsFormType) => {
    const toast = useToast();
    const { currentUser } = useAuth();
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

                    const date = new Date(weddingDate ?? new Date());

                    const errors = [];

                    for (let i = 0; i < dayParts.length; i++) {
                        const startTime = new Date(dayParts[i].startTime);
                        const endTime = new Date(dayParts[i].endTime);

                        const weekOffset = 7 * 24 * 60 * 60 * 1000;
                        const startDateOffset = date.getTime() - weekOffset;
                        const endDateOffset = date.getTime() + weekOffset;

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

    const filteredInitialDayPartsValues = dayParts?.filter(
        (dayPart) => dayPart !== null
    );

    const sortedInitialDayPartsValues = useMemo(
        () =>
            filteredInitialDayPartsValues
                ? filteredInitialDayPartsValues.sort(
                      (a, b) =>
                          new Date(a.startTime).getTime() -
                          new Date(b.startTime).getTime()
                  )
                : [],
        [filteredInitialDayPartsValues]
    );

    const initialValues: InferType<typeof validationSchema> = useMemo(
        () => ({
            dayParts: sortedInitialDayPartsValues
                ? sortedInitialDayPartsValues.map((part) => ({
                      ...part,
                      startTime: part.startTime
                          ? new Date(part.startTime).toISOString().slice(0, 16)
                          : new Date().toISOString().slice(0, 16),
                      endTime: part.endTime
                          ? new Date(part.endTime).toISOString().slice(0, 16)
                          : new Date().toISOString().slice(0, 16),
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
        [sortedInitialDayPartsValues]
    );

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    const [updateWeddingDayParts, updateWeddingDayPartsMeta] = useMutation<
        UpdateWeddingDayPartsMutation,
        UpdateWeddingDayPartsMutationVariables
    >(UPDATE_WEDDING_DAY_PARTS, {
        refetchQueries: [
            {
                query: GET_WEDDING_BY_ID,
                variables: {
                    id: currentUser?.weddingId,
                },
            },
        ],
    });

    const onSubmit = async (values: InferType<typeof validationSchema>) => {
        if (!values.dayParts) return;

        const dayPatsWithIds = values.dayParts.map((part, index) => ({
            ...part,
            id: filteredInitialDayPartsValues[index]?.id,
        }));

        try {
            await updateWeddingDayParts({
                variables: {
                    input: dayPatsWithIds.map((part) => ({
                        id: part.id,
                        input: {
                            name: part.name,
                            description: part.description,
                            startTime: part.startTime + ':00.000Z',
                            endTime: part.endTime + ':00.000Z',
                        },
                    })),
                },
            });
            toast({
                title: 'Dagdelen zijn bijgewerkt',
                status: 'success',
            });
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Er is iets fout gegaan',
                    description: error.message,
                    status: 'error',
                });
            }
        }
    };

    return {
        onSubmit,
        methods,
        ...updateWeddingDayPartsMeta,
    };
};

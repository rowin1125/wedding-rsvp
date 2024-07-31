import { useEffect } from 'react';

import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { object, string, boolean, number, InferType } from 'yup';

import useDebounce from 'src/hooks/useDebounce';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { getSeason } from 'src/pages/OnboardingPage/helpers/getSeason';

import { useUpdateWedding } from './useUpdateWedding';

export const useUpdateWeddingForm = () => {
    const { wedding, loading: weddingLoading } = useGetWeddingById();
    const { updateWedding, loading: updateWeddingLoading } = useUpdateWedding();
    const toast = useToast();

    const initialDate = new Date(wedding?.date || new Date())
        .toISOString()
        .split('T')[0];

    const validationSchema = object({
        name: string().required('Naam is verplicht'),
        date: string().required('Datum is verplicht'),
        theme: string(),
        preferredSeason: string(),
        isAbroad: boolean(),
        bannerImage: object({
            id: string(),
            focalPoint: object({
                x: number(),
                y: number(),
            }),
        }),
    });

    const initialValues = {
        name: wedding?.name || '',
        date: initialDate || new Date().toISOString().split('T')[0],
        theme: wedding?.theme || '',
        preferredSeason: wedding?.preferredSeason || '',
        isAbroad: wedding?.isAbroad || false,
        bannerImage: {
            id: wedding?.bannerImage?.asset.id || '',
            focalPoint: {
                x: wedding?.bannerImage?.metadata?.focalPoint?.x || 50,
                y: wedding?.bannerImage?.metadata?.focalPoint?.y || 50,
            },
        },
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    const formHasChanged = methods.formState.isDirty;

    const dateValue = useWatch({
        control: methods.control,
        name: 'date',
    });
    const debouncedDateValue = useDebounce(dateValue, 200);

    useEffect(() => {
        const season = getSeason(debouncedDateValue);
        methods.setValue('preferredSeason', season, { shouldDirty: true });
    }, [debouncedDateValue, methods]);

    const onSubmit = async (values: InferType<typeof validationSchema>) => {
        if (!wedding) {
            throw new Error('No wedding found');
        }

        try {
            await updateWedding({
                variables: {
                    id: wedding.id,
                    input: {
                        date: new Date(values.date).toISOString(),
                        name: values.name,
                        isAbroad: values.isAbroad,
                        preferredSeason: values.preferredSeason,
                        theme: values.theme,
                        bannerImageId: values.bannerImage.id || null,
                        bannerImageMetadata: values.bannerImage.id
                            ? {
                                  focalPoint: {
                                      x: values.bannerImage.focalPoint.x,
                                      y: values.bannerImage.focalPoint.y,
                                  },
                              }
                            : {},
                    },
                },
            });
            toast({
                title: 'Bruiloft aangepast',
                status: 'success',
            });
            methods.reset(values);
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
        methods,
        onSubmit,
        formHasChanged,
        loading: weddingLoading || updateWeddingLoading,
        wedding,
    };
};

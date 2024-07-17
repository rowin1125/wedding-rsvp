import { useMemo, useEffect } from 'react';

import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import { replaceEmptyStringWithNull } from 'src/helpers/replaceEmptyStringWithNull';

import { SingleAssetType } from './useGetMediaAssets';
import { useUpdateAsset } from './useUpdateAsset';

type UseUpdateAssetFormType = {
    currentAsset?: SingleAssetType;
};

export const useUpdateAssetForm = ({
    currentAsset,
}: UseUpdateAssetFormType) => {
    const toast = useToast();
    const { updateAsset, loading: updateLoading } = useUpdateAsset();

    const validationSchema = object({
        originalFilename: string().required('Bestandsnaam is verplicht'),
        description: string(),
        title: string(),
        altText: string(),
    });
    const defaultValues = useMemo(
        () => ({
            originalFilename: currentAsset?.originalFilename ?? '',
            description: currentAsset?.description ?? '',
            title: currentAsset?.title ?? '',
            altText: currentAsset?.altText ?? '',
        }),
        [currentAsset]
    );

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    useEffect(() => {
        if (currentAsset) {
            methods.reset(defaultValues);
        }
    }, [currentAsset, defaultValues, methods]);

    const onSubmit = async (data: InferType<typeof validationSchema>) => {
        const nullableData = replaceEmptyStringWithNull(data);
        const dataHasChanged = Object.keys(nullableData).some(
            (key) =>
                nullableData[key] !==
                currentAsset?.[key as keyof SingleAssetType]
        );

        if (!dataHasChanged) {
            toast({
                title: 'Geen wijzigingen',
                description: 'Er zijn geen wijzigingen om op te slaan',
                status: 'info',
            });
            return;
        }

        if (!currentAsset?.id) {
            toast({
                title: 'Geen asset gevonden',
                description: 'Er is geen asset gevonden om bij te werken',
                status: 'error',
            });
            return;
        }

        await updateAsset({
            variables: {
                id: currentAsset.id,
                input: nullableData,
            },
        });

        toast({
            title: 'Asset bijgewerkt',
            description: 'De asset is succesvol bijgewerkt',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return { methods, onSubmit, updateLoading };
};

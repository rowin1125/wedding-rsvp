import { useState, useEffect } from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FocalPoint } from 'src/components/FocalPoint';
import useDebounce from 'src/hooks/useDebounce';

type UseSelectAssetType = {
    name: string;
};

export const useSelectAsset = ({ name }: UseSelectAssetType) => {
    const disclosure = useDisclosure();
    const { watch, setValue } = useFormContext();
    const value = watch(name);
    const toast = useToast();
    const [focalPoint, setFocalPoint] = useState<FocalPoint>(
        value?.focalPoint ?? { x: 50, y: 50 }
    );
    const debouncedFocalPoint = useDebounce(focalPoint, 500);

    useEffect(() => {
        setValue(`${name}.focalPoint`, debouncedFocalPoint, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }, [debouncedFocalPoint, name, setValue]);

    const handleClickAsset = (assetId: string) => {
        setValue(`${name}.id`, assetId, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
        disclosure.onClose();
        toast({
            title: 'Afbeelding geselecteerd',
            status: 'success',
        });
    };

    return {
        focalPoint,
        setFocalPoint,
        handleClickAsset,
        disclosure,
        value,
    };
};

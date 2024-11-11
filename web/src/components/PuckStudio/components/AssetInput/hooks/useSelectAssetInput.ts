/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';

import { FocalPoint } from 'src/components/FocalPoint';
import { BannerBlockProps } from 'src/components/PuckStudio/blocks/BannerBlock';
import useDebounce from 'src/hooks/useDebounce';

import { useCreateAssetReference } from './useCreateAssetReference';
import { useDeleteAssetReference } from './useDeleteAssetReference';

type useSelectAssetInputType = {
    assetReference?: BannerBlockProps['assetReference'];
    onChange: (value: BannerBlockProps['assetReference']) => void;
    id: string;
};

export const useSelectAssetInput = ({
    assetReference,
    onChange,
    id,
}: useSelectAssetInputType) => {
    const { landingPageId } = useParams();
    const disclosure = useDisclosure();
    const toast = useToast();

    const { createAssetReference } = useCreateAssetReference();
    const { deleteAssetReference } = useDeleteAssetReference();
    const [focalPoint, setFocalPoint] = useState<FocalPoint>({
        x: assetReference?.metadata?.focalPoint?.x ?? 50,
        y: assetReference?.metadata?.focalPoint?.y ?? 50,
    });
    const debouncedFocalPoint = useDebounce(focalPoint, 500);

    useEffect(() => {
        if (!assetReference) return;

        onChange({
            ...assetReference,
            metadata: {
                focalPoint: debouncedFocalPoint,
            },
        });
    }, [assetReference?.id, debouncedFocalPoint, onChange]);

    const handleClickAsset = async (assetId: string) => {
        if (assetReference?.id) {
            await deleteAssetReference({
                variables: {
                    id: assetReference.id,
                    objectReference: id,
                },
            });
        }
        const assetReferenceResponse = await createAssetReference({
            variables: {
                input: {
                    assetId,
                    metadata: {
                        focalPoint,
                    },
                    weddingRsvpLandingPageId: landingPageId,
                    objectReference: id,
                },
            },
        });

        if (!assetReferenceResponse.data?.createAssetReference) {
            toast({
                title: 'Er is iets misgegaan',
                status: 'error',
            });
            return;
        }

        onChange(
            assetReferenceResponse.data
                ?.createAssetReference as BannerBlockProps['assetReference']
        );

        disclosure.onClose();
        toast({
            title: 'Afbeelding geselecteerd',
            status: 'success',
        });
    };

    return {
        focalPoint,
        disclosure,
        setFocalPoint,
        handleClickAsset,
    };
};

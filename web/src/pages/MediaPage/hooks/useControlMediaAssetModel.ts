import { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { SingleAssetType } from './useGetMediaAssets';

export const useControlMediaAssetModel = () => {
    const modalDisclosure = useDisclosure();
    const [currentAsset, setCurrentAsset] = useState<
        SingleAssetType | undefined
    >();

    const handleOnClose = () => {
        setCurrentAsset(undefined);
        modalDisclosure.onClose();
    };

    return {
        modalDisclosure: {
            ...modalDisclosure,
            onClose: handleOnClose,
        },
        currentAsset,
        setCurrentAsset,
    };
};

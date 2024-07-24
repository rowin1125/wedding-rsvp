import React from 'react';

import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';

import { useGetMediaAssets } from 'src/pages/MediaPage/hooks/useGetMediaAssets';

import InputControl from '../InputControl';

import SelectAssetControlAssetSelected from './components/SelectAssetControlAssetSelected';
import SelectAssetControlLabel from './components/SelectAssetControlLabel';
import SelectAssetControlNoAssetSelected from './components/SelectAssetControlNoAssetSelected';
import SelectAssetModalGrid from './components/SelectAssetModalGrid';
import SelectAssetModalGridNoAssets from './components/SelectAssetModalGridNoAssets';
import { useSelectAsset } from './useSelectAsset';

type SelectAssetControlProps = {
    name: string;
};

const SelectAssetControl = ({ name }: SelectAssetControlProps) => {
    const { mediaLibrary } = useGetMediaAssets();
    const { disclosure, focalPoint, handleClickAsset, setFocalPoint, value } =
        useSelectAsset({ name });

    const hasAssets =
        mediaLibrary?.assets && mediaLibrary?.assets?.items?.length > 0;
    const currentAsset = mediaLibrary?.assets?.items?.find(
        (asset) => asset?.id === value?.id
    );

    return (
        <Box w="full">
            <SelectAssetControlLabel name={name} currentAsset={currentAsset} />
            <SelectAssetControlNoAssetSelected
                disclosure={disclosure}
                currentAsset={currentAsset}
            />
            <InputControl name={`${name}.id`} hidden />
            <SelectAssetControlAssetSelected
                currentAsset={currentAsset}
                disclosure={disclosure}
                focalPoint={focalPoint}
                name={name}
                setFocalPoint={setFocalPoint}
            />

            <Modal
                isOpen={disclosure.isOpen}
                onClose={disclosure.onClose}
                size="4xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Selecteer een asset</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowY="scroll" maxH="70vh">
                        <SelectAssetModalGrid
                            mediaLibrary={mediaLibrary}
                            handleClickAsset={handleClickAsset}
                            hasAssets={hasAssets}
                        />
                        <SelectAssetModalGridNoAssets hasAssets={hasAssets} />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="outline"
                            mr={3}
                            onClick={disclosure.onClose}
                        >
                            Annuleren
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SelectAssetControl;

import React from 'react';

import {
    Box,
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa6';

import CreateAssetModal from 'src/components/Gallery/components/ImagesTab/components/CreateAssetModal';
import { useCreateAssets } from 'src/components/Gallery/hooks/useCreateAssets';
import SelectAssetModalGrid from 'src/components/react-hook-form/components/SelectAssetControl/components/SelectAssetModalGrid';
import SelectAssetModalGridNoAssets from 'src/components/react-hook-form/components/SelectAssetControl/components/SelectAssetModalGridNoAssets';
import { useGetMediaAssets } from 'src/pages/MediaPage/hooks/useGetMediaAssets';

import { BannerBlockProps } from '../../blocks/BannerBlock';

import SelectAssetInputAssetSelected from './components/SelectAssetInputAssetSelected';
import SelectAssetInputNoAssetSelect from './components/SelectAssetInputNoAssetSelect';
import { useSelectAssetInput } from './hooks/useSelectAssetInput';

type AssetInputProps = {
    assetReference: BannerBlockProps['assetReference'];
    onChange: (value: BannerBlockProps['assetReference']) => void;
    id: string;
    forceModalUpload?: boolean;
};

const AssetInput = ({
    assetReference,
    onChange,
    id,
    forceModalUpload,
}: AssetInputProps) => {
    const { mediaLibrary } = useGetMediaAssets();
    const { disclosure, focalPoint, handleClickAsset, setFocalPoint } =
        useSelectAssetInput({
            assetReference,
            onChange,
            id,
        });

    const hasAssets =
        mediaLibrary?.assets && mediaLibrary?.assets?.items?.length > 0;
    const maxFiles = mediaLibrary ? mediaLibrary.maxAllowedAssets : 0;
    const maxFilesRemaining = mediaLibrary
        ? maxFiles - mediaLibrary.assets.totalCount
        : 0;
    const noFilesRemaining = maxFilesRemaining <= 0;

    const accept = 'image/*';
    const assetManager = useCreateAssets({
        gcloudPath: `media/${mediaLibrary?.weddingId}`,
        mediaLibraryId: mediaLibrary?.id,
        accept,
        maxFiles: maxFilesRemaining,
        weddingId: mediaLibrary?.weddingId ?? '',
    });

    return (
        <Box w="full">
            <SelectAssetInputNoAssetSelect
                disclosure={disclosure}
                assetReference={assetReference}
                forceModalUpload={forceModalUpload}
            />
            <SelectAssetInputAssetSelected
                disclosure={disclosure}
                assetReference={assetReference}
                focalPoint={{
                    x: focalPoint?.x ?? 50,
                    y: focalPoint?.y ?? 50,
                }}
                setFocalPoint={setFocalPoint}
                onChange={onChange}
            />

            <CreateAssetModal
                assetManager={assetManager}
                accept={accept}
                maxFiles={maxFilesRemaining}
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
                        <Button
                            size={{ base: 'sm', lg: 'md' }}
                            onClick={assetManager.modalDisclosure.onOpen}
                            isDisabled={noFilesRemaining}
                        >
                            <Icon as={FaUpload} mr={2} />
                            Bestand toevoegen
                        </Button>
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

export default AssetInput;

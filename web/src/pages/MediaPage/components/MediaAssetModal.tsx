import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Box,
    Grid,
    GridItem,
    useToast,
    Tooltip,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import { useAuth } from 'src/auth';
import ResolveAssetType from 'src/components/ImageGallery/components/ResolveAssetType';
import SliderVideo from 'src/components/ImageGallery/components/SliderVideo';

import { useDeleteAssets } from '../hooks/useDeleteAssets';
import { SingleAssetType } from '../hooks/useGetMediaAssets';
import { useUpdateAssetForm } from '../hooks/useUpdateAssetForm';

import MediaAssetInformationTable from './MediaAssetInformationTable';
import MediaAssetModalAssetInformation from './MediaAssetModalAssetInformation';

type MediaAssetModalProps = {
    currentAsset?: SingleAssetType;
} & ReturnType<typeof useDisclosure>;

const MediaAssetModal = ({
    isOpen,
    onClose,
    currentAsset,
}: MediaAssetModalProps) => {
    const { currentUser } = useAuth();
    const toast = useToast();

    const { deleteAssets, loading } = useDeleteAssets({
        id: currentUser?.wedding?.mediaLibrary?.id as string,
        type: 'media',
    });

    const { methods, onSubmit, updateLoading } = useUpdateAssetForm({
        currentAsset,
    });
    const hasReferences =
        !!currentAsset?.assetReferences &&
        currentAsset.assetReferences.length > 0;

    const handleDelete = async () => {
        if (!currentAsset) return;

        if (hasReferences) {
            toast({
                title: 'Kan niet verwijderen',
                description: 'Dit best and heeft nog referenties',
                status: 'error',
            });
            return;
        }

        await deleteAssets({
            variables: {
                ids: [currentAsset.id],
            },
        });
        onClose();
    };

    if (!currentAsset) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <FormProvider {...methods}>
                    <Box as="form" onSubmit={methods.handleSubmit(onSubmit)}>
                        <ModalHeader color="secondary.900">
                            {currentAsset.title}
                        </ModalHeader>
                        <Box as="hr" />
                        <ModalCloseButton mt={2} />
                        <ModalBody mt={4}>
                            <Grid
                                templateColumns="repeat(2, 1fr)"
                                gap={{ lg: 4 }}
                            >
                                <GridItem
                                    colSpan={{ base: 2, lg: 1 }}
                                    position="relative"
                                    minH={{
                                        base: '300px',
                                        lg: '400px',
                                    }}
                                    h="full"
                                >
                                    <ResolveAssetType
                                        fileType={currentAsset.fileType}
                                        imageProps={{
                                            src: currentAsset.url,
                                            previewUrl: currentAsset.previewUrl,
                                            mb: 2,
                                            w: 'full',
                                            h: 'full',
                                            objectFit: {
                                                base: 'contain',
                                            },
                                            maxH: {
                                                base: '300px',
                                                lg: '400px',
                                            },
                                            loading: 'lazy',
                                        }}
                                        videoProps={{
                                            src: currentAsset.url,
                                            objectFit: 'cover',
                                        }}
                                        customVideo={() => (
                                            <SliderVideo
                                                src={currentAsset.url}
                                                position="absolute"
                                                inset={0}
                                                w="full"
                                                objectFit={{
                                                    base: 'cover',
                                                    lg: 'cover',
                                                }}
                                                height="full"
                                                controls
                                                locked
                                                hideIcon
                                            />
                                        )}
                                        hideIcon
                                    />
                                </GridItem>
                                <MediaAssetModalAssetInformation
                                    currentAsset={currentAsset}
                                />
                                <GridItem colSpan={{ base: 2, lg: 1 }}>
                                    <MediaAssetInformationTable
                                        asset={currentAsset}
                                    />
                                </GridItem>
                            </Grid>
                        </ModalBody>
                        <Box as="hr" mt={4} />
                        <ModalFooter justifyContent={'space-between'}>
                            <Tooltip
                                isDisabled={!hasReferences}
                                label="Verwijderen is niet mogelijk als er referenties zijn"
                            >
                                <Button
                                    colorScheme="red"
                                    variant="ghost"
                                    mr={3}
                                    isLoading={loading}
                                    isDisabled={hasReferences}
                                    onClick={handleDelete}
                                >
                                    Verwijderen
                                </Button>
                            </Tooltip>
                            <Box>
                                <Button
                                    variant="ghost"
                                    mr={4}
                                    onClick={onClose}
                                >
                                    Sluiten
                                </Button>
                                <Button
                                    colorScheme="green"
                                    type="submit"
                                    isLoading={updateLoading}
                                    isDisabled={updateLoading}
                                >
                                    Opslaan
                                </Button>
                            </Box>
                        </ModalFooter>
                    </Box>
                </FormProvider>
            </ModalContent>
        </Modal>
    );
};

export default MediaAssetModal;

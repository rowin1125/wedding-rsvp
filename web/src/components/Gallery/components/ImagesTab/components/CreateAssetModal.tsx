import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    VStack,
    Flex,
    Box,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import {
    GCLOUD_MAX_FILE_SIZE,
    useCreateAssets,
} from 'src/components/Gallery/hooks/useCreateAssets';
import FileInputControl from 'src/components/react-hook-form/components/FileInputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

type CreateAssetModalProps = {
    assetManager: ReturnType<typeof useCreateAssets>;
    accept?: string;
    maxFiles?: number;
};

const CreateAssetModal = ({
    assetManager,
    accept = 'image/*, video/*',
    maxFiles,
}: CreateAssetModalProps) => {
    const { methods, uploadedFiles, onSubmit, globalLoading } = assetManager;
    const { isOpen, onClose } = assetManager.modalDisclosure;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Voeg je eerste afbeeldingen / video's toe`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box my={10}>
                        <FormProvider {...methods}>
                            <VStack
                                as="form"
                                onSubmit={methods.handleSubmit(onSubmit)}
                                align="start"
                                spacing={5}
                            >
                                <FileInputControl
                                    name="files"
                                    selectFilesTitle="Selecteer bestanden"
                                    fileListWrapperProps={{
                                        mb: 4,
                                    }}
                                    accept={accept}
                                    maxSizeInMB={
                                        GCLOUD_MAX_FILE_SIZE / 1024 / 1024
                                    }
                                    uploadedFiles={uploadedFiles}
                                    isLoading={globalLoading}
                                    isDisabled={globalLoading}
                                    maxFiles={maxFiles}
                                />

                                <Box as="hr" w="full" mb={4} />

                                <Flex justifyContent="flex-end" w="full">
                                    <SubmitButton>
                                        Afbeeldingen opslaan
                                    </SubmitButton>
                                </Flex>
                            </VStack>
                        </FormProvider>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateAssetModal;

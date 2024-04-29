import { MutableRefObject } from 'react';

import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Flex,
    FlexProps,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    Text,
    VisuallyHiddenInput,
} from '@chakra-ui/react';

import FileListItems from './components/FileListItems';
import { useFileInputControl } from './hooks/useFileInputControl';

type FileInputControlType = {
    name: string;
    selectFilesTitle: string;
    label?: string;
    labelProps?: FormLabelProps;
    placeholder?: string;
    accept?: string;
    maxSizeInMB?: number;
    helperText?: string;
    wrapperProps?: FlexProps;
    buttonProps?: ButtonProps;
    fileListWrapperProps?: BoxProps;
    uploadedFiles: MutableRefObject<File[]>;
    isLoading?: boolean;
    isDisabled?: boolean;
};

export const ONE_MB = 1000000;

const FileInputControl = ({
    name,
    label,
    labelProps,
    selectFilesTitle,
    placeholder,
    maxSizeInMB = 30,
    helperText,
    wrapperProps,
    buttonProps,
    fileListWrapperProps,
    uploadedFiles,
    isLoading,
    isDisabled,
    ...props
}: FileInputControlType) => {
    const {
        field,
        fieldState,
        inputRef,
        removeFile,
        totalFileSize,
        handleInputButtonClick,
        handleFilesChange,
    } = useFileInputControl({ name });

    const hasError = !!fieldState.error;
    const isTooBig = field.value?.length > 0 && hasError;
    const isInvalid = isTooBig || hasError;

    return (
        <Flex
            direction={{ base: 'column', lg: 'column' }}
            align="left"
            w="100%"
            {...wrapperProps}
        >
            {label && (
                <FormLabel fontWeight="bold" htmlFor={name} {...labelProps}>
                    {label}
                </FormLabel>
            )}
            <Box>
                <Box
                    mb={4}
                    p="2rem"
                    bg="white"
                    borderRadius="lg"
                    gap="1rem"
                    borderStyle="solid"
                    borderWidth="2px"
                    borderColor="background.600"
                >
                    <Flex direction="column" align="center" gap="0.625rem">
                        <Text fontSize="lg" textAlign="center">
                            {selectFilesTitle}
                        </Text>
                        <Text
                            fontSize="xs"
                            color={isTooBig ? 'red.500' : undefined}
                        >
                            {totalFileSize} / {maxSizeInMB} MB
                        </Text>
                    </Flex>
                    <Flex justifyContent="center" mt={4}>
                        <Button
                            onClick={handleInputButtonClick}
                            borderRadius="md"
                            alignSelf="center"
                            isDisabled={isDisabled}
                            fontWeight="normal"
                            mr={selectFilesTitle ? 0 : 'auto'}
                            {...buttonProps}
                        >
                            Selecteer bestanden
                        </Button>
                    </Flex>
                </Box>
            </Box>
            <FormControl isInvalid={isInvalid}>
                <VisuallyHiddenInput
                    type="file"
                    multiple
                    id={name}
                    ref={inputRef}
                    accept={'image/*,video/*'}
                    {...props}
                    onChange={handleFilesChange}
                    placeholder={placeholder}
                    name={name}
                />

                {isInvalid && (
                    <FormErrorMessage mb={4}>
                        {fieldState.error?.message}
                    </FormErrorMessage>
                )}
                {!isInvalid && helperText && (
                    <FormHelperText>{helperText}</FormHelperText>
                )}
            </FormControl>

            {field.value.length > 0 && (
                <Box
                    height="full"
                    overflowY="auto"
                    maxH="40svh"
                    {...fileListWrapperProps}
                >
                    <FileListItems
                        isLoading={isLoading}
                        files={field.value}
                        removeFile={removeFile}
                        uploadedFiles={uploadedFiles}
                    />
                </Box>
            )}
        </Flex>
    );
};

export default FileInputControl;

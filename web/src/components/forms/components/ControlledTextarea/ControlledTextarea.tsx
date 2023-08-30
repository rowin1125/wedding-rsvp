import React from 'react';

import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Icon,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    InputRightElement,
    Textarea,
    TextareaProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FaCheck } from 'react-icons/fa';

type ControlledTextareaProps = {
    label: string;
    helperText?: string;
    id: string;
    inputRightAddonText?: string;
    inputLeftAddonText?: string;
} & TextareaProps;

const ControlledTextarea = ({
    label,
    helperText,
    id,
    inputRightAddonText,
    inputLeftAddonText,
    ...props
}: ControlledTextareaProps) => {
    const [field, meta] = useField(id);
    const isInvalid = !!meta.error && !!meta.touched;
    const isValid = !meta.error && meta.touched;

    return (
        <FormControl isInvalid={isInvalid} mb={4}>
            <FormLabel fontWeight="bold" htmlFor={id}>
                {label}
            </FormLabel>
            <InputGroup>
                {inputLeftAddonText && (
                    <InputLeftAddon>{inputLeftAddonText}</InputLeftAddon>
                )}
                <Textarea
                    id={id}
                    type="text"
                    size="sm"
                    borderColor={isValid ? 'success.500' : 'gray.200'}
                    borderRadius="md"
                    color="black"
                    fontSize="sm"
                    {...field}
                    {...props}
                />
                {isValid && (
                    <InputRightElement>
                        {isValid && (
                            <InputRightElement>
                                <Icon as={FaCheck} color="success.500" />
                            </InputRightElement>
                        )}
                    </InputRightElement>
                )}
                {inputRightAddonText && (
                    <InputRightAddon>{inputRightAddonText}</InputRightAddon>
                )}
            </InputGroup>
            {helperText && !isInvalid && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default ControlledTextarea;

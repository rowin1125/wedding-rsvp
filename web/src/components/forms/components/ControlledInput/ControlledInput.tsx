import React from 'react';

import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    InputProps,
    InputRightAddon,
    InputRightElement,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FaCheck } from 'react-icons/fa';

type ControlledInputProps = {
    label?: string;
    helperText?: string;
    id: string;
    labelProps?: FormLabelProps;
    inputRightAddonText?: () => JSX.Element;
    inputLeftAddonText?: string;
    formControlProps?: FormControlProps;
    isHidden?: boolean;
} & InputProps;

const ControlledInput = ({
    label,
    helperText,
    id,
    labelProps,
    inputRightAddonText,
    inputLeftAddonText,
    formControlProps,
    isHidden,
    isRequired,
    ...props
}: ControlledInputProps) => {
    const [field, meta] = useField(id);
    const isInvalid = !!meta.error && meta.touched;
    const isValid = !meta.error && meta.touched;

    const InputRightAddonText = inputRightAddonText;
    return (
        <FormControl
            isInvalid={isInvalid}
            mb={4}
            w="full"
            hidden={isHidden}
            isRequired={isRequired}
            {...formControlProps}
        >
            <FormLabel fontWeight="bold" htmlFor={id} {...labelProps}>
                {label}
            </FormLabel>
            <InputGroup>
                {inputLeftAddonText && (
                    <InputLeftAddon>{inputLeftAddonText}</InputLeftAddon>
                )}
                <Input
                    id={id}
                    type="text"
                    color="black"
                    borderColor={isValid ? 'success.500' : 'gray.200'}
                    {...field}
                    {...props}
                />
                {isValid && (
                    <InputRightElement mr={InputRightAddonText ? 14 : 'unset'}>
                        <Icon as={FaCheck} color="success.500" />
                    </InputRightElement>
                )}
                {InputRightAddonText && (
                    <InputRightAddon px={0}>
                        {inputRightAddonText()}
                    </InputRightAddon>
                )}
            </InputGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default ControlledInput;

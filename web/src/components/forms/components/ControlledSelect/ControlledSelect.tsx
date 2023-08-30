import React, { ChangeEvent } from 'react';

import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Icon,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Select,
    SelectProps,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FaCheck } from 'react-icons/fa';

type ControlledSelectOptionType = {
    label: string;
    value: string;
};

type InputSelectProps = {
    label: string;
    options: ControlledSelectOptionType[];
    helperText?: string;
    id: string;
    inputLeftAddonText?: string;
    selectProps?: SelectProps;
    disabled?: boolean;
    onChangeCallBack?: (value: string) => void;
    isHidden?: boolean;
} & FormControlProps;

const ControlledSelect = ({
    id,
    label,
    options,
    helperText,
    selectProps,
    inputLeftAddonText,
    disabled = false,
    onChangeCallBack,
    isHidden,
    ...props
}: InputSelectProps) => {
    const [, meta, { setValue, setTouched }] = useField(id);
    const isInvalid = !!meta.error && meta.touched;
    const isValid = !meta.error && meta.touched;

    const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChangeCallBack?.(event.target.value);
        setValue(event.target.value, true);
    };

    return (
        <FormControl {...props} isInvalid={isInvalid} mb={4} hidden={isHidden}>
            <FormLabel fontWeight="bold" htmlFor={id}>
                {label}
            </FormLabel>
            <InputGroup>
                {inputLeftAddonText && (
                    <InputLeftAddon>{inputLeftAddonText}</InputLeftAddon>
                )}
                <Select
                    id={id}
                    name={id}
                    isDisabled={disabled}
                    onChange={handleOnChange}
                    onBlur={() => setTouched(true)}
                    borderColor={isValid ? 'success.500' : 'gray.200'}
                    fontSize={'sm'}
                    {...selectProps}
                >
                    {options.map((option, index) => (
                        <option
                            style={{
                                fontSize: '16px',
                            }}
                            value={option.value}
                            key={index}
                        >
                            {option.label}
                        </option>
                    ))}
                </Select>
                <InputRightElement mr={6}>
                    {isValid && (
                        <InputRightElement>
                            <Icon as={FaCheck} color="success.500" />
                        </InputRightElement>
                    )}
                </InputRightElement>
            </InputGroup>
            {helperText && !isInvalid && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default ControlledSelect;

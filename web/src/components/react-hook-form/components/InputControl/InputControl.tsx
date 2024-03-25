import { ReactNode } from 'react';

import {
    Input,
    InputProps,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightAddon,
    InputRightElement,
    Icon,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';

import FormControl from '../FormControl';
import { BaseProps } from '../FormControl/FormControl';

export type InputControlProps = BaseProps & {
    inputProps?: InputProps;
    leftAddon?: ReactNode;
    rightAddon?: ReactNode;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
};

const InputControl = ({
    name,
    control,
    label,
    inputProps,
    leftAddon,
    rightAddon,
    leftElement,
    rightElement,
    ...rest
}: InputControlProps) => {
    const {
        field,
        fieldState: { isTouched, error },
        formState: { isSubmitting },
    } = useController({
        name,
        control,
        defaultValue: inputProps?.defaultValue || '',
    });

    console.log('error', error);
    const isValid = !error && isTouched;

    return (
        <FormControl name={name} control={control} label={label} {...rest}>
            <InputGroup>
                {typeof leftAddon === 'string' ? (
                    <InputLeftAddon>{leftAddon}</InputLeftAddon>
                ) : (
                    leftAddon
                )}
                {typeof leftElement === 'string' ? (
                    <InputLeftElement>{leftElement}</InputLeftElement>
                ) : (
                    leftElement
                )}
                <Input
                    {...field}
                    id={name}
                    isDisabled={isSubmitting}
                    borderColor={isValid ? 'success.500' : 'gray.200'}
                    {...inputProps}
                    value={field.value ?? ''}
                />
                {typeof rightElement === 'string' ? (
                    <InputRightElement>{rightElement}</InputRightElement>
                ) : (
                    rightElement
                )}
                {typeof rightAddon === 'string' ? (
                    <InputRightAddon>{rightAddon}</InputRightAddon>
                ) : (
                    rightAddon
                )}
                {isValid && (
                    <InputRightElement mr={rightAddon ? 14 : 'unset'}>
                        <Icon as={FaCheck} color="success.500" />
                    </InputRightElement>
                )}
            </InputGroup>
        </FormControl>
    );
};

InputControl.displayName = 'InputControl';

export default InputControl;

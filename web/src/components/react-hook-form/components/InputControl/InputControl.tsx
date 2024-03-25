import { ReactNode } from 'react';

import {
    Input,
    InputProps,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightAddon,
    InputRightElement,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';

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
        formState: { isSubmitting },
    } = useController({
        name,
        control,
        defaultValue: inputProps?.defaultValue || '',
    });
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
            </InputGroup>
        </FormControl>
    );
};

InputControl.displayName = 'InputControl';

export default InputControl;

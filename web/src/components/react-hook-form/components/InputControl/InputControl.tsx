import { ReactNode } from 'react';

import {
    Input,
    InputProps,
    InputGroup,
    InputRightElement,
    Icon,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';

import FormControl from '../FormControl';
import { BaseProps } from '../FormControl/FormControl';

import RenderAddon from './components/RenderAddon';

export type InputControlProps = BaseProps & {
    inputProps?: InputProps;
    leftAddon?: ReactNode | (() => ReactNode);
    rightAddon?: ReactNode | (() => ReactNode);
    leftElement?: ReactNode | (() => ReactNode);
    rightElement?: ReactNode | (() => ReactNode);
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

    const isValid = !error && isTouched;

    return (
        <FormControl name={name} control={control} label={label} {...rest}>
            <InputGroup>
                <RenderAddon element={leftAddon} />
                <RenderAddon element={leftElement} />
                <Input
                    {...field}
                    id={name}
                    isDisabled={isSubmitting || inputProps?.isDisabled}
                    borderColor={isValid ? 'success.500' : 'gray.200'}
                    borderRightRadius={
                        !!rightAddon || !!rightElement ? '0' : 'lg'
                    }
                    {...inputProps}
                    value={field.value ?? ''}
                />
                <RenderAddon element={rightElement} />
                <RenderAddon element={rightAddon} />
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

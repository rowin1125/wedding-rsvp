import { ReactNode } from 'react';

import {
    Checkbox,
    CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';
import { useController, get } from 'react-hook-form';

import FormControl, { BaseProps } from '../../FormControl/FormControl';

export type CheckboxSingleProps = BaseProps & {
    checkBoxProps?: ChakraCheckboxProps;
    children?: ReactNode;
    formLabel?: string;
};

const CheckboxSingleControl = (props: CheckboxSingleProps) => {
    const {
        name,
        control,
        label,
        children,
        checkBoxProps,
        formLabel,
        ...rest
    } = props;
    const {
        field,
        fieldState: { isTouched },
        formState: { errors, isSubmitting },
    } = useController({
        name,
        control,
        defaultValue: props.checkBoxProps?.defaultChecked || false,
    });
    const error = get(errors, name, '');

    const isChecked = field.value;

    return (
        <FormControl name={name} label={formLabel} control={control} {...rest}>
            <Checkbox
                {...field}
                id={name}
                isInvalid={!!error && isTouched}
                isChecked={isChecked}
                isDisabled={isSubmitting}
                {...checkBoxProps}
            >
                {label}
                {children}
            </Checkbox>
        </FormControl>
    );
};

CheckboxSingleControl.displayName = 'CheckboxSingleControl';

export default CheckboxSingleControl;

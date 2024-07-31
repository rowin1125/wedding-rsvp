import { ReactNode } from 'react';

import { Icon, Select, SelectProps } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';

import FormControl, { BaseProps } from '../FormControl/FormControl';

export type SelectControlProps = BaseProps & {
    selectProps?: SelectProps;
    children: ReactNode;
};

export const SelectControl = (props: SelectControlProps) => {
    const { name, control, selectProps, children, ...rest } = props;
    const {
        field,
        formState: { isSubmitting },
        fieldState: { isTouched, error },
    } = useController({
        name,
        control,
        defaultValue: props.selectProps?.defaultValue || '',
    });

    const isValid = !error && isTouched;

    return (
        <FormControl name={name} control={control} {...rest}>
            <Select
                {...field}
                id={name}
                isDisabled={isSubmitting}
                borderColor={isValid ? 'success.500' : 'gray.200'}
                {...selectProps}
                icon={
                    isValid ? (
                        <Icon as={FaCheck} color="success.500!important" />
                    ) : undefined
                }
            >
                {children}
            </Select>
        </FormControl>
    );
};

SelectControl.displayName = 'SelectControl';

export default SelectControl;

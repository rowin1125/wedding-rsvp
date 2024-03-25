import { ReactNode } from 'react';

import { Select, SelectProps } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

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
    } = useController({
        name,
        control,
        defaultValue: props.selectProps?.defaultValue || '',
    });

    return (
        <FormControl name={name} control={control} {...rest}>
            <Select
                {...field}
                id={name}
                isDisabled={isSubmitting}
                {...selectProps}
            >
                {children}
            </Select>
        </FormControl>
    );
};

SelectControl.displayName = 'SelectControl';

export default SelectControl;

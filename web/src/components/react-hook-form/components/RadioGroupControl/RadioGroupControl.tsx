import { ReactNode } from 'react';

import {
    RadioGroup,
    RadioGroupProps,
    Stack,
    StackProps,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import FormControl, { BaseProps } from '../FormControl/FormControl';

export type RadioGroupControlProps = BaseProps & {
    radioGroupProps?: RadioGroupProps;
    stackProps?: StackProps;
    children: ReactNode;
};

const RadioGroupControl = (props: RadioGroupControlProps) => {
    const {
        name,
        control,
        label,
        radioGroupProps,
        stackProps,
        children,
        ...rest
    } = props;
    const {
        field,
        formState: { isSubmitting },
    } = useController({
        name,
        control,
        defaultValue: props.radioGroupProps?.defaultValue || '',
    });

    return (
        <FormControl name={name} control={control} label={label} {...rest}>
            <RadioGroup
                {...field}
                isDisabled={isSubmitting}
                {...radioGroupProps}
            >
                <Stack direction="row" {...stackProps}>
                    {children}
                </Stack>
            </RadioGroup>
        </FormControl>
    );
};

export default RadioGroupControl;

import { ReactNode } from 'react';

import {
    ButtonProps,
    RadioGroup,
    RadioGroupProps,
    Stack,
    StackProps,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import FormControl, { BaseProps } from '../FormControl/FormControl';
import PresenceButton from '../PresenceControl/PresenceControl';

export type RadioGroupControlProps = BaseProps & {
    radioGroupProps?: RadioGroupProps;
    radioProps?: ButtonProps;
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
        <FormControl
            name={name}
            control={control}
            label={label}
            mb={4}
            {...rest}
        >
            <RadioGroup
                {...field}
                isDisabled={isSubmitting}
                {...radioGroupProps}
            >
                <Stack direction="row" {...stackProps}>
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            return (
                                <PresenceButton
                                    isSelected={
                                        field.value === child.props?.value
                                    }
                                    onClick={() =>
                                        field.onChange(child.props?.value)
                                    }
                                    isDisabled={isSubmitting}
                                    {...child.props}
                                >
                                    {child.props.children}
                                </PresenceButton>
                            );
                        }
                        return null;
                    })}
                </Stack>
            </RadioGroup>
        </FormControl>
    );
};

export default RadioGroupControl;

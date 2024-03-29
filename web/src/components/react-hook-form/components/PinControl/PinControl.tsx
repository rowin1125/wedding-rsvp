import {
    HStack,
    PinInput,
    PinInputField,
    PinInputProps,
    StackProps,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import FormControl, { BaseProps } from '../FormControl/FormControl';

export type PinInputControlProps = BaseProps & {
    pinAmount: number;
    stackProps?: StackProps;
    pinInputProps?: Omit<PinInputProps, 'children'>;
};

const PinInputControl = (props: PinInputControlProps) => {
    const {
        name,
        control,
        label,
        pinAmount,
        stackProps,
        pinInputProps,
        ...rest
    } = props;
    const {
        field,
        formState: { isSubmitting },
    } = useController({
        name,
        control,
        defaultValue: props.pinInputProps?.defaultValue || '',
    });

    const renderedPinInputFields = Array(pinAmount)
        .fill(null)
        .map((_noop, i) => <PinInputField key={i} />);

    return (
        <FormControl name={name} control={control} label={label} {...rest}>
            <HStack {...stackProps}>
                <PinInput
                    {...field}
                    isDisabled={isSubmitting}
                    {...pinInputProps}
                >
                    {renderedPinInputFields}
                </PinInput>
            </HStack>
        </FormControl>
    );
};

export default PinInputControl;

import React, { ReactNode } from 'react';

import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    InputProps,
    RadioGroup,
    RadioGroupProps,
    Stack,
    StackProps,
} from '@chakra-ui/react';
import { useField } from 'formik';

type ControlledRadioGroupProps = {
    id: string;
    label?: string;
    radioGroupProps?: RadioGroupProps;
    stackProps?: StackProps;
    children: ReactNode;
    onChangeCallBack?: (value: string) => void;
} & InputProps;

const ControlledRadioGroup = ({
    id,
    label,
    radioGroupProps,
    stackProps,
    children,
    ...props
}: ControlledRadioGroupProps) => {
    const [meta, , { setValue }] = useField(id);

    const handleChange = (value: string) => {
        setValue(value);
    };

    return (
        <FormControl id={id} label={label} mb={4} {...props}>
            <Box>
                {label && (
                    <FormLabel fontWeight="bold" htmlFor={id}>
                        {label}
                    </FormLabel>
                )}
                <Flex alignItems="center">
                    <RadioGroup
                        {...meta}
                        onChange={handleChange}
                        {...radioGroupProps}
                    >
                        <Stack direction="row" {...stackProps}>
                            {children}
                        </Stack>
                    </RadioGroup>
                    {!label && props.isRequired && <FormLabel htmlFor={id} />}
                </Flex>
            </Box>
        </FormControl>
    );
};

export default ControlledRadioGroup;

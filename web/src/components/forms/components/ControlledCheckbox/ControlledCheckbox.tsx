import React from 'react';

import { ChakraProps, Checkbox, Text } from '@chakra-ui/react';
import { useField } from 'formik';

type ControlledCheckboxProps = {
    label: string;
    helperText?: string;
    id: string;
    onChangeCallback?: (value: boolean) => void;
    isHidden?: boolean;
} & ChakraProps;

const ControlledCheckbox = ({
    label,
    id,
    onChangeCallback,
    isHidden,
    ...checkboxProps
}: ControlledCheckboxProps) => {
    const [, meta, { setValue }] = useField(id);
    const isInvalid = !!meta.error;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.checked);
        onChangeCallback?.(e.target.checked);
    };

    return (
        <Checkbox
            defaultChecked={meta.value}
            isInvalid={isInvalid}
            hidden={isHidden}
            onChange={handleOnChange}
            {...checkboxProps}
        >
            <Text as="span" fontSize="md" color="currentcolor">
                {label}
            </Text>
        </Checkbox>
    );
};

export default ControlledCheckbox;

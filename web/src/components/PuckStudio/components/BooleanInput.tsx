import React from 'react';

import { Box, Switch } from '@chakra-ui/react';
import { FieldLabel } from '@measured/puck';

type BooleanInputProps = {
    value: boolean;
    onChange: (value: boolean) => void;
    label: string;
    children: React.ReactNode;
};

const BooleanInput = ({
    onChange,
    value,
    children,
    label,
}: BooleanInputProps) => {
    return (
        <>
            <Box as={FieldLabel} mb={0} label={label} />
            <Switch
                alignItems="center"
                colorScheme="secondary"
                display="flex"
                isChecked={value}
                onChange={(e) => onChange(e.target.checked)}
            >
                {children}
            </Switch>
        </>
    );
};

export default BooleanInput;

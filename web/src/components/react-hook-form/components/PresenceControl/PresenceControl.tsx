import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

type PresenceControlProps = ButtonProps & {
    isSelected?: boolean;
};

const PresenceButton = ({
    isSelected,
    children,
    ...rest
}: PresenceControlProps) => (
    <Button
        as="div"
        colorScheme="tertiary"
        cursor="pointer"
        variant={isSelected ? 'solid' : 'outline'}
        {...rest}
    >
        {children}
    </Button>
);

export default PresenceButton;

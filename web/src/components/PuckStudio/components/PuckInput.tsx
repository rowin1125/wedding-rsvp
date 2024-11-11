import React from 'react';

import { Input, InputProps } from '@chakra-ui/react';

type PuckInputProps = InputProps;

const PuckInput = (props: PuckInputProps) => (
    <Input w="full" borderColor="gray.100" borderRadius={4} {...props} />
);

export default PuckInput;

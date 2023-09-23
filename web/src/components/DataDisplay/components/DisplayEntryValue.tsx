import React from 'react';

import { Text } from '@chakra-ui/react';

type DisplayEntryValueProps = {
    label: string;
    value: string | boolean | number;
    isNested: boolean;
};

const DisplayEntryValue = ({
    label,
    value,
    isNested,
}: DisplayEntryValueProps) => (
    <>
        <Text
            w="40%"
            as="dt"
            pr={4}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            pl={isNested ? 4 : 0}
            fontWeight="semibold"
        >
            {label}:
        </Text>
        <Text w="60%" as="dd">
            {value?.toString()}
        </Text>
    </>
);

export default DisplayEntryValue;

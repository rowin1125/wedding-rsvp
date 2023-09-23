import React from 'react';

import { Box, Text } from '@chakra-ui/react';

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

import { ApiEntriesTypes } from '../DataDisplay';

import DataEntryToJsx from './DataEntryToJsx';

type DisplayObjectFieldProps = {
    objectKey: string;
    value: ApiEntriesTypes;
    ignoreKeys?: string[];
};

const DisplayObjectField = ({
    objectKey,
    value,
    ignoreKeys,
}: DisplayObjectFieldProps) => (
    <>
        <Text fontWeight="semibold" mb={2} w="40%" as="dt">
            {capitalizeText(objectKey)}:
        </Text>
        <Box w="100%" as="dd">
            <DataEntryToJsx
                entry={value}
                isNested={true}
                ignoreKeys={ignoreKeys}
            />
        </Box>
    </>
);

export default DisplayObjectField;

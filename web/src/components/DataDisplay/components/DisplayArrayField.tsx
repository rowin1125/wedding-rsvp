import React from 'react';

import { Box, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

import { ApiEntriesTypes } from '../DataDisplay';

import DataEntryToJsx from './DataEntryToJsx';

type DisplayArrayFieldsProps = {
    entry: ApiEntriesTypes[];
    objectKey: string;
    ignoreKeys?: string[];
};

const DisplayArrayFields = ({
    entry,
    objectKey,
    ignoreKeys,
}: DisplayArrayFieldsProps) => (
    <Box w="100%" as="dd">
        <Text fontWeight="semibold" mb={2}>
            {capitalizeText(objectKey)}:
        </Text>
        {entry?.map((item) => (
            <DataEntryToJsx
                key={nanoid()}
                entry={item}
                isNested={true}
                ignoreKeys={ignoreKeys}
            />
        ))}
    </Box>
);

export default DisplayArrayFields;

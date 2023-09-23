import { Box } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

import { ApiEntriesTypes, DataDisplayProps } from '../DataDisplay';

import DisplayArrayField from './DisplayArrayField';
import DisplayEntryValue from './DisplayEntryValue';
import DisplayObjectField from './DisplayObjectField';

type DataEntryToJsxProps = {
    isNested: boolean;
} & DataDisplayProps;

const DataEntryToJsx = ({
    entry,
    isNested,
    ignoreKeys,
}: DataEntryToJsxProps) => {
    if (!entry) return null;

    const keys = Object.keys(entry) as (keyof ApiEntriesTypes)[];
    return (
        <>
            {keys.map((key) => {
                if (ignoreKeys?.includes(key)) return null;

                const value = entry[key];
                const isObject = value !== null && typeof value === 'object';
                const isArray = Array.isArray(value);

                let FieldComponent;
                if (isArray) {
                    FieldComponent = (
                        <DisplayArrayField
                            ignoreKeys={ignoreKeys}
                            objectKey={key}
                            entry={value}
                        />
                    );
                } else if (isObject) {
                    FieldComponent = (
                        <DisplayObjectField
                            ignoreKeys={ignoreKeys}
                            objectKey={key}
                            value={value}
                        />
                    );
                } else {
                    FieldComponent = (
                        <DisplayEntryValue
                            label={capitalizeText(key)}
                            value={value}
                            isNested={isNested}
                        />
                    );
                }

                return (
                    <Box
                        boxSizing="border-box"
                        as="dl"
                        display="flex"
                        flexWrap="wrap"
                        _last={{
                            border: 'none',
                        }}
                        borderBottom={!isNested ? '1px' : '0px'}
                        borderBottomColor="gray.200"
                        key={nanoid()}
                        py={isNested ? 0 : 3}
                    >
                        {FieldComponent}
                    </Box>
                );
            })}
        </>
    );
};

export default DataEntryToJsx;

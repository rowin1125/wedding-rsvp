import { Box, BoxProps } from '@chakra-ui/react';

import DataEntryToJsx from './components/DataEntryToJsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiEntriesTypes = Record<string, any>;
export type DataDisplayProps = {
    entry: ApiEntriesTypes;
    ignoreKeys?: string[];
    wrapperProps?: BoxProps;
};

const DataDisplay = ({ wrapperProps, ...props }: DataDisplayProps) => (
    <Box {...wrapperProps}>
        <DataEntryToJsx {...props} isNested={false} />
    </Box>
);

export default DataDisplay;

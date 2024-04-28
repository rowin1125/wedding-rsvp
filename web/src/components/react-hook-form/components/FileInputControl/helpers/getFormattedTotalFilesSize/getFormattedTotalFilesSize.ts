import { formatBytes } from '../formatBytes';
import { getTotalByteSize } from '../getTotalByteSize';

export const getFormattedTotalFilesSize = (files: File[]): string => {
    if (files.length === 0) {
        return formatBytes(0);
    }

    const totalSize = getTotalByteSize(files);

    return formatBytes(totalSize);
};

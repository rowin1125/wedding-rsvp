export const getTotalByteSize = (files: File[]): number => {
    if (files.length === 0) {
        return 0;
    }

    const fileSizes = files.map((file) => file.size);

    const totalSize = fileSizes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );

    return totalSize;
};

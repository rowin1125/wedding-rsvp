export const getProgressPercentage = (value: number) => {
    if (value < 50) return 'red';
    if (value < 80 && value >= 50) return 'orange';

    return 'green';
};

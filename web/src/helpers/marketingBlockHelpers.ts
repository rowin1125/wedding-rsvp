export const resolveContainerWidth = (containerWidth: string) => {
    switch (containerWidth) {
        case 'small':
            return '3xl';
        case 'medium':
            return '4xl';
        case 'large':
            return '7xl';
        case 'full':
            return 'unset';

        default:
            return '7xl';
    }
};

export const resolveTextAlignment = (textAlignment: string) => {
    switch (textAlignment) {
        case 'center':
            return 'center';
        case 'left':
            return 'left';
        case 'right':
            return 'right';
        default:
            return 'left';
    }
};

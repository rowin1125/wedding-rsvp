import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
    defaultProps: {
        colorScheme: 'primary',
    },
    baseStyle: {
        fontWeight: 'semibold',
    },
    variants: {
        outline: {
            borderColor: 'secondary.500',
            color: 'secondary.500',
            fontWeight: 'normal',
            _hover: {
                backgroundColor: 'secondary.500',
                color: 'white',
            },
            _disabled: {
                _hover: {
                    color: 'secondary.500',
                },
            },
        },
        ghost: {
            color: 'secondary.500',
            fontWeight: 'normal',
        },
    },
});

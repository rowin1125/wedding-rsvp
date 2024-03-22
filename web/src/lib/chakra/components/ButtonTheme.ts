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
            borderColor: 'body.500',
            color: 'body.500',
            fontWeight: 'normal',
            _hover: {
                backgroundColor: 'body.500',
                color: 'white',
            },
            _disabled: {
                _hover: {
                    color: 'body.500',
                },
            },
        },
        ghost: {
            color: 'body.500',
            fontWeight: 'normal',
        },
    },
});

import { defineStyleConfig } from '@chakra-ui/react';

import theme from '../theme';

export const Button = defineStyleConfig({
    defaultProps: {
        colorScheme: 'secondary',
    },
    baseStyle: {
        fontWeight: 'semibold',
    },
    variants: {
        outline: (props) => {
            return {
                borderWidth: 2,
                borderColor:
                    theme.colors[
                        props.colorScheme as keyof typeof theme.colors
                    ]?.[500],
                color: theme.colors[
                    props.colorScheme as keyof typeof theme.colors
                ]?.[500],
                fontWeight: 'normal',
                _hover: {
                    backgroundColor:
                        theme.colors[
                            props.colorScheme as keyof typeof theme.colors
                        ]?.[500],
                    color: 'white',
                },
                _disabled: {
                    _hover: {
                        color: theme.colors[
                            props.colorScheme as keyof typeof theme.colors
                        ]?.[500],
                    },
                },
            };
        },
        ghost: (props) => {
            return {
                color: theme.colors[
                    props.colorScheme as keyof typeof theme.colors
                ]?.[500],
                fontWeight: 'normal',
            };
        },
    },
});

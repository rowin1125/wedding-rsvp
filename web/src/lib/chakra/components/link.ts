import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export const Link: ComponentStyleConfig = defineStyleConfig({
    baseStyle: {
        fontSize: {
            base: '14px',
            lg: '16px',
        },
        color: 'secondary.900',
        _hover: {
            textDecorationColor: 'black',
        },
    },
});

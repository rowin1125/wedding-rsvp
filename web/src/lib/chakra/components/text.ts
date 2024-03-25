import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export const Text: ComponentStyleConfig = defineStyleConfig({
    baseStyle: {
        color: 'secondary.900',
        fontSize: {
            base: '14px',
            lg: '16px',
        },
    },
});

import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export const Text: ComponentStyleConfig = defineStyleConfig({
    baseStyle: {
        color: 'primary.700',
        fontSize: {
            base: '14px',
            lg: '16px',
        },
    },
});

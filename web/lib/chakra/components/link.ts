import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export const Link: ComponentStyleConfig = defineStyleConfig({
    baseStyle: {
        fontSize: {
            base: '14px',
            lg: '16px',
        },
        color: 'info.500',
        _hover: {
            textDecorationColor: 'black',
        },
    },
});

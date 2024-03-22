import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export const Heading: ComponentStyleConfig = defineStyleConfig({
    sizes: {
        h1: { fontSize: { base: '20px', lg: '36px' } },
        h2: { fontSize: { base: '18px', lg: '28px' } },
        h3: { fontSize: { base: '16px', lg: '18px' } },
        h4: { fontSize: { base: '14px', lg: '16px' } },
        h5: { fontSize: { base: '12px', lg: '14px' } },
        h6: { fontSize: { base: '10px', lg: '10px' } },
    },
    baseStyle: {
        color: 'black',
        fontWeight: 'normal',
    },
    defaultProps: { size: 'h2' },
});

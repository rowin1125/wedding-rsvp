import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react';

export const Heading: ComponentStyleConfig = defineStyleConfig({
    sizes: {
        h1: { fontSize: { base: '32px', lg: '52px' } },
        h2: { fontSize: { base: '26px', lg: '38px' } },
        h3: { fontSize: { base: '22px', lg: '30px' } },
        h4: { fontSize: { base: '18px', lg: '20px' } },
        h5: { fontSize: { base: '14px', lg: '16px' } },
        h6: { fontSize: { base: '12px', lg: '14px' } },
    },
    baseStyle: {
        color: 'secondary.900',
        fontWeight: '500',
    },
    defaultProps: { size: 'h2' },
});

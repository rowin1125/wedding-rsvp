import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys);
const variants = {
    primary: definePartsStyle({
        container: {
            rounded: '10px',
            shadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
            w: 'full',
            p: { base: 4, lg: 6 },
            h: 'full',
        },
    }),
};
export const Card = defineMultiStyleConfig({
    variants,
    defaultProps: { variant: 'primary' },
});

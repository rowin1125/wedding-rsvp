import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
    thumb: {
        bg: 'secondary.900',
    },
    track: {
        py: 0,
        bg: 'secondary.100',
        _checked: {
            bg: 'gray.100',
        },
    },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });

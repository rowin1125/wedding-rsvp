import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
    tab: {
        fontWeight: 'semibold', // change the font weight
        py: {
            base: 4,
            lg: 4,
        },
        paddingTop: {
            base: 4,
            lg: 4,
        },
        paddingBottom: {
            base: 4,
            lg: 4,
        },
        px: {
            lg: 16,
        },
        paddingLeft: {
            lg: 16,
        },
        paddingRight: {
            lg: 16,
        },
        _selected: {
            bg: 'body.50',
            borderBottomWidth: 3,
            shadow: 'inner',
            color: 'secondary.900',
        },
    },
    tablist: {
        bg: 'white',
    },
});

export const Tabs = defineMultiStyleConfig({ baseStyle });

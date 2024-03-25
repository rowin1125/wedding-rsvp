import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
    field: {
        _placeholder: {
            color: 'secondary.200',
        },
    },
    group: {
        bg: 'primary.200',
        rounded: '5px',
    },
});

export const Input = defineMultiStyleConfig({ baseStyle });

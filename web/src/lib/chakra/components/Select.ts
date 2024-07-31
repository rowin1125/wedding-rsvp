import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
    field: {
        _placeholder: {
            color: 'gray.200',
        },
        background: 'primary.200',
    },
});

export const Select = defineMultiStyleConfig({ baseStyle });

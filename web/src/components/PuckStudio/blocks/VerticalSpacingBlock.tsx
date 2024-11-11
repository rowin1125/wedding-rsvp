import React from 'react';

import { Box } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import PuckInput from '../components/PuckInput';
import { spacingOptions } from '../config/spacingOptions';

export type VerticalSpaceBlockProps = {
    size: string;
    backgroundColor?: string;
};

export const VerticalSpaceBlock: ComponentConfig<VerticalSpaceBlockProps> = {
    label: 'Verticale ruimte',
    fields: {
        size: {
            type: 'select',
            options: spacingOptions,
        },
        backgroundColor: {
            type: 'custom',
            render: ({ value, onChange }) => {
                return (
                    <>
                        <FieldLabel label="Achtergrondkleur" />
                        <PuckInput
                            type="color"
                            value={value || chakraColorToHex('primary.100')}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </>
                );
            },
        },
    },
    defaultProps: {
        size: '80px',
    },
    render: ({ size, backgroundColor }) => {
        return (
            <Box as="section" height={size} width="100%" bg={backgroundColor} />
        );
    },
};

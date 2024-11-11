import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { ComponentConfig, DropZone } from '@measured/puck';

import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

export type FlexBlockProps = DefaultSettingsType & {
    items: { minItemWidth?: number }[];
    minItemWidth: number;
};

export const FlexBlock: ComponentConfig<FlexBlockProps> = {
    fields: {
        items: {
            type: 'array',
            arrayFields: {
                minItemWidth: {
                    label: 'Minimale item breedte',
                    type: 'number',
                    min: 0,
                },
            },
            getItemSummary: (_, id = -1) => `Item ${id + 1}`,
        },
        minItemWidth: {
            label: 'Minimale item breedte',
            type: 'number',
            min: 0,
        },
        ...defaultSettings(),
    },
    defaultProps: {
        items: [{}, {}],
        minItemWidth: 356,
    },
    label: 'Flex Blok',
    render: ({ items, minItemWidth, settings, id }) => {
        return (
            <Box
                id={id}
                as="section"
                bg={settings?.backgroundColor}
                pt={settings?.topSpacing ?? 0}
                pb={settings?.bottomSpacing ?? 0}
            >
                <Section maxWidth={settings?.containerWidth ?? 'full'}>
                    <Flex gap={4} flexWrap="wrap" justifyContent="center">
                        {items.map((item, idx) => (
                            <Box
                                key={idx}
                                flex={1}
                                style={{
                                    minWidth: item.minItemWidth || minItemWidth,
                                }}
                            >
                                <DropZone zone={`item-${idx}`} />
                            </Box>
                        ))}
                    </Flex>
                </Section>
            </Box>
        );
    },
};

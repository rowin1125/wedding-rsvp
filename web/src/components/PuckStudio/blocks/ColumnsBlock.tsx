import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import {
    ComponentConfig,
    DropZone,
    WithId,
    WithPuckProps,
} from '@measured/puck';

import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

export type ColumnsProps = {
    distribution: 'auto' | 'manual';
    columns: {
        span?: number;
    }[];
} & DefaultSettingsType;

export const ColumnsBlock: ComponentConfig<ColumnsProps> = {
    fields: {
        distribution: {
            type: 'radio',
            options: [
                {
                    value: 'auto',
                    label: 'Auto',
                },
                {
                    value: 'manual',
                    label: 'Handmatig',
                },
            ],
            label: 'Distributie',
        },
        columns: {
            type: 'array',
            label: 'Kolommen',
            arrayFields: {
                span: {
                    label: 'Span (1-12)',
                    type: 'number',
                    min: 1,
                    max: 12,
                },
            },
            getItemSummary: (col, id = -1) =>
                `Kolom ${id + 1}, span ${
                    col.span ? Math.max(Math.min(col.span, 12), 1) : 'auto'
                }`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(defaultSettings({ disableTextColor: true }) as any),
    },
    label: 'Kolommen',
    defaultProps: {
        distribution: 'auto',
        columns: [{}, {}],
        settings: {
            bottomSpacing: 'none',
            containerWidth: '7xl',
            topSpacing: 'none',
        },
    },
    render: (props) => <Columns {...props} />,
};

const Columns = ({
    columns,
    distribution,
    settings,
    id,
}: WithId<WithPuckProps<ColumnsProps>>) => {
    return (
        <Box
            bg={settings?.backgroundColor}
            id={id}
            pt={settings?.topSpacing ?? 0}
            pb={settings?.bottomSpacing ?? 0}
            as="section"
        >
            <Section maxWidth={settings?.containerWidth ?? 'full'}>
                <Box
                    display={{
                        base: 'flex',
                        lg: 'grid',
                    }}
                    flexDir="column"
                    gridGap={4}
                    gridTemplateColumns={
                        distribution === 'manual'
                            ? 'repeat(12, 1fr)'
                            : `repeat(${columns.length}, 1fr)`
                    }
                >
                    {columns.map(({ span }, idx) => (
                        <Flex
                            flexDir="column"
                            gridColumn={
                                span && distribution === 'manual'
                                    ? `span ${Math.max(Math.min(span, 12), 1)}`
                                    : ''
                            }
                            key={idx}
                        >
                            <DropZone zone={`column-${idx}`} />
                        </Flex>
                    ))}
                </Box>
            </Section>
        </Box>
    );
};

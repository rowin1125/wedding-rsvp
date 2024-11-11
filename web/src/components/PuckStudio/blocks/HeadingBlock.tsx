import React from 'react';

import { As, Heading } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import PuckInput from '../components/PuckInput';
import { Section } from '../components/Section';

export type HeadingBlockProps = {
    align: 'left' | 'center' | 'right';
    text?: string;
    size: string;
    padding?: string;
    textColor?: string;
};

const sizeOptions = [
    { value: 'h1', label: 'h1' },
    { value: 'h2', label: 'h2' },
    { value: 'h3', label: 'h3' },
    { value: 'h4', label: 'h4' },
    { value: 'h5', label: 'h5' },
    { value: 'h6', label: 'h6' },
];

export const HeadingBlock: ComponentConfig<HeadingBlockProps> = {
    fields: {
        text: { type: 'text', label: 'Tekst' },
        size: {
            type: 'select',
            options: sizeOptions,
            label: 'Grootte',
        },
        align: {
            type: 'radio',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ],
            label: 'Positionering',
        },
        padding: { type: 'text' },
        textColor: {
            type: 'custom',
            label: 'Tekstkleur',
            render: ({ value, onChange }) => {
                return (
                    <>
                        <FieldLabel label="Tekstkleur" />
                        <PuckInput
                            type="color"
                            value={value || chakraColorToHex('secondary.900')}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </>
                );
            },
        },
    },
    defaultProps: {
        align: 'left',
        text: 'Heading',
        padding: '24px',
        size: 'h2',
        textColor: chakraColorToHex('secondary.900'),
    },
    label: 'Normale - Koptekst',
    render: ({ align, text, size, padding, id, textColor }) => {
        return (
            <Section padding={padding} id={id}>
                <Heading
                    size={size ?? 'h2'}
                    as={(size as As) ?? 'h2'}
                    color={textColor}
                >
                    <span
                        style={{
                            display: 'block',
                            textAlign: align,
                            width: '100%',
                        }}
                    >
                        {text}
                    </span>
                </Heading>
            </Section>
        );
    },
};

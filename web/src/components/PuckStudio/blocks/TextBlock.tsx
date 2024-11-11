import React from 'react';

import { Text } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import PuckInput from '../components/PuckInput';
import { Section } from '../components/Section';

export type TextProps = {
    align: 'left' | 'center' | 'right';
    text: string;
    padding?: string;
    size?: 's' | 'm';
    textColor?: string;
    maxWidth?: string;
};

export const TextBlock: ComponentConfig<TextProps> = {
    fields: {
        text: {
            type: 'textarea',
        },
        size: {
            type: 'select',
            options: [
                { label: 'S', value: 's' },
                { label: 'M', value: 'm' },
            ],
        },
        align: {
            type: 'radio',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ],
        },
        padding: { type: 'text' },
        maxWidth: { type: 'text' },
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
        text: '',
        padding: '24px',
        size: 'm',
        textColor: chakraColorToHex('secondary.900'),
    },
    label: 'Normale - Text',
    render: ({ align, textColor, text, size, padding, maxWidth, id }) => {
        return (
            <Section padding={padding} maxWidth={maxWidth} id={id}>
                <Text
                    style={{
                        color: textColor,
                        display: 'flex',
                        textAlign: align,
                        width: '100%',
                        fontSize: size === 'm' ? '20px' : '16px',
                        fontWeight: 300,
                        maxWidth,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        justifyContent:
                            align === 'center'
                                ? 'center'
                                : align === 'right'
                                ? 'flex-end'
                                : 'flex-start',
                    }}
                >
                    {text}
                </Text>
            </Section>
        );
    },
};

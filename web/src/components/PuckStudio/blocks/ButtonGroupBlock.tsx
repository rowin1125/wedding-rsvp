import React from 'react';

import {
    Box,
    Button,
    ButtonGroup as ChakraButtonGroup,
} from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

export type ButtonGroupBlockProps = DefaultSettingsType & {
    align?: string;
    buttons: {
        label: string;
        href: string;
        buttonColor: string;
        textColor: string;
    }[];
};

export const ButtonGroupBlock: ComponentConfig<ButtonGroupBlockProps> = {
    label: 'Button Group',
    fields: {
        buttons: {
            type: 'array',
            getItemSummary: (item) => item.label || 'Button',
            arrayFields: {
                label: { type: 'text' },
                href: { type: 'text' },
                textColor: {
                    type: 'custom',
                    render: ({ value, onChange }) => {
                        return (
                            <>
                                <FieldLabel label="Tekst kleur" />
                                <input
                                    type="color"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                />
                            </>
                        );
                    },
                },
                buttonColor: {
                    type: 'custom',
                    render: ({ value, onChange }) => {
                        return (
                            <>
                                <FieldLabel label="Button kleur" />
                                <input
                                    type="color"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                />
                            </>
                        );
                    },
                },
            },
            defaultItemProps: {
                label: 'Button',
                href: '#',
                buttonColor: chakraColorToHex('secondary.500'),
                textColor: '#ffffff',
            },
        },
        align: {
            type: 'radio',
            options: [
                { label: 'left', value: 'flex-start' },
                { label: 'center', value: 'center' },
                { label: 'right', value: 'flex-end' },
            ],
        },
        ...defaultSettings(),
    },
    defaultProps: {
        buttons: [
            {
                label: 'Learn more',
                href: '#',
                buttonColor: chakraColorToHex('secondary.500'),
                textColor: '#ffffff',
            },
        ],
        settings: {
            containerWidth: '7xl',
        },
    },
    render: ({ align, buttons, puck, settings, id }) => {
        return (
            <Box
                id={id}
                as="section"
                backgroundColor={settings?.backgroundColor ?? 'inherit'}
                pt={settings?.topSpacing}
                pb={settings?.bottomSpacing}
            >
                <Section maxW={settings?.containerWidth}>
                    <ChakraButtonGroup
                        spacing={4}
                        display="flex"
                        justifyContent={align}
                    >
                        {buttons.map((button, i) => (
                            <Button
                                as="a"
                                key={i}
                                href={button.href}
                                color={button.textColor}
                                bg={button.buttonColor}
                                tabIndex={puck.isEditing ? -1 : undefined}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </ChakraButtonGroup>
                </Section>
            </Box>
        );
    },
};

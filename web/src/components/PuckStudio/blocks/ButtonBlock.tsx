import { Box, Button } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

export type ButtonBlockProps = DefaultSettingsType & {
    label: string;
    href: string;
    buttonColor: string;
    textColor: string;
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
    label: 'Button',
    fields: {
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
        ...defaultSettings(),
    },
    defaultProps: {
        label: 'Button',
        href: '#',
        textColor: '#ffffff',
        buttonColor: chakraColorToHex('secondary.500'),
        settings: {
            containerWidth: 'full',
        },
    },
    render: ({ label, href, buttonColor, textColor, settings, id }) => {
        return (
            <Box
                id={id}
                as="section"
                backgroundColor={settings?.backgroundColor ?? 'inherit'}
                pt={settings?.topSpacing}
                pb={settings?.bottomSpacing}
            >
                <Section maxW={settings?.containerWidth}>
                    <Button
                        color={textColor}
                        as="a"
                        href={href}
                        backgroundColor={buttonColor}
                    >
                        {label}
                    </Button>
                </Section>
            </Box>
        );
    },
};

import { Box, ImageProps } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';
import { JSONContent } from '@tiptap/react';
import { AssetReference } from 'types/graphql';

import Rsvp from 'src/components/Rsvp';

import AssetInput from '../components/AssetInput/AssetInput';
import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

import Tiptap from './RickTextBlock/components/Tiptap/components/Tiptap';

export type RsvpFormBlockProps = DefaultSettingsType & {
    textContent: JSONContent;
    backgroundImage?: AssetReference;
    bgSize?: ImageProps['objectFit'];
    imageOne?: AssetReference;
    imageTwo?: AssetReference;
    imageThree?: AssetReference;
};

export const RsvpFormBlock: ComponentConfig<RsvpFormBlockProps> = {
    fields: {
        textContent: {
            type: 'custom',
            label: 'Tekst',
            render: ({ onChange, value: textContent }) => {
                return (
                    <>
                        <FieldLabel label="Tekst" />
                        <Tiptap
                            content={textContent}
                            onChange={onChange}
                            borderColor="gray.100"
                            borderWidth="1px"
                            borderRadius="md"
                        />
                    </>
                );
            },
        },
        backgroundImage: {
            type: 'custom',
            label: 'Achtergrond afbeelding',
            render: ({ onChange, value: backgroundImage, id }) => {
                return (
                    <>
                        <FieldLabel label="Achtergrond afbeelding" />
                        <AssetInput
                            assetReference={backgroundImage}
                            onChange={onChange}
                            forceModalUpload
                            id={id}
                        />
                    </>
                );
            },
        },
        bgSize: {
            type: 'select',
            label: 'Achtergrond afbeelding grootte',
            options: [
                {
                    label: 'auto',
                    value: 'auto',
                },
                {
                    label: 'cover',
                    value: 'cover',
                },
                {
                    label: 'contain',
                    value: 'contain',
                },
            ],
        },
        imageOne: {
            type: 'custom',
            label: 'Afbeelding 1',
            render: ({ onChange, value: imageOne, id }) => {
                return (
                    <>
                        <FieldLabel label="Afbeelding 1" />
                        <AssetInput
                            assetReference={imageOne}
                            onChange={onChange}
                            forceModalUpload
                            id={id}
                        />
                    </>
                );
            },
        },
        imageTwo: {
            type: 'custom',
            label: 'Afbeelding 2',
            render: ({ onChange, value: imageTwo, id }) => {
                return (
                    <>
                        <FieldLabel label="Afbeelding 2" />
                        <AssetInput
                            assetReference={imageTwo}
                            onChange={onChange}
                            forceModalUpload
                            id={id}
                        />
                    </>
                );
            },
        },
        imageThree: {
            type: 'custom',
            label: 'Afbeelding 3',
            render: ({ onChange, value: imageThree, id }) => {
                return (
                    <>
                        <FieldLabel label="Afbeelding 3" />
                        <AssetInput
                            assetReference={imageThree}
                            onChange={onChange}
                            forceModalUpload
                            id={id}
                        />
                    </>
                );
            },
        },
        ...defaultSettings(),
    },
    defaultProps: {
        textContent: {
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                },
            ],
        },
        backgroundImage: undefined,
        bgSize: 'cover',
        imageOne: undefined,
        imageTwo: undefined,
        imageThree: undefined,
        settings: {
            containerWidth: 'full',
        },
    },
    label: 'RSVP Formulier (Verplicht!)🚨',
    render: (props) => {
        return (
            <Box
                id={props.id}
                as="section"
                pt={props.settings?.topSpacing ?? 0}
                pb={props.settings?.bottomSpacing ?? 0}
                backgroundColor={props.settings?.backgroundColor ?? 'inherit'}
            >
                <Section maxWidth={props?.settings?.containerWidth ?? '7xl'}>
                    <Rsvp {...props} />
                </Section>
            </Box>
        );
    },
};

import { Box, ImageProps } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';
import { JSONContent } from '@tiptap/react';
import { AssetReference } from 'types/graphql';

import TextImage from 'src/components/TextImage/TextImage';

import AssetInput from '../components/AssetInput/AssetInput';
import BooleanInput from '../components/BooleanInput';
import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

import Tiptap from './RickTextBlock/components/Tiptap/components/Tiptap';

export type TextImageBlockProps = DefaultSettingsType & {
    assetReference?: AssetReference;
    textContent: JSONContent;
    imageFirst: boolean;
    assetPositioning: ImageProps['objectFit'];
    backgroundImage?: AssetReference;
    bgSize?: ImageProps['objectFit'];
};

export const TextImageBlock: ComponentConfig<TextImageBlockProps> = {
    fields: {
        assetReference: {
            type: 'custom',
            label: 'Afbeelding',
            render: ({ onChange, value: assetReference, id }) => {
                return (
                    <>
                        <FieldLabel label="Afbeelding" />
                        <AssetInput
                            assetReference={assetReference}
                            onChange={onChange}
                            forceModalUpload
                            id={id}
                        />
                    </>
                );
            },
        },
        assetPositioning: {
            type: 'select',
            label: 'Afbeelding positionering',
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
        textContent: {
            type: 'custom',
            render: ({ onChange, value: content }) => {
                return (
                    <Tiptap
                        content={content}
                        onChange={onChange}
                        borderColor="gray.100"
                        borderWidth="1px"
                        borderRadius="md"
                    />
                );
            },
        },
        imageFirst: {
            type: 'custom',
            label: 'Afbeelding eerst',
            render: ({ onChange, value }) => (
                <BooleanInput
                    label="Afbeelding eerst"
                    value={value}
                    onChange={onChange}
                >
                    Image first
                </BooleanInput>
            ),
        },
        backgroundImage: {
            type: 'custom',
            label: 'Achtergrond afbeelding',
            render: ({ onChange, value: assetReference, id }) => {
                return (
                    <>
                        <FieldLabel label="Achtergrond afbeelding" />
                        <AssetInput
                            assetReference={assetReference}
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
        ...defaultSettings(),
    },
    defaultProps: {
        assetReference: undefined,
        textContent: {
            type: 'doc',
            content: [
                {
                    type: 'heading',
                    attrs: {
                        textAlign: 'left',
                        level: 2,
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'Heading 2',
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    attrs: {
                        textAlign: 'left',
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'Mijn tekst hier',
                        },
                    ],
                },
            ],
        },
        assetPositioning: 'cover',
        imageFirst: true,
        backgroundImage: undefined,
        bgSize: 'cover',
        settings: {
            containerWidth: '7xl',
        },
    },
    label: 'Tekst met afbeelding',
    render: (props) => {
        return (
            <Box
                id={props.id}
                as="section"
                backgroundColor={props.settings?.backgroundColor ?? 'inherit'}
                bgImage={
                    props.backgroundImage?.asset.previewUrl
                        ? props.backgroundImage?.asset.previewUrl
                        : undefined
                }
                bgPosition={
                    props.backgroundImage?.metadata?.focalPoint
                        ? `${props.backgroundImage?.metadata?.focalPoint.x}% ${props.backgroundImage?.metadata?.focalPoint.y}%`
                        : 'center'
                }
                bgSize={props.bgSize ?? 'auto'}
            >
                <Box
                    pt={props.settings?.topSpacing ?? 0}
                    pb={props.settings?.bottomSpacing ?? 0}
                >
                    <Section
                        maxWidth={props?.settings?.containerWidth ?? '7xl'}
                    >
                        <TextImage {...props} />
                    </Section>
                </Box>
            </Box>
        );
    },
};

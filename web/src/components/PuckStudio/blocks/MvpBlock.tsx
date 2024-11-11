import { Box } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';
import { JSONContent } from '@tiptap/react';
import { AssetReference } from 'types/graphql';

import Mvps from 'src/components/Mvps';

import AssetInput from '../components/AssetInput/AssetInput';
import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

import Tiptap from './RickTextBlock/components/Tiptap/components/Tiptap';

export type MvpBlockProps = DefaultSettingsType & {
    title: string;
    subTitle: string;
    backgroundImage?: AssetReference;
    backgroundSize?: string;
    witnesses: {
        name: string;
        role?: string;
        assetReference?: AssetReference;
    }[];
    masterOfCeremonyTitle: string;
    mastersOfCeremony: {
        name: string;
        role?: string;
        assetReference?: AssetReference;
    }[];
    textContent: JSONContent;
};

export const MvpBlock: ComponentConfig<MvpBlockProps> = {
    fields: {
        title: {
            type: 'text',
            label: 'Titel',
        },
        subTitle: {
            type: 'text',
            label: 'Subtitel',
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
        backgroundSize: {
            type: 'select',
            label: 'Achtergrond positie',
            options: [
                {
                    label: 'Auto',
                    value: 'auto',
                },
                {
                    label: 'Cover',
                    value: 'cover',
                },
                {
                    label: 'Contain',
                    value: 'contain',
                },
            ],
        },
        witnesses: {
            type: 'array',
            label: 'Getuigen',
            defaultItemProps: {
                name: '',
                assetReference: undefined,
                role: 'Getuige',
            },
            getItemSummary(item, index = 0) {
                return `Getuige ${index + 1}`;
            },
            arrayFields: {
                name: {
                    type: 'text',
                    label: 'Naam',
                },
                role: {
                    type: 'text',
                    label: 'Rol',
                },
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
            },
        },
        masterOfCeremonyTitle: {
            type: 'text',
            label: 'Ceremoniemeesters Title',
        },
        mastersOfCeremony: {
            type: 'array',
            label: 'Ceremoniemeesters',
            defaultItemProps: {
                name: '',
                assetReference: undefined,
                role: 'Ceremoniemeester',
            },
            getItemSummary(item, index = 0) {
                return `Ceremoniemeester ${index + 1}`;
            },
            arrayFields: {
                name: {
                    type: 'text',
                    label: 'Naam',
                },
                role: {
                    type: 'text',
                    label: 'Rol',
                },
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
            },
        },
        textContent: {
            type: 'custom',
            render: ({ onChange, value: content }) => {
                return (
                    <>
                        <FieldLabel label="Tekst" />
                        <Tiptap
                            content={content}
                            onChange={onChange}
                            borderColor="gray.100"
                            borderWidth="1px"
                            borderRadius="md"
                        />
                    </>
                );
            },
        },
        ...defaultSettings({ disableTextColor: false }),
    },
    defaultProps: {
        subTitle: 'Maak kennis met onze:',
        title: 'Getuigen',
        witnesses: Array.from({ length: 4 }).map((_, index) => ({
            name: `Getuige ${index + 1}`,
            role: 'Getuige',
            assetReference: undefined,
        })),
        masterOfCeremonyTitle: 'Ceremoniemeesters',
        mastersOfCeremony: Array.from({ length: 2 }).map((_, index) => ({
            name: `Persoon ${index + 1}`,
            role: 'Ceremoniemeester',
            assetReference: undefined,
        })),
        textContent: {
            type: 'doc',
            content: [],
        },
        settings: {
            containerWidth: '7xl',
        },
    },
    label: "Mvp's",
    render: (props) => (
        <Box
            id={props.id}
            as="section"
            backgroundColor={props.settings?.backgroundColor ?? 'inherit'}
        >
            <Box
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
                bgSize={props.backgroundSize ?? 'auto'}
            >
                <Section
                    maxWidth={props?.settings?.containerWidth ?? 'full'}
                    pb={props.settings?.bottomSpacing ?? 0}
                    pt={props.settings?.topSpacing ?? 0}
                >
                    <Mvps {...props} />
                </Section>
            </Box>
        </Box>
    ),
};

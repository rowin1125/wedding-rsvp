import { Box } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';
import { JSONContent } from '@tiptap/react';
import { AssetReference } from 'types/graphql';

import StoryTimeline from 'src/components/StoryTimeline/StoryTimeline';

import AssetInput from '../components/AssetInput/AssetInput';
import IconInput from '../components/IconInput';
import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

import Tiptap from './RickTextBlock/components/Tiptap/components/Tiptap';

export type StoryTimeLineBlockProps = DefaultSettingsType & {
    intro: JSONContent;
    stories: {
        textContent: JSONContent;
        assetReference?: AssetReference;
        icon: string;
    }[];
};

export const StoryTimeLineBlock: ComponentConfig<StoryTimeLineBlockProps> = {
    fields: {
        intro: {
            type: 'custom',
            render: ({ onChange, value: content }) => {
                return (
                    <>
                        <FieldLabel label="Text" />
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
        stories: {
            type: 'array',
            label: 'Verhalen',
            defaultItemProps: {
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                        },
                    ],
                },
                icon: 'CgHeart',
            },
            getItemSummary(item, index) {
                return `Verhaal ${(index ?? 0) + 1}`;
            },
            arrayFields: {
                textContent: {
                    type: 'custom',
                    render: ({ onChange, value: content }) => {
                        return (
                            <>
                                <FieldLabel label="Text" />
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
                assetReference: {
                    type: 'custom',
                    label: 'Afbeelding',
                    render: ({ onChange, value: assetReference, id }) => {
                        return (
                            <>
                                <FieldLabel label="Afbeelding" />
                                <AssetInput
                                    assetReference={assetReference}
                                    forceModalUpload
                                    onChange={onChange}
                                    id={id}
                                />
                            </>
                        );
                    },
                },
                icon: {
                    type: 'custom',
                    render: ({ onChange, value: icon }) => {
                        return (
                            <>
                                <FieldLabel label="Icon" />
                                <IconInput onChange={onChange} icon={icon} />
                            </>
                        );
                    },
                },
            },
        },
        ...defaultSettings({ disableTextColor: false }),
    },
    defaultProps: {
        intro: {
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                    attrs: {
                        textAlign: 'center',
                    },
                    content: [
                        {
                            type: 'text',
                            text: 'Lees hier de verhalen van onze bruiloft',
                        },
                    ],
                },
                {
                    type: 'heading',
                    attrs: {
                        textAlign: 'center',
                        level: 2,
                    },
                    content: [
                        {
                            type: 'text',
                            marks: [
                                {
                                    type: 'bold',
                                },
                            ],
                            text: 'Onze verhalen',
                        },
                    ],
                },
            ],
        },
        stories: [
            {
                icon: 'FaRegHeart',
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
                                    marks: [
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                    text: '2015',
                                },
                            ],
                        },
                        {
                            type: 'heading',
                            attrs: {
                                textAlign: 'left',
                                level: 2,
                            },
                            content: [
                                {
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                    text: 'Onze ontmoeting',
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
                                    text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                icon: 'GiBigDiamondRing',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 2,
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: '2023',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'heading',
                            attrs: {
                                level: 2,
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: 'Het aanzoek',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'bold',
                                        },
                                    ],
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
                                    text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                icon: 'FaRegCalendarCheck',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 2,
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: '2024',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'heading',
                            attrs: {
                                level: 2,
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: 'Save the date',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'bold',
                                        },
                                    ],
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
                                    text: 'En op 16 mei 2024 willen wij onze trouwdag met jullie vieren! Een dag vol liefde, gezelligheid, lachen, lekker eten en feesten. Wij kijken er enorm naar uit. Scroll verder voor meer informatie.',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        settings: {
            containerWidth: '7xl',
        },
    },
    label: 'Verhaallijn',
    render: (props) => {
        return (
            <Box
                id={props.id}
                as="section"
                backgroundColor={props.settings?.backgroundColor ?? 'inherit'}
            >
                <Section maxWidth={props?.settings?.containerWidth ?? '7xl'}>
                    <StoryTimeline
                        intro={props.intro}
                        stories={props.stories}
                        pt={props.settings?.topSpacing ?? 0}
                        pb={props.settings?.bottomSpacing ?? 0}
                    />
                </Section>
            </Box>
        );
    },
};

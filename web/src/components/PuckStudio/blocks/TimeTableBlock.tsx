import { Box } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';
import { JSONContent } from '@tiptap/react';

import TimeTable from 'src/components/TimeTable/TimeTable';

import IconInput from '../components/IconInput/IconInput';
import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

import Tiptap from './RickTextBlock/components/Tiptap/components/Tiptap';

export type TimeTableBlockProps = DefaultSettingsType & {
    textContent: JSONContent;
    programItem: {
        icon: string;
        textContent: JSONContent;
    }[];
};

export const TimeTableBlock: ComponentConfig<TimeTableBlockProps> = {
    fields: {
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
        programItem: {
            type: 'array',
            label: 'Program items',
            arrayFields: {
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
            },
            getItemSummary(_, index = 0) {
                return `Program item ${index + 1}`;
            },
            defaultItemProps: {
                icon: 'CgInfinity',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                textAlign: 'center',
                                level: 2,
                            },
                            content: [
                                {
                                    type: 'text',
                                    text: 'Dagprogramma',
                                },
                            ],
                        },
                    ],
                },
            },
        },
        ...defaultSettings({ disableTextColor: false }),
    },
    defaultProps: {
        textContent: {
            type: 'doc',
            content: [],
        },
        programItem: [
            {
                icon: 'FaUserGroup',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 4,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Ontvangst',
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
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: '14:00',
                                    type: 'text',
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
                                level: 4,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Ceremonie',
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
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: '14:30',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                icon: 'LuPartyPopper',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 4,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Toost',
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
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: '15:15',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                icon: 'PiChampagneBold',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 4,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: "Borrel & foto's",
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
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: '15:15',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                icon: 'PiForkKnifeBold',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 4,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Diner',
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
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: '17:30',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                icon: 'GiPartyFlags',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 4,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Feest',
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
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: '20:30',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
            },
            {
                icon: 'MdOutlineWavingHand',
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 4,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Uitzwaaien',
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
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: '01:00',
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
    label: 'Dagprogramma',
    render: (props) => {
        return (
            <Box
                id={props.id}
                as="section"
                backgroundColor={props.settings?.backgroundColor ?? 'inherit'}
                pt={props.settings?.topSpacing ?? 0}
                pb={props.settings?.bottomSpacing ?? 0}
            >
                <Section maxWidth={props?.settings?.containerWidth ?? '7xl'}>
                    <TimeTable {...props} />
                </Section>
            </Box>
        );
    },
};

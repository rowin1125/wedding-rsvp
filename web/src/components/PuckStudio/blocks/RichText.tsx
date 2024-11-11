import React from 'react';

import { ComponentConfig, FieldLabel } from '@measured/puck';
import { JSONContent } from '@tiptap/react';

import { Section } from '../components/Section';

import Tiptap from './RickTextBlock/components/Tiptap/components/Tiptap';

export type RichTextProps = {
    text: JSONContent;
};

export const RichText: ComponentConfig<RichTextProps> = {
    fields: {
        text: {
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
    label: 'Geavanceerd - Rich Text',
    defaultProps: {
        text: {
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                },
            ],
        },
    },
    render: ({ text, id }) => {
        return (
            <Section id={id}>
                <Tiptap
                    content={text}
                    editorConfig={{
                        editable: false,
                    }}
                />
            </Section>
        );
    },
};

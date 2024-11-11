import { ComponentConfig } from '@measured/puck';
import type { Content, JSONContent } from '@tiptap/core';

import Tiptap from './components/Tiptap/components/Tiptap';

export type RichTextBlockProps = {
    content: Content;
};

export const RichTextBlock: ComponentConfig<RichTextBlockProps> = {
    fields: {
        content: {
            type: 'custom',
            render: () => <></>,
        },
    },
    render: ({ puck, ...props }) => {
        return (
            <Tiptap
                {...props}
                content={props.content as JSONContent}
                isEditing={puck.isEditing}
            />
        );
    },
};

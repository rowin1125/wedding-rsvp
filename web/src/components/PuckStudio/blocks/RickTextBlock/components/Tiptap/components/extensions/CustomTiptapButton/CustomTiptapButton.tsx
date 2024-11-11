import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import { TiptapButtonComponent } from './TiptapButtonComponent';

export type ButtonAttributes = {
    text: string;
    href: string;
    target: string;
    buttonColor: string;
};

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        button: {
            insertButton: () => ReturnType;
        };
    }
}

const CustomTiptapButton = Node.create({
    name: 'button',
    group: 'inline',
    inline: true,
    atom: true,

    addAttributes() {
        return {
            text: {
                default: 'Klik hier',
            },
            href: {
                default: '#',
            },
            target: {
                default: '_blank',
            },
            buttonColor: {
                default: chakraColorToHex('secondary.500'),
            },
            textColor: {
                default: '#ffffff',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'button',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['button', mergeAttributes(HTMLAttributes), HTMLAttributes.text];
    },

    addNodeView() {
        return ReactNodeViewRenderer(TiptapButtonComponent);
    },

    addCommands() {
        return {
            insertButton:
                () =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                    });
                },
        };
    },
});

export default CustomTiptapButton;

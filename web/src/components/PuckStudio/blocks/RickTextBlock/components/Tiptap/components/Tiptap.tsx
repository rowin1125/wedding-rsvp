import React, { useEffect, useRef } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import {
    useEditor,
    EditorContent,
    JSONContent,
    UseEditorOptions,
    EditorContentProps,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import ClientOnlyWrapper from 'src/components/ClientOnlyWrapper';
import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import CustomTiptapButton from './extensions/CustomTiptapButton/CustomTiptapButton';
import CustomTiptapFontSize from './extensions/CustomTiptapFontSize';
import CustomTiptapHeader from './extensions/CustomTiptapHeader';
import CustomTiptapLinkHandler from './extensions/CustomTiptapLinkHandler';
import CustomTiptapOrderedList from './extensions/CustomTiptapOrderedList';
import CustomTiptapUnorderedList from './extensions/CustomTiptapUnorderedList';
import LinkBubbleMenu from './menus/LinkBubbleMenu';
import TiptapBubbleMenu from './menus/TiptapBubbleMenu';
import TiptapStaticMenu from './menus/TiptapStaticMenu';

export type TiptapProps = {
    onChange?: (value: JSONContent) => void;
    content: JSONContent;
    isEditing?: boolean;
    editorConfig?: UseEditorOptions;
    editorContentProps?: Omit<EditorContentProps, 'ref' | 'editor'>;
} & Omit<BoxProps, 'onChange' | 'content'>;

const StyledEditor = styled(Box)`
    .tiptap {
        min-height: 100px;

        .chakra-heading:has(a) {
            color: ${chakraColorToHex('info.500')};
            text-decoration: underline;
            text-decoration-thickness: 2px;
        }
        a:not(.chakra-button) {
            color: ${chakraColorToHex('info.500')};
            text-decoration: underline;
            text-decoration-thickness: 1px;
        }

        p.is-empty::before {
            color: #adb5bd;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
        }

        p a:has(.chakra-link) {
            margin-left: 0;
        }
    }

    .ProseMirror:focus {
        outline: none;
    }
`;

const Tiptap = ({
    content,
    onChange,
    editorConfig,
    editorContentProps,
    ...props
}: TiptapProps) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                orderedList: false,
                bulletList: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                defaultProtocol: 'https',
                autolink: false,
            }),
            TextStyle,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            Placeholder.configure({
                placeholder: 'Begin met het schrijven …',
            }),
            CustomTiptapHeader,
            CustomTiptapOrderedList,
            CustomTiptapUnorderedList,
            CustomTiptapLinkHandler,
            CustomTiptapFontSize,
            CustomTiptapButton,
        ],
        content,
        onUpdate: (updateEvent) => onChange?.(updateEvent.editor.getJSON()),
        ...editorConfig,
    });

    const isEditable = editor?.isEditable ?? false;

    useEffect(() => {
        if (onChange) return;

        setTimeout(() => {
            editor?.commands.setContent({
                type: 'doc',
                content: content ? content.content : [],
            });
        });
    }, [content, editor, onChange]);

    return (
        <StyledEditor ref={editorRef} w="full">
            {editor && (
                <>
                    {isEditable && (
                        <>
                            <TiptapStaticMenu editor={editor} />
                            <TiptapBubbleMenu editor={editor} />
                            <LinkBubbleMenu
                                editor={editor}
                                anchorEl={editorRef.current}
                            />
                        </>
                    )}
                    <Box mt={4} {...props}>
                        <EditorContent
                            style={{
                                fontSize: '14px',
                                padding: '8px 12px',
                            }}
                            editor={editor}
                            {...editorContentProps}
                        />
                    </Box>
                </>
            )}
        </StyledEditor>
    );
};

export const TipTapClientOnlyWrapper = (props: TiptapProps) => (
    <ClientOnlyWrapper>
        <Tiptap {...props} />
    </ClientOnlyWrapper>
);

export default TipTapClientOnlyWrapper;

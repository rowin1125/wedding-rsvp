/// <reference types="@tiptap/extension-link" />
import { Box } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import type { Except } from 'type-fest';

import {
    CustomTiptapLinkHandlerStorage,
    LinkMenuState,
} from '../../extensions/CustomTiptapLinkHandler';
import ControlledBubbleMenu, {
    ControlledBubbleMenuProps,
} from '../ControlledBubbleMenu';

import EditLinkMenuContent, {
    type EditLinkMenuContentProps,
} from './EditLinkMenuContent';
import ViewLinkMenuContent, {
    type ViewLinkMenuContentProps,
} from './ViewLinkMenuContent';

export type LinkBubbleMenuProps = Partial<
    Except<
        ControlledBubbleMenuProps,
        'open' | 'editor' | 'children' | 'anchorEl'
    >
> & {
    anchorEl: ControlledBubbleMenuProps['anchorEl'];
    labels?: ViewLinkMenuContentProps['labels'] &
        EditLinkMenuContentProps['labels'];
    editor: Editor;
};

/**
 * A component that renders a bubble menu when viewing, creating, or editing a
 * link. Requires the mui-tiptap CustomTiptapLinkHandler extension and Tiptap's
 * Link extension (@tiptap/extension-link, https://tiptap.dev/api/marks/link) to
 * both be included in your editor `extensions` array.
 */
export default function LinkBubbleMenu({
    labels,
    editor,
    ...controlledBubbleMenuProps
}: LinkBubbleMenuProps) {
    if (!editor?.isEditable) {
        return null;
    }

    if (!('CustomTiptapLinkHandler' in editor.storage)) {
        throw new Error(
            'You must add the CustomTiptapLinkHandler extension to the useEditor `extensions` array in order to use this component!'
        );
    }
    const handlerStorage = editor.storage
        .CustomTiptapLinkHandler as CustomTiptapLinkHandlerStorage;

    const menuState = handlerStorage.state;

    let linkMenuContent = null;
    if (menuState === LinkMenuState.VIEW_LINK_DETAILS) {
        linkMenuContent = (
            <ViewLinkMenuContent
                editor={editor}
                onCancel={editor.commands.closeLinkBubbleMenu}
                onEdit={editor.commands.editLinkInBubbleMenu}
                onRemove={() => {
                    editor
                        .chain()
                        .unsetLink()
                        .setTextSelection(editor.state.selection.to)
                        .focus()
                        .run();
                }}
                labels={labels}
            />
        );
    } else if (menuState === LinkMenuState.EDIT_LINK) {
        linkMenuContent = (
            <EditLinkMenuContent
                editor={editor}
                onCancel={editor.commands.closeLinkBubbleMenu}
                onSave={({ text, link }) => {
                    editor
                        .chain()
                        .extendMarkRange('link')
                        .insertContent({
                            type: 'text',
                            marks: [
                                {
                                    type: 'link',
                                    attrs: {
                                        href: link,
                                    },
                                },
                            ],
                            text: text,
                        })
                        .setLink({
                            href: link,
                        })
                        .focus()
                        .run();

                    editor.commands.closeLinkBubbleMenu();
                }}
                labels={labels}
            />
        );
    }

    return (
        <ControlledBubbleMenu
            editor={editor}
            open={menuState !== LinkMenuState.HIDDEN}
            {...handlerStorage.bubbleMenuOptions}
            {...controlledBubbleMenuProps}
        >
            <Box p={3}>{linkMenuContent}</Box>
        </ControlledBubbleMenu>
    );
}

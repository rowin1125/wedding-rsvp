import { Extension, getAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

import { LinkBubbleMenuProps } from '../menus/LinkBubbleMenu';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linkBubbleMenu: {
            openLinkBubbleMenu: (
                options?: Partial<LinkBubbleMenuProps>
            ) => ReturnType;
            editLinkInBubbleMenu: () => ReturnType;
            closeLinkBubbleMenu: () => ReturnType;
        };
    }
}

export enum LinkMenuState {
    HIDDEN,
    VIEW_LINK_DETAILS,
    EDIT_LINK,
}

export type CustomTiptapLinkHandlerStorage = {
    state: LinkMenuState;
    bubbleMenuOptions: Partial<LinkBubbleMenuProps> | undefined;
};

const CustomTiptapLinkHandler = Extension.create<
    undefined,
    CustomTiptapLinkHandlerStorage
>({
    name: 'CustomTiptapLinkHandler',

    addStorage() {
        return {
            state: LinkMenuState.HIDDEN,
            bubbleMenuOptions: undefined,
        };
    },

    addCommands() {
        return {
            openLinkBubbleMenu:
                (bubbleMenuOptions = {}) =>
                ({ editor, chain, dispatch }) => {
                    const currentMenuState = this.storage.state;

                    let newMenuState: LinkMenuState;
                    if (editor.isActive('link')) {
                        if (
                            currentMenuState !== LinkMenuState.VIEW_LINK_DETAILS
                        ) {
                            chain().extendMarkRange('link').focus().run();
                        }

                        newMenuState = LinkMenuState.VIEW_LINK_DETAILS;
                    } else {
                        newMenuState = LinkMenuState.EDIT_LINK;
                    }

                    if (dispatch) {
                        this.storage.state = newMenuState;
                        this.storage.bubbleMenuOptions = bubbleMenuOptions;
                    }

                    return true;
                },

            editLinkInBubbleMenu:
                () =>
                ({ dispatch }) => {
                    const currentMenuState = this.storage.state;
                    const newMenuState = LinkMenuState.EDIT_LINK;
                    if (currentMenuState === newMenuState) {
                        return false;
                    }

                    if (dispatch) {
                        this.storage.state = newMenuState;
                    }

                    return true;
                },

            closeLinkBubbleMenu:
                () =>
                ({ commands, dispatch }) => {
                    const currentMenuState = this.storage.state;
                    if (currentMenuState === LinkMenuState.HIDDEN) {
                        return false;
                    }
                    commands.focus();

                    if (dispatch) {
                        this.storage.state = LinkMenuState.HIDDEN;
                    }

                    return true;
                },
        };
    },

    onSelectionUpdate() {
        if (this.storage.state === LinkMenuState.EDIT_LINK) {
            this.editor.commands.closeLinkBubbleMenu();
        } else if (
            this.storage.state === LinkMenuState.VIEW_LINK_DETAILS &&
            !this.editor.isActive('link')
        ) {
            this.editor.commands.closeLinkBubbleMenu();
        }
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Shift-u': () => {
                this.editor.commands.openLinkBubbleMenu();

                return true;
            },
        };
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('handleClickLinkForMenu'),
                props: {
                    handleClick: (view, pos, event) => {
                        const attrs = getAttributes(view.state, 'link');
                        const link = (event.target as HTMLElement).closest('a');

                        if (
                            link &&
                            attrs.href &&
                            this.storage.state === LinkMenuState.HIDDEN
                        ) {
                            this.editor.commands.openLinkBubbleMenu();
                        } else {
                            this.editor.commands.closeLinkBubbleMenu();
                        }

                        return false;
                    },
                },
            }),
        ];
    },
});

export default CustomTiptapLinkHandler;

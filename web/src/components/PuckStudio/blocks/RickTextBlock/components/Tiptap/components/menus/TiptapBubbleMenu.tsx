import React from 'react';

import { Box, ButtonGroup, Button, Icon } from '@chakra-ui/react';
import { BubbleMenu, Editor } from '@tiptap/react';
import { FaLink } from 'react-icons/fa6';

import TipTapFontSizeMenu from './TipTapFontSizeMenu/TipTapFontSizeMenu';
import TiptapHeadingMenu from './TiptapHeadingMenu';

type TiptapBubbleMenuProps = {
    editor: Editor;
};

const TiptapBubbleMenu = ({ editor }: TiptapBubbleMenuProps) => {
    return (
        <Box as={BubbleMenu} editor={editor}>
            <ButtonGroup
                background="secondary.100"
                px={2}
                py={1}
                borderRadius={10}
                alignItems="center"
                justifyContent="center"
            >
                <TipTapFontSizeMenu editor={editor} />
                <TiptapHeadingMenu editor={editor} />
                <Button
                    size="xs"
                    variant={editor.isActive('bold') ? 'solid' : 'ghost'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    B
                </Button>
                <Button
                    size="xs"
                    variant={editor.isActive('underline') ? 'solid' : 'ghost'}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <Box as="span" textDecor="underline">
                        U
                    </Box>
                </Button>
                <Button
                    size="xs"
                    variant={editor.isActive('italic') ? 'solid' : 'ghost'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <i>I</i>
                </Button>
                <Button
                    size="xs"
                    variant={editor.isActive('strike') ? 'solid' : 'ghost'}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <Box textDecoration="line-through">S</Box>
                </Button>
                <Button
                    size="xs"
                    onClick={() =>
                        editor.chain().focus().openLinkBubbleMenu().run()
                    }
                    variant={editor.isActive('link') ? 'solid' : 'ghost'}
                >
                    <Icon as={FaLink} />
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default TiptapBubbleMenu;

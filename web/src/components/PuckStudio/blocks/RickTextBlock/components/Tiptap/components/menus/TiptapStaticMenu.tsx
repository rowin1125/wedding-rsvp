import React from 'react';

import { Box, Button, Divider, HStack, IconButton } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { FaUndo, FaRedo } from 'react-icons/fa';
import { FaListOl, FaListUl } from 'react-icons/fa6';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import TiptapTextAlignMenu from './TiptapTextAlignMenu';

type TiptapStaticMenuProps = {
    editor: Editor;
};

const TiptapStaticMenu = ({ editor }: TiptapStaticMenuProps) => {
    return (
        <HStack
            gridGap={2}
            rowGap={0}
            borderRadius="md"
            flexWrap="wrap"
            position="relative"
            mb={4}
        >
            <IconButton
                size="xs"
                icon={<FaListUl />}
                aria-label="Bullet List"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
            />
            <IconButton
                size="xs"
                icon={<FaListOl />}
                aria-label="Ordered List"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
            />
            <Divider orientation="vertical" w={1} h="20px" color="black" />
            <TiptapTextAlignMenu editor={editor} />
            <Divider orientation="vertical" w={1} h="20px" color="black" />
            <IconButton
                size="xs"
                icon={<FaUndo />}
                aria-label="Undo"
                variant="ghost"
                onClick={() => editor.chain().focus().undo().run()}
            />
            <IconButton
                size="xs"
                icon={<FaRedo />}
                aria-label="Redo"
                variant="ghost"
                onClick={() => editor.chain().focus().redo().run()}
            />
            <Divider orientation="vertical" w={1} h="20px" color="black" />
            <Button
                aria-label="Add button"
                size="xs"
                variant="ghost"
                onClick={() => editor.commands.insertButton()}
                isActive={editor.isActive('bold')}
            >
                Button
            </Button>
            <Divider orientation="vertical" w={1} h="20px" color="black" />
            <Button
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .setColor(chakraColorToHex('secondary.900'))
                        .run()
                }
                size="xs"
                variant="ghost"
            >
                <Box w={4} h={4} bg="secondary.900" borderRadius="4px" />
            </Button>
            <input
                type="color"
                defaultValue={
                    editor.getAttributes('textStyle').color ??
                    chakraColorToHex('secondary.900')
                }
                onInput={(event) => {
                    const color = event.currentTarget.value;
                    return editor.chain().focus().setColor(color).run();
                }}
            />
        </HStack>
    );
};

export default TiptapStaticMenu;

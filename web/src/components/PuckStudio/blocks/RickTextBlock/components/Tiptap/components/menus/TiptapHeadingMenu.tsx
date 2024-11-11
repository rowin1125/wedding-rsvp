import React from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Menu,
    MenuButton,
    Button,
    Icon,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import type { Level } from '@tiptap/extension-heading';
import { Editor } from '@tiptap/react';
import { FaParagraph } from 'react-icons/fa6';
import { GoHeading } from 'react-icons/go';

type TiptapHeadingMenuProps = {
    editor: Editor;
};

const TiptapHeadingMenu = ({ editor }: TiptapHeadingMenuProps) => {
    const currentLevel = editor.getAttributes('heading')?.level || '0';

    const handleSelect = (level: number) => {
        if (level === 0) {
            editor.chain().focus().setParagraph().run();
        } else {
            editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(level) as Level })
                .run();
        }
    };

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="ghost"
                fontSize="xs"
                size="xs"
                px={1}
                alignItems="center"
            >
                {currentLevel === '0' ? (
                    <Icon fontSize="xs" as={FaParagraph} />
                ) : (
                    <Icon fontSize="xs" as={GoHeading} />
                )}{' '}
                {currentLevel !== '0' ? currentLevel : 'P'}{' '}
                <Icon as={ChevronDownIcon} fontSize="sm" />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => handleSelect(0)}>
                    <Icon as={FaParagraph} mr={2} /> Paragraph
                </MenuItem>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                    <MenuItem onClick={() => handleSelect(level)} key={level}>
                        <Icon as={GoHeading} mr={2} /> Heading {level}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default TiptapHeadingMenu;

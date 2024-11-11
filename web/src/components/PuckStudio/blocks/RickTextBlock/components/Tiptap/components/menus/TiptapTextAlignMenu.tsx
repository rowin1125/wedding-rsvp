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
import { Editor } from '@tiptap/react';
import {
    FaAlignCenter,
    FaAlignJustify,
    FaAlignLeft,
    FaAlignRight,
} from 'react-icons/fa6';

type TiptapTextAlignMenuProps = {
    editor: Editor;
};

const TiptapTextAlignMenu = ({ editor }: TiptapTextAlignMenuProps) => {
    const CurrentTextAlignIcon = () => {
        if (editor.isActive({ textAlign: 'left' })) {
            return <Icon as={FaAlignLeft} />;
        }
        if (editor.isActive({ textAlign: 'center' })) {
            return <Icon as={FaAlignCenter} />;
        }
        if (editor.isActive({ textAlign: 'right' })) {
            return <Icon as={FaAlignRight} />;
        }
        if (editor.isActive({ textAlign: 'justify' })) {
            return <Icon as={FaAlignJustify} />;
        }
        return <Icon as={FaAlignLeft} />;
    };

    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="unstyled"
                color="secondary.500"
                background="transparent"
                fontSize="xs"
                alignItems="center"
            >
                <CurrentTextAlignIcon />
                <Icon as={ChevronDownIcon} fontSize="sm" />
            </MenuButton>
            <MenuList minW="auto" py={0}>
                <MenuItem
                    w="fit-content"
                    onClick={() =>
                        editor.chain().focus().setTextAlign('left').run()
                    }
                    background={
                        editor.isActive({ textAlign: 'left' })
                            ? 'secondary.900'
                            : ''
                    }
                    color={
                        editor.isActive({ textAlign: 'left' })
                            ? 'white'
                            : 'black'
                    }
                >
                    <Icon as={FaAlignLeft} mr={2} />
                </MenuItem>
                <MenuItem
                    w="fit-content"
                    onClick={() =>
                        editor.chain().focus().setTextAlign('center').run()
                    }
                    background={
                        editor.isActive({ textAlign: 'center' })
                            ? 'secondary.900'
                            : ''
                    }
                    color={
                        editor.isActive({ textAlign: 'center' })
                            ? 'white'
                            : 'black'
                    }
                >
                    <Icon as={FaAlignCenter} mr={2} />
                </MenuItem>
                <MenuItem
                    w="fit-content"
                    onClick={() =>
                        editor.chain().focus().setTextAlign('right').run()
                    }
                    background={
                        editor.isActive({ textAlign: 'right' })
                            ? 'secondary.900'
                            : ''
                    }
                    color={
                        editor.isActive({ textAlign: 'right' })
                            ? 'white'
                            : 'black'
                    }
                >
                    <Icon as={FaAlignRight} mr={2} />
                </MenuItem>
                <MenuItem
                    w="fit-content"
                    onClick={() =>
                        editor.chain().focus().setTextAlign('justify').run()
                    }
                    background={
                        editor.isActive({ textAlign: 'justify' })
                            ? 'secondary.900'
                            : ''
                    }
                    color={
                        editor.isActive({ textAlign: 'justify' })
                            ? 'white'
                            : 'black'
                    }
                >
                    <Icon as={FaAlignJustify} mr={2} />
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default TiptapTextAlignMenu;

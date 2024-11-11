import React from 'react';
import type { ReactNode } from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    Icon,
} from '@chakra-ui/react';
import { Editor } from '@tiptap/core';
import { FaFont } from 'react-icons/fa';

import { FontSizeAttrs } from '../../extensions/CustomTiptapFontSize';

import { getAttributesForEachSelected } from './helpers/getAttributesForEachSelected';

export type FontSizeSelectOptionObject = {
    value: string;
    label?: ReactNode;
};

export type FontSizeSelectOption = string | FontSizeSelectOptionObject;

export type TipTapFontSizeMenuProps = {
    editor?: Editor;
    options?: FontSizeSelectOption[];
    unsetOptionLabel?: ReactNode;
    hideUnsetOption?: boolean;
    emptyLabel?: ReactNode;
};

const DEFAULT_FONT_SIZE_SELECT_OPTIONS: TipTapFontSizeMenuProps['options'] = [
    '8px',
    '9px',
    '10px',
    '11px',
    '12px',
    '14px',
    '16px',
    '18px',
    '24px',
    '30px',
    '36px',
    '48px',
    '60px',
    '72px',
    '96px',
];

interface TextStyleAttrs
    extends ReturnType<Editor['getAttributes']>,
        FontSizeAttrs {}

function stripPxFromValue(value: string): string {
    return value.replace('px', '');
}

const MULTIPLE_SIZES_SELECTED_VALUE = 'MULTIPLE';

export default function TipTapFontSizeMenu({
    editor,
    options = DEFAULT_FONT_SIZE_SELECT_OPTIONS,
    hideUnsetOption = false,
    unsetOptionLabel = '-',
    emptyLabel,
    ...menuSelectProps
}: TipTapFontSizeMenuProps) {
    const optionObjects: FontSizeSelectOptionObject[] = (options ?? []).map(
        (option) => (typeof option === 'string' ? { value: option } : option)
    );

    const allCurrentTextStyleAttrs: TextStyleAttrs[] = editor
        ? getAttributesForEachSelected(editor.state, 'textStyle')
        : [];
    const isTextStyleAppliedToEntireSelection = !!editor?.isActive('textStyle');
    const currentFontSizes: string[] = allCurrentTextStyleAttrs.map(
        (attrs) => attrs.fontSize ?? ''
    );
    if (!isTextStyleAppliedToEntireSelection) {
        currentFontSizes.push('');
    }
    const numUniqueCurrentFontSizes = new Set(currentFontSizes).size;

    let currentFontSize;
    if (numUniqueCurrentFontSizes === 1) {
        currentFontSize = currentFontSizes[0];
    } else if (numUniqueCurrentFontSizes > 1) {
        currentFontSize = MULTIPLE_SIZES_SELECTED_VALUE;
    } else {
        currentFontSize = '';
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                fontSize="sm"
                px={1}
                size="xs"
                variant="ghost"
                {...menuSelectProps}
            >
                {currentFontSize === MULTIPLE_SIZES_SELECTED_VALUE
                    ? emptyLabel ?? <Icon as={FaFont} />
                    : stripPxFromValue(currentFontSize) || unsetOptionLabel}
            </MenuButton>
            <MenuList>
                {!hideUnsetOption && (
                    <MenuItem
                        onClick={() =>
                            editor?.chain().unsetFontSize().focus().run()
                        }
                    >
                        {unsetOptionLabel}
                    </MenuItem>
                )}

                {optionObjects.map((option) => (
                    <MenuItem
                        key={option.value}
                        onClick={() =>
                            editor
                                ?.chain()
                                .setFontSize(option.value)
                                .focus()
                                .run()
                        }
                    >
                        {option.label ?? stripPxFromValue(option.value)}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

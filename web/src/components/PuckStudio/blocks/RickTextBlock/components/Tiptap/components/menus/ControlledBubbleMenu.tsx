import { useRef, useEffect } from 'react';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useTheme,
    Portal,
    PopoverProps,
} from '@chakra-ui/react';
import { type Editor } from '@tiptap/core';

export type ControlledBubbleMenuProps = {
    editor: Editor;
    open: boolean;
    children: React.ReactNode;
    anchorEl: HTMLElement | null;
    placement?: PopoverProps['placement'];
    flipPadding?:
        | number
        | { top?: number; right?: number; bottom?: number; left?: number };
    className?: string;
};

/**
 * ControlledBubbleMenu is a custom bubble menu component for Tiptap,
 * using Chakra UI's Popover to create a floating editor menu near
 * the current selection or node.
 */
export default function ControlledBubbleMenu({
    open,
    children,
    anchorEl,
    placement = 'top',
    flipPadding = 8,
    className,
}: ControlledBubbleMenuProps) {
    const theme = useTheme();
    const triggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (anchorEl && triggerRef.current) {
            const { top, left, width, height } =
                anchorEl.getBoundingClientRect();
            const triggerDiv = triggerRef.current;

            triggerDiv.style.position = 'absolute';
            triggerDiv.style.top = `${top}px`;
            triggerDiv.style.left = `${left}px`;
            triggerDiv.style.width = `${width}px`;
            triggerDiv.style.height = `${height}px`;
        }
    }, [anchorEl]);

    if (!open || !anchorEl) return null;

    return (
        <Popover
            isOpen={open}
            placement={placement}
            closeOnBlur={false}
            modifiers={[
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        padding: flipPadding,
                    },
                },
            ]}
        >
            <PopoverTrigger>
                <div ref={triggerRef} style={{ position: 'absolute' }} />
            </PopoverTrigger>

            <Portal>
                <PopoverContent boxShadow="md" zIndex={theme.zIndices.tooltip}>
                    <PopoverBody className={className}>{children}</PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}

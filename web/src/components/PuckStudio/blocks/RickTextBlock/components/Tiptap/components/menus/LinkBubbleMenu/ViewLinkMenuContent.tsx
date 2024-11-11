import type { ReactNode } from 'react';

import { Button, Link, Stack } from '@chakra-ui/react';
import { getMarkRange, getMarkType, type Editor } from '@tiptap/core';

import { truncateText } from 'src/helpers/textHelpers/truncateText/truncateText';

import truncateMiddle from '../../../helpers/truncateMiddle';
import useKeyDown from '../../../hooks/useKeyDown';

export type ViewLinkMenuContentProps = {
    editor: Editor;
    onCancel: () => void;
    onEdit: () => void;
    onRemove: () => void;
    labels?: {
        viewLinkEditButtonLabel?: ReactNode;
        viewLinkRemoveButtonLabel?: ReactNode;
    };
};

export default function ViewLinkMenuContent({
    editor,
    onCancel,
    onEdit,
    onRemove,
    labels,
}: ViewLinkMenuContentProps) {
    const linkRange = getMarkRange(
        editor.state.selection.$to,
        getMarkType('link', editor.schema)
    );
    const linkText = linkRange
        ? editor.state.doc.textBetween(linkRange.from, linkRange.to)
        : '';

    const currentHref =
        (editor.getAttributes('link').href as string | undefined) ?? '';

    useKeyDown('Escape', onCancel);

    return (
        <>
            <div style={{ overflowWrap: 'anywhere' }}>
                {truncateText(linkText, 50, '…')}
            </div>

            <div style={{ overflowWrap: 'anywhere' }}>
                <Link href={currentHref} isExternal>
                    {truncateMiddle(currentHref, 50)}
                </Link>
            </div>

            <Stack direction="row" spacing={4} mt={4}>
                <Button
                    onClick={onEdit}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                >
                    {labels?.viewLinkEditButtonLabel ?? 'Edit'}
                </Button>
                <Button
                    onClick={onRemove}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                >
                    {labels?.viewLinkRemoveButtonLabel ?? 'Remove'}
                </Button>
            </Stack>
        </>
    );
}

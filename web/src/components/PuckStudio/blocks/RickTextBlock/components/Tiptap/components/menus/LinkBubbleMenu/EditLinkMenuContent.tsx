import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from 'react';

import {
    Button,
    Input,
    FormControl,
    FormLabel,
    Heading,
    ButtonGroup,
} from '@chakra-ui/react';
import { getMarkRange, getMarkType, type Editor } from '@tiptap/core';
import encodeurl from 'encodeurl';

import useKeyDown from '../../../hooks/useKeyDown';

export type EditLinkMenuContentProps = {
    editor: Editor;
    onCancel: () => void;
    onSave: ({ text, link }: { text: string; link: string }) => void;
    labels?: {
        editLinkAddTitle?: ReactNode;
        editLinkEditTitle?: ReactNode;
        editLinkTextInputLabel?: ReactNode;
        editLinkHrefInputLabel?: ReactNode;
        editLinkCancelButtonLabel?: ReactNode;
        editLinkSaveButtonLabel?: ReactNode;
    };
};

export default function EditLinkMenuContent({
    editor,
    onCancel,
    onSave,
    labels,
}: EditLinkMenuContentProps) {
    const existingHref = editor.isActive('link')
        ? (editor.getAttributes('link').href as string)
        : '';
    const linkRange = getMarkRange(
        editor.state.selection.$from,
        getMarkType('link', editor.schema)
    );
    const linkText = linkRange
        ? editor.state.doc.textBetween(linkRange.from, linkRange.to)
        : '';

    const selectedText = editor.state.doc.textBetween(
        editor.state.selection.$from.pos,
        editor.state.selection.$to.pos
    );

    const initialText = linkText || selectedText;

    const [textValue, setTextValue] = useState(initialText);
    const [hrefValue, setHrefValue] = useState(existingHref);

    const textRef = useRef<HTMLInputElement | null>(null);
    const hrefRef = useRef<HTMLInputElement | null>(null);

    const isNewLink = !existingHref;
    const addLinkTitle = labels?.editLinkAddTitle ?? 'Link toevoegen';
    const editLinkTitle = labels?.editLinkEditTitle ?? 'Link wijzigen';
    const editMenuTitle = isNewLink ? addLinkTitle : editLinkTitle;

    useEffect(() => {
        const autoFocusOnTextInput = !isNewLink || !initialText;
        if (autoFocusOnTextInput) {
            textRef.current?.focus();
        } else {
            hrefRef.current?.focus();
        }
    }, [isNewLink, initialText]);

    useKeyDown('Escape', onCancel);

    const formatHref = useCallback(() => {
        if (!hrefRef.current) {
            return;
        }

        let currentHrefValue = hrefRef.current.value.trim();
        if (
            currentHrefValue &&
            !currentHrefValue.startsWith('http://') &&
            !currentHrefValue.startsWith('https://') &&
            !currentHrefValue.startsWith('mailto:') &&
            !currentHrefValue.startsWith('tel:')
        ) {
            currentHrefValue = `http://${currentHrefValue}`;
        }
        setHrefValue(encodeurl(currentHrefValue));
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setIsSubmitting(true);
                const text = textRef.current?.value ?? '';
                const href = hrefRef.current?.value ?? '';
                onSave({ text, link: href });
                setIsSubmitting(false);
            }}
        >
            <Heading size="md" mb={4}>
                {editMenuTitle}
            </Heading>

            <FormControl isRequired mb={4}>
                <FormLabel>
                    {labels?.editLinkTextInputLabel ?? 'Text'}
                </FormLabel>
                <Input
                    ref={textRef}
                    value={textValue}
                    onChange={(event) => setTextValue(event.target.value)}
                    disabled={isSubmitting}
                    size="sm"
                />
            </FormControl>

            <FormControl isRequired mb={4}>
                <FormLabel>
                    {labels?.editLinkHrefInputLabel ?? 'Link'}
                </FormLabel>
                <Input
                    ref={hrefRef}
                    value={hrefValue}
                    onChange={(event) => setHrefValue(event.target.value)}
                    disabled={isSubmitting}
                    type="url"
                    size="sm"
                    onBlur={formatHref}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            formatHref();
                        }
                    }}
                />
            </FormControl>

            <ButtonGroup
                spacing={4}
                mt={4}
                justifyContent="flex-end"
                display="flex"
                w="full"
            >
                <Button onClick={onCancel} variant="ghost" size="sm">
                    {labels?.editLinkCancelButtonLabel ?? 'Cancel'}
                </Button>

                <Button type="submit" size="sm" isDisabled={isSubmitting}>
                    {labels?.editLinkSaveButtonLabel ?? 'Opslaan'}
                </Button>
            </ButtonGroup>
        </form>
    );
}

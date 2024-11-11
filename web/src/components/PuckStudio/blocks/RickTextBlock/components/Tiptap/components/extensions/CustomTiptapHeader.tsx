import { Heading as ChakraHeading } from '@chakra-ui/react';
import {
    Heading as TiptapHeading,
    type HeadingOptions,
    type Level,
} from '@tiptap/extension-heading';
import {
    NodeViewContent,
    NodeViewRendererProps,
    NodeViewWrapper,
    ReactNodeViewRenderer,
} from '@tiptap/react';

const HeadingComponent = ({ node, extension }: NodeViewRendererProps) => {
    const level = (node.attrs.level as Level) || 1;
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <NodeViewWrapper
            style={{ textAlign: node.attrs.textAlign }}
            {...extension.options.HTMLAttributes}
        >
            <ChakraHeading as={HeadingTag} size={HeadingTag}>
                <NodeViewContent as="span" />
            </ChakraHeading>
        </NodeViewWrapper>
    );
};

// Create a custom Heading extension
const CustomTiptapHeader = TiptapHeading.extend<HeadingOptions>({
    addNodeView() {
        return ReactNodeViewRenderer(HeadingComponent);
    },
});

export default CustomTiptapHeader;

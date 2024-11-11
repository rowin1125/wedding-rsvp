import { OrderedList as ChakraOrderedList } from '@chakra-ui/react';
import {
    OrderedList as TiptapOrderedList,
    type OrderedListOptions,
} from '@tiptap/extension-ordered-list';
import {
    NodeViewContent,
    NodeViewRendererProps,
    NodeViewWrapper,
    ReactNodeViewRenderer,
} from '@tiptap/react';

const CustomComponent = ({ node, extension }: NodeViewRendererProps) => {
    return (
        <NodeViewWrapper
            as={ChakraOrderedList}
            style={{ textAlign: node.attrs.textAlign }}
            {...extension.options.HTMLAttributes}
        >
            <NodeViewContent as="span" />
        </NodeViewWrapper>
    );
};

const CustomTiptapOrderedList = TiptapOrderedList.extend<OrderedListOptions>({
    addNodeView() {
        return ReactNodeViewRenderer(CustomComponent);
    },
});

export default CustomTiptapOrderedList;

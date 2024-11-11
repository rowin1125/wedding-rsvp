import { UnorderedList as ChakraUnorderedList } from '@chakra-ui/react';
import {
    BulletList as TiptapBulletList,
    type BulletListOptions,
} from '@tiptap/extension-bullet-list';
import {
    NodeViewContent,
    NodeViewRendererProps,
    NodeViewWrapper,
    ReactNodeViewRenderer,
} from '@tiptap/react';

const CustomComponent = ({ node, extension }: NodeViewRendererProps) => {
    return (
        <NodeViewWrapper
            as={ChakraUnorderedList}
            ml={5}
            style={{ textAlign: node.attrs.textAlign }}
            {...extension.options.HTMLAttributes}
        >
            <NodeViewContent as="span" />
        </NodeViewWrapper>
    );
};

const CustomTiptapUnorderedList = TiptapBulletList.extend<BulletListOptions>({
    addNodeView() {
        return ReactNodeViewRenderer(CustomComponent);
    },
});

export default CustomTiptapUnorderedList;

import { useDisclosure } from '@chakra-ui/react';
import { FindGalleryQuery } from 'types/graphql';

type UseImageModalType = {
    images?: NonNullable<FindGalleryQuery['gallery']>['assets'];
};

export const useImageModal = ({ images }: UseImageModalType) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return {
        images,
        isOpen,

        onOpen,
        onClose,
    };
};

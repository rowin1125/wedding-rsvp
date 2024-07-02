import React, { useCallback } from 'react';

import {
    Box,
    Button,
    Flex,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { SwiperSlide } from 'swiper/react';

import SliderWrapper from 'src/components/SliderWrapper';

import ResolveAssetType from './ResolveAssetType';
import SliderVideo from './SliderVideo';

type ImageModalProps = ReturnType<typeof useDisclosure> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: (Record<string, any> | null)[];
    initialIndex: number;
};

const ImageModal = ({
    isOpen,
    images,
    onClose,
    initialIndex,
}: ImageModalProps) => {
    const closeOnEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    React.useEffect(() => {
        window.addEventListener('keydown', closeOnEscape);
        return () => {
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [closeOnEscape]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent
                h={{
                    base: '400px',
                    lg: '800px',
                }}
            >
                <Button
                    zIndex={4}
                    colorScheme="tertiary"
                    variant="solid"
                    w={8}
                    h={8}
                    position="absolute"
                    top={4}
                    right={4}
                    size="sm"
                    onClick={onClose}
                >
                    <Icon as={MdClose} />
                </Button>
                <ModalBody p={0} position="relative" w="100vw" h="100vh">
                    <SliderWrapper
                        w="full"
                        disableAutoPlay
                        h="full"
                        slidesPerView={1}
                        slidesPerViewMobile={1}
                        showControls
                        initialSlide={initialIndex}
                        loop={false}
                        customControls={(
                            slidePrev,
                            slideNext,
                            currentIndex,
                            totalSlides
                        ) => (
                            <Flex
                                p={4}
                                position="absolute"
                                alignItems="center"
                                bottom={{
                                    base: '70px',
                                    lg: 0,
                                }}
                                left={0}
                                right={0}
                                w="full"
                                cursor={'default'}
                                zIndex={4}
                                bg="primary.50"
                                borderBottomRadius="md"
                                justifyContent="space-between"
                            >
                                <Box>
                                    {currentIndex + 1} / {totalSlides}
                                </Box>
                                <Box>
                                    <Button
                                        colorScheme="secondary"
                                        mr={3}
                                        onClick={() => slidePrev()}
                                        isDisabled={currentIndex === 0}
                                    >
                                        Vorige
                                    </Button>
                                    <Button
                                        colorScheme="secondary"
                                        isDisabled={
                                            currentIndex === totalSlides - 1
                                        }
                                        onClick={() => slideNext()}
                                    >
                                        Volgende
                                    </Button>
                                </Box>
                            </Flex>
                        )}
                    >
                        {images?.map((image) => {
                            if (!image) return;
                            return (
                                <SwiperSlide key={image?.id}>
                                    <ResolveAssetType
                                        fileType={image.fileType}
                                        imageProps={{
                                            src: image.url,
                                            previewUrl: image.previewUrl,
                                            w: 'full',
                                            h: 'full',
                                            objectFit: 'contain',
                                            position: 'absolute',
                                            inset: 0,
                                        }}
                                        videoProps={{
                                            src: image.url,
                                            position: 'absolute',
                                            inset: 0,
                                            w: 'full',
                                            h: 'full',
                                            objectFit: 'contain',
                                            controls: true,
                                            locked: true,
                                        }}
                                        customVideo={() => (
                                            <SliderVideo
                                                src={image.url}
                                                position="absolute"
                                                inset={0}
                                                w="full"
                                                h="full"
                                                objectFit="contain"
                                                controls
                                                locked
                                            />
                                        )}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </SliderWrapper>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ImageModal;

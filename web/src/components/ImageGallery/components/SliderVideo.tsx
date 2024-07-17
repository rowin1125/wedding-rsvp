import React, { VideoHTMLAttributes, useState } from 'react';

import { Box, BoxProps, Button, Flex, Icon } from '@chakra-ui/react';
import { BiVideo } from 'react-icons/bi';
import { BsPlay } from 'react-icons/bs';

type SliderVideoProps = BoxProps &
    VideoHTMLAttributes<HTMLVideoElement> & {
        locked?: boolean;
    } & {
        hideIcon?: boolean;
    };

const SliderVideo = ({ hideIcon, ...videoProps }: SliderVideoProps) => {
    const { locked: shouldLock, ...videoPropsWithoutLocked } = videoProps || {};
    const [locked, setLocked] = useState(shouldLock ?? false);
    const showControls = (locked ? false : videoProps?.controls) ?? false;

    return (
        <>
            <Box w="full" h="full" position="relative">
                <Box
                    // Height of footer
                    height="calc(100% - 72px)"
                    {...videoPropsWithoutLocked}
                    width="100%"
                    as="video"
                    controls={showControls}
                />
                {locked && (
                    <Flex
                        inset={0}
                        w="full"
                        h="full"
                        position="absolute"
                        bg="blackAlpha.500"
                        zIndex={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            colorScheme="secondary"
                            h={20}
                            w={20}
                            rounded="full"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            onClick={() => {
                                setLocked(false);
                            }}
                        >
                            <Icon
                                as={BsPlay}
                                color="white"
                                fontSize={{
                                    base: '6xl',
                                    lg: '6xl',
                                }}
                                m="auto"
                            />
                        </Button>
                    </Flex>
                )}
            </Box>
            {!hideIcon && (
                <Icon
                    as={BiVideo}
                    position="absolute"
                    bottom={2}
                    right={2}
                    color="green.500"
                    fontSize={{
                        base: 'md',
                        lg: '2xl',
                    }}
                />
            )}
        </>
    );
};

export default SliderVideo;

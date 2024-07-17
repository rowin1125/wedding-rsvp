import React from 'react';

import { Box, Flex, useToast } from '@chakra-ui/react';
import { MotionValue, motion } from 'framer-motion';

type HeroCardProps = {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
};

const HeroCard = ({ rotate, scale, children }: HeroCardProps) => {
    const Element = motion(Box);
    const toast = useToast();

    return (
        <Element
            style={{
                rotateX: rotate,
                scale,
                boxShadow:
                    '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
            }}
            mt="-12"
            mx="auto"
            h={{
                base: '50rem',
                lg: '70rem',
            }}
            w="full"
            border="4"
            borderColor="secondary.300"
            px={{
                base: 2,
                lg: 6,
            }}
            pt={{
                base: 7,
                lg: 8,
            }}
            pb={{
                base: 12,
                lg: 12,
            }}
            bg="secondary.200"
            rounded="2xl"
            shadow="2xl"
            position="relative"
        >
            <Flex
                position="absolute"
                w="full"
                justifyContent="center"
                zIndex={3}
                top={0}
            >
                <Box
                    w={{
                        base: 4,
                        lg: 5,
                    }}
                    h={{
                        base: 4,
                        lg: 5,
                    }}
                    bg="gray.300"
                    rounded="full"
                    position="relative"
                    top="6px"
                />
                <Box
                    w={{
                        base: 1.5,
                        lg: 2,
                    }}
                    h={{
                        base: 1.5,
                        lg: 2,
                    }}
                    bg="secondary.200"
                    rounded="full"
                    position="absolute"
                    top={{
                        base: '11px',
                        lg: '12px',
                    }}
                    zIndex={3}
                />
            </Flex>
            <Flex
                position="absolute"
                w="full"
                justifyContent="center"
                zIndex={3}
                bottom={0}
            >
                <Box
                    w={{
                        base: 8,
                        lg: 8,
                    }}
                    h={{
                        base: 8,
                        lg: 8,
                    }}
                    bg="gray.300"
                    rounded="full"
                    position="relative"
                    bottom="8px"
                />
                <Box
                    position="absolute"
                    w={{
                        base: 6,
                        lg: 6,
                    }}
                    h={{
                        base: 6,
                        lg: 6,
                    }}
                    cursor="pointer"
                    onClick={() => {
                        toast({
                            title: 'Heee afblijven, dat is mijn tablet!',
                            status: 'info',
                        });
                    }}
                    bg="primary.100"
                    rounded="full"
                    bottom="12px"
                    zIndex={3}
                />
            </Flex>
            <Box
                h="full"
                w="full"
                overflow="hidden"
                rounded="2xl"
                bg="primary.500"
                position="relative"
                p={{
                    base: 2,
                    lg: 4,
                }}
            >
                {children}
            </Box>
        </Element>
    );
};

export default HeroCard;

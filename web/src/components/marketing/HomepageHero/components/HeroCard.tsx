import React from 'react';

import { Box } from '@chakra-ui/react';
import { MotionValue, motion } from 'framer-motion';

type HeroCardProps = {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
};

const HeroCard = ({ rotate, scale, children }: HeroCardProps) => {
    const Element = motion(Box);

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
            p={{
                base: 2,
                lg: 6,
            }}
            bg="secondary.200"
            rounded="2xl"
            shadow="2xl"
        >
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

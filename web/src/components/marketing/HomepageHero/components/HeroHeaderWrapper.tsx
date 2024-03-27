import React from 'react';

import { Box } from '@chakra-ui/react';
import { MotionValue, motion } from 'framer-motion';

type HeroHeaderWrapperProps = {
    translate: MotionValue<number>;
    children: React.ReactNode;
};

const HeroHeaderWrapper = ({ translate, children }: HeroHeaderWrapperProps) => {
    const Element = motion(Box);

    return (
        <Element
            style={{
                translateY: translate,
            }}
            mw="5xl"
            mx="auto"
            textAlign="center"
        >
            {children}
        </Element>
    );
};

export default HeroHeaderWrapper;

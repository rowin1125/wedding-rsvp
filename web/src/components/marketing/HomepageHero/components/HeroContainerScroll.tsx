import React, { useRef } from 'react';

import { Box } from '@chakra-ui/react';
import { useScroll, useTransform } from 'framer-motion';

import { useIsDevice } from 'src/hooks/useIsDevice';

import HeroCard from './HeroCard';
import HeroHeaderWrapper from './HeroHeaderWrapper';

type HeroContainerScrollProps = {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
};

const HeroContainerScroll = ({
    titleComponent,
    children,
}: HeroContainerScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isDesktop } = useIsDevice();
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    const scaleDimensions = () => {
        return !isDesktop ? [0.7, 0.9] : [1.05, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            ref={containerRef}
        >
            <Box
                py={{
                    base: 10,
                    lg: 16,
                }}
                w="full"
                position="relative"
                style={{
                    perspective: '1000px',
                }}
            >
                <HeroHeaderWrapper translate={translate}>
                    {titleComponent}
                </HeroHeaderWrapper>
                <HeroCard rotate={rotate} translate={translate} scale={scale}>
                    {children}
                </HeroCard>
            </Box>
        </Box>
    );
};

export default HeroContainerScroll;

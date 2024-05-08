import React from 'react';

import { Box } from '@chakra-ui/react';

import RedwoodLink from 'src/components/RedwoodLink';

import { useMenu } from './CustomMenu';
import MotionBox from './CustomMotionBox';

const transition = {
    type: 'spring',
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

type CustomMenuItemProps = {
    item?: string | null;
    children: React.ReactNode;
    to?: string;
};

const CustomMenuItem = ({ item, children, to }: CustomMenuItemProps) => {
    const menu = useMenu();
    const LinkElement = to ? RedwoodLink : Box;

    return (
        <Box
            pos="relative"
            onMouseEnter={() => {
                if (!item) return;

                menu?.setActiveItem(item);
            }}
        >
            <LinkElement color="inherit" fontWeight="bold" to={to || '/'}>
                {item}
            </LinkElement>
            {menu?.activeItem !== null && (
                <MotionBox
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={transition}
                >
                    {menu?.activeItem === item && (
                        <>
                            <Box
                                position="absolute"
                                top="calc(100% + 0.0rem)"
                                left="50%"
                                transform="rotate(90deg)"
                                zIndex={1}
                                borderTop="10px solid transparent"
                                borderRight="15px solid #fff"
                                borderBottom="10px solid transparent"
                            />
                            <Box
                                pos="absolute"
                                top="calc(100% + 1rem)"
                                overflow="hidden"
                                left="50%"
                                transform="translateX(-50%)"
                                shadow="0px 5px 20px rgba(0, 0, 0, 0.35)"
                                rounded="lg"
                            >
                                <MotionBox
                                    layoutId="active"
                                    bg="white"
                                    transition={transition}
                                    color="black"
                                >
                                    <MotionBox layout w="max-content" h="100%">
                                        {children}
                                    </MotionBox>
                                </MotionBox>
                            </Box>
                        </>
                    )}
                </MotionBox>
            )}
        </Box>
    );
};

export default CustomMenuItem;

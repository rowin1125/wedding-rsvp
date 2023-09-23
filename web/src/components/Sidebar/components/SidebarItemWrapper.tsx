import React from 'react';

import { Box, Menu, MenuButton, MenuList } from '@chakra-ui/react';

type SidebarItemWrapperProps = {
    hasChildren: boolean;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    children: React.ReactNode;
    isLast?: boolean;
    parentChildren?: React.ReactNode;
};

const SidebarItemWrapper = ({
    hasChildren,
    isOpen,
    onClose,
    onOpen,
    children,
    isLast,
    parentChildren,
}: SidebarItemWrapperProps) => {
    if (!hasChildren)
        return (
            <Box
                borderTop="1px"
                borderColor="gray.200"
                borderBottom={isLast ? '1px solid #E2E8F0' : '0px'} // gray.200
            >
                {children}
            </Box>
        );

    return (
        <Menu isOpen={isOpen} placement="right-start">
            <MenuButton
                borderTop="1px"
                borderColor="gray.200"
                borderBottom={isLast ? '1px solid #E2E8F0' : '0px'} // gray.200
                py={0}
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
            >
                {children}
            </MenuButton>
            <MenuList
                p={0}
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                overflow="hidden"
            >
                {parentChildren}
            </MenuList>
        </Menu>
    );
};

export default SidebarItemWrapper;

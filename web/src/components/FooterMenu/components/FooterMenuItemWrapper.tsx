import React from 'react';

import { Menu, MenuButton, MenuList } from '@chakra-ui/react';

type FooterMenuItemWrapperProps = {
    hasChildren: boolean;
    children: React.ReactNode;
    parentChildren?: React.ReactNode;
};

const FooterMenuItemWrapper = ({
    hasChildren,

    children,
    parentChildren,
}: FooterMenuItemWrapperProps) => {
    if (!hasChildren) return <>{children}</>;

    return (
        <Menu placement="top-start">
            <MenuButton as="button" py={0}>
                {children}
            </MenuButton>
            <MenuList p={0} overflow="hidden " borderColor="primary.500">
                {parentChildren}
            </MenuList>
        </Menu>
    );
};

export default FooterMenuItemWrapper;

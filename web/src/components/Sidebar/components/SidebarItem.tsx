import { As, ChakraProps, IconProps, useDisclosure } from '@chakra-ui/react';

import { useLocation } from '@redwoodjs/router';

import SidebarItemClosed from './SidebarItemClosed';
import SidebarItemOpen from './SidebarItemOpen';
import SidebarItemWrapper from './SidebarItemWrapper';

type SidebarItemProps = {
    title: string;
    icon: As;
    navOpen: boolean;
    to: string;
    isLast?: boolean;
    children?: React.ReactNode;
    iconProps?: IconProps;
} & ChakraProps;

const SidebarItem = ({
    icon,
    title,
    navOpen,
    to,
    isLast,
    children,
    iconProps,
}: SidebarItemProps) => {
    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isHomepage =
        title.toLocaleLowerCase() === 'dashboard' && pathname === '/';
    const active =
        (pathname.includes(title.toLocaleLowerCase()) && !isHomepage) ||
        isHomepage;

    const hasChildren = !!children;
    return (
        <>
            <SidebarItemWrapper
                hasChildren={hasChildren}
                isLast={isLast}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                parentChildren={children}
            >
                {navOpen ? (
                    <SidebarItemOpen
                        to={to}
                        title={title}
                        icon={icon}
                        active={active}
                        hasChildren={hasChildren}
                        iconProps={iconProps}
                    />
                ) : (
                    <SidebarItemClosed
                        active={active}
                        icon={icon}
                        title={title}
                        navOpen={navOpen}
                        to={to}
                        iconProps={iconProps}
                    />
                )}
            </SidebarItemWrapper>
        </>
    );
};

export default SidebarItem;

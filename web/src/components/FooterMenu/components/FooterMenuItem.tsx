/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';

import { Button, ButtonProps, Icon, IconProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

import { useLocation } from '@redwoodjs/router';

import RedwoodLink from 'src/components/RedwoodLink';

import FooterMenuItemWrapper from './FooterMenuItemWrapper';

type FooterMenuItemProps = {
    icon: IconType;
    to?: string;
    title: string;
    iconProps?: IconProps;
    children?: React.ReactNode;
} & ButtonProps;

export const FooterMenuItem = forwardRef<FooterMenuItemProps, any>(
    (
        { icon: IconComponent, to, title, iconProps, children, ...props },
        ref
    ) => {
        const { pathname } = useLocation();

        const isHomepage =
            title.toLocaleLowerCase() === 'dashboard' && pathname === '/app';
        const active =
            (pathname.includes(title.toLocaleLowerCase()) && !isHomepage) ||
            isHomepage;

        const hasChildren = !!children;

        return (
            <FooterMenuItemWrapper
                parentChildren={children}
                hasChildren={hasChildren}
            >
                <Button
                    as={to ? RedwoodLink : 'button'}
                    {...(to && { to })}
                    my="12px"
                    colorScheme={active ? 'body' : 'blackAlpha'}
                    mx={1}
                    ref={ref}
                    {...props}
                >
                    <Icon
                        as={IconComponent}
                        fontSize="lg"
                        color="white"
                        {...iconProps}
                    />
                </Button>
            </FooterMenuItemWrapper>
        );
    }
);

export default FooterMenuItem;

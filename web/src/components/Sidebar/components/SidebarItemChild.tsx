import React from 'react';

import { Button, Divider, Flex, Icon, MenuItem } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { CgChevronRight } from 'react-icons/cg';

import { Link } from '@redwoodjs/router';

type SidebarItemChildProps = {
    children: React.ReactNode;
    to: string;
    divider?: boolean;
    icon: IconType;
};

const SidebarItemChild = ({
    children,
    to,
    divider = true,
    icon,
    ...props
}: SidebarItemChildProps) => {
    const hasIcon = !!icon;
    const CustomIcon = icon;

    return (
        <>
            <MenuItem p={0} {...props}>
                <Button
                    py={8}
                    as={Link}
                    to={to}
                    w="full"
                    variant="ghost"
                    borderRadius={0}
                >
                    <Flex justifyContent="space-between" w="full">
                        <Flex
                            alignItems="center"
                            fontWeight="semibold"
                            color="secondary.900"
                        >
                            {hasIcon && <Icon mr={4} as={CustomIcon} />}
                            {children}
                        </Flex>
                        <Icon as={CgChevronRight} ml={4} />
                    </Flex>
                </Button>
            </MenuItem>
            {divider && <Divider />}
        </>
    );
};

export default SidebarItemChild;

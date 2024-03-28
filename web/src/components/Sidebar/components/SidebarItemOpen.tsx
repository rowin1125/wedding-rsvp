import React from 'react';

import { Button, Flex, Icon, IconProps } from '@chakra-ui/react';
import { CgChevronRight } from 'react-icons/cg';
import { RiMenuUnfoldLine } from 'react-icons/ri';

import RedwoodLink from 'src/components/RedwoodLink';

type SidebarItemOpenProps = {
    to: string;
    title: string;
    icon: React.ElementType;
    active: boolean;
    hasChildren: boolean;
    iconProps?: IconProps;
};

const SidebarItemOpen = ({
    to,
    title,
    icon,
    active,
    iconProps,
    hasChildren,
}: SidebarItemOpenProps) => {
    return (
        <Button
            as={RedwoodLink}
            to={to}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={4}
            py={8}
            w="full"
            bg={active ? 'body.500' : ''}
            color={active ? 'white' : 'secondary.900'}
            borderRight="4px solid"
            borderRightColor={active ? 'body.900' : 'transparent'}
            borderRadius={0}
            _hover={{
                bg: active ? 'body.600' : 'body.100',
                textDecoration: 'none',
            }}
            _active={{
                bg: active ? 'body.800' : 'body.100',
            }}
        >
            <Flex alignItems="center">
                <Icon as={icon} mr={4} {...iconProps} />
                {title}
            </Flex>
            {hasChildren ? (
                <Icon as={RiMenuUnfoldLine} ml={4} />
            ) : (
                <Icon as={CgChevronRight} ml={4} />
            )}
        </Button>
    );
};

export default SidebarItemOpen;

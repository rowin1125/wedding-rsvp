import React from 'react';

import { Flex, Button, Icon, IconProps } from '@chakra-ui/react';

import { Link } from '@redwoodjs/router';

type SidebarItemClosedProps = {
    navOpen: boolean;
    title: string;
    active: boolean;
    to: string;
    icon: React.ElementType;
    iconProps?: IconProps;
};

const SidebarItemClosed = ({
    active,
    icon,
    iconProps,
    to,
}: SidebarItemClosedProps) => {
    return (
        <Flex justifyContent="center">
            <Button
                as={Link}
                to={to}
                my="12px"
                colorScheme={active ? 'body' : 'primary'}
                mx={1}
            >
                <Icon
                    as={icon}
                    fontSize="md"
                    color={active ? 'white' : 'body.900'}
                    {...iconProps}
                />
            </Button>
        </Flex>
    );
};

export default SidebarItemClosed;

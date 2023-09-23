import React from 'react';

import { Flex, Button, Icon, IconProps } from '@chakra-ui/react';

import RedwoodLink from 'src/components/RedwoodLink';

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
                as={RedwoodLink}
                to={to}
                my="12px"
                colorScheme={active ? 'body' : 'gray'}
                mx={1}
            >
                <Icon as={icon} fontSize="md" {...iconProps} />
            </Button>
        </Flex>
    );
};

export default SidebarItemClosed;

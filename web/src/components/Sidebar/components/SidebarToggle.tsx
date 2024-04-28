import React from 'react';

import { Flex, Tooltip, Button, Icon } from '@chakra-ui/react';
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

type SidebarToggleProps = {
    navOpen: boolean;
    toggleNav: (navOpen: boolean) => void;
};

const SidebarToggle = ({ navOpen, toggleNav }: SidebarToggleProps) => {
    return (
        <Flex w="full">
            <Tooltip
                label="Gebruik ` [ ` op je toetsenbord om de navigatie te openen of sluiten"
                placement="top"
                bg="secondary.500"
                hasArrow
                openDelay={600}
            >
                <Button
                    w="full"
                    onClick={() => toggleNav(!navOpen)}
                    size="sm"
                    colorScheme="primary"
                    color="body.900"
                    variant="ghost"
                    py={6}
                    fontWeight="bold"
                >
                    {navOpen ? 'Sluiten' : ''}{' '}
                    <Icon
                        ml={navOpen ? 2 : 0}
                        as={navOpen ? CgPushChevronLeft : CgPushChevronRight}
                        fontSize="xl"
                    />
                </Button>
            </Tooltip>
        </Flex>
    );
};

export default SidebarToggle;

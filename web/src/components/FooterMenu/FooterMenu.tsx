import React from 'react';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { MdFormatListBulleted } from 'react-icons/md';

import { useGetMenuItems } from 'src/hooks/useGetMenuItems';

import FooterDrawer from './components/FooterDrawer';
import FooterMenuItem from './components/FooterMenuItem';
import FooterMenuItemResolver from './components/FooterMenuItemResolver';

export const footerMenuHeight = '70px';

const FooterMenu = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    const menuList = useGetMenuItems();

    return (
        <Box mt={footerMenuHeight} display={{ base: 'block', lg: 'none' }}>
            <Box
                h={footerMenuHeight}
                w="full"
                bg="#F1E7DB"
                position="fixed"
                zIndex={9999}
                bottom={0}
            >
                <Flex
                    justifyContent="space-around"
                    alignItems="center"
                    h="full"
                >
                    {menuList.map((listItem, index) => (
                        <FooterMenuItemResolver
                            item={listItem}
                            key={`${listItem.label}-${index}`}
                        />
                    ))}
                    <FooterMenuItem
                        ref={btnRef}
                        onClick={onToggle}
                        title="Menu"
                        icon={MdFormatListBulleted}
                        as={Button}
                    />
                    <FooterDrawer
                        isOpen={isOpen}
                        onClose={onClose}
                        btnRef={btnRef}
                    />
                </Flex>
            </Box>
        </Box>
    );
};

export default FooterMenu;

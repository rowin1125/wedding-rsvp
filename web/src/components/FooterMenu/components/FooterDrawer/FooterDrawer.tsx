import React from 'react';

import {
    Accordion,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    Flex,
    useToast,
} from '@chakra-ui/react';
import { TbHome } from 'react-icons/tb';

import { routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import { useGetMenuItems } from 'src/hooks/useGetMenuItems';

import AccordionDirectLink from './components/AccordionDirectLink';
import FooterDrawerHeader from './components/FooterDrawerHeader';
import FooterDrawerItemResolver from './components/FooterDrawerItemResolver';

type FooterDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.RefObject<HTMLButtonElement>;
};

const FooterDrawer = ({ isOpen, onClose, btnRef }: FooterDrawerProps) => {
    const { logOut } = useAuth();
    const toast = useToast();
    const handleLogout = () => {
        logOut();
        toast({
            title: 'Je bent uitgelogd',
            status: 'success',
        });
    };

    const menuItems = useGetMenuItems();
    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent mb="70px" bg="#F1E7DB">
                <DrawerCloseButton />
                <FooterDrawerHeader />

                <DrawerBody>
                    <Accordion allowMultiple>
                        <AccordionDirectLink
                            onClose={onClose}
                            to={routes.home()}
                            icon={TbHome}
                        >
                            Home
                        </AccordionDirectLink>
                        {menuItems.map((menuItem) => (
                            <FooterDrawerItemResolver
                                onClose={onClose}
                                key={menuItem.label}
                                item={menuItem}
                            />
                        ))}
                    </Accordion>
                </DrawerBody>

                <DrawerFooter boxShadow="5px -30px 21px #F1E7DB" zIndex={4}>
                    <Flex>
                        <Button
                            colorScheme="body"
                            mr={6}
                            variant="outline"
                            onClick={handleLogout}
                        >
                            Log uit
                        </Button>
                        <Button colorScheme="body" onClick={onClose}>
                            Sluiten
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default FooterDrawer;

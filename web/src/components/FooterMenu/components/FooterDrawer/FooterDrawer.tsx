import React from 'react';

import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    Flex,
    Heading,
} from '@chakra-ui/react';

import { routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import RedwoodLink from 'src/components/RedwoodLink';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import FooterDrawerHeader from './components/FooterDrawerHeader';

type FooterDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.RefObject<HTMLButtonElement>;
};

const FooterDrawer = ({ isOpen, onClose, btnRef }: FooterDrawerProps) => {
    const { logOut } = useAuth();
    const { wedding } = useGetWeddingById();
    const handleLogut = () => {
        logOut();
        toast.success('Je bent uitgelogd');
    };

    if (!wedding) return null;

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent mb="70px" bg="#F1E7DB" color="white">
                <DrawerCloseButton />
                <FooterDrawerHeader />

                <DrawerBody>
                    <Heading mt={10} mb={4}>
                        {"Pagina's"}
                    </Heading>
                    <Box position="relative" mb={4}>
                        <Button
                            as={RedwoodLink}
                            to={routes.weddingRsvp({
                                invitationType: 'F',
                                weddingId: wedding.id,
                            })}
                            w="full"
                            variant="outline"
                            colorScheme="body"
                        >
                            Daggasten pagina
                        </Button>
                    </Box>
                    <Box position="relative" mb={4}>
                        <Button
                            as={RedwoodLink}
                            to={routes.weddingRsvp({
                                invitationType: 'E',
                                weddingId: wedding.id,
                            })}
                            w="full"
                            variant="outline"
                            colorScheme="body"
                        >
                            Avondgasten pagina
                        </Button>
                    </Box>
                    <Box position="relative" mb={4}>
                        <Button w="full" variant="outline" colorScheme="body">
                            Uitloggen
                        </Button>
                    </Box>
                </DrawerBody>

                <DrawerFooter boxShadow="5px -30px 21px #F1E7DB" zIndex={4}>
                    <Flex>
                        <Button
                            colorScheme="body"
                            mr={6}
                            variant="outline"
                            onClick={handleLogut}
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

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
} from '@chakra-ui/react';
import { BiPhotoAlbum, BiSun } from 'react-icons/bi';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { CgOptions, CgWebsite } from 'react-icons/cg';
import { FaRegEnvelopeOpen } from 'react-icons/fa6';
import { RiDashboard3Line } from 'react-icons/ri';
import { TbHome } from 'react-icons/tb';

import { routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import AccordionDirectLink from './components/AccordionDirectLink';
import AccordionWithNestedLinks from './components/AccordionWithNestedLinks';
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
                        <AccordionDirectLink
                            onClose={onClose}
                            to={routes.dashboard()}
                            icon={RiDashboard3Line}
                            iconProps={{
                                fontSize: 'xl',
                            }}
                        >
                            Dashboard
                        </AccordionDirectLink>

                        <AccordionWithNestedLinks
                            title="Dagdelen"
                            icon={FaRegEnvelopeOpen}
                        >
                            <AccordionDirectLink
                                onClose={onClose}
                                nested
                                to={routes.dayGuests()}
                                icon={BiSun}
                            >
                                Dag gasten
                            </AccordionDirectLink>

                            <AccordionDirectLink
                                onClose={onClose}
                                nested
                                to={routes.eveningGuests()}
                                icon={BsFillMoonStarsFill}
                            >
                                Avond gasten
                            </AccordionDirectLink>
                        </AccordionWithNestedLinks>
                        <AccordionWithNestedLinks title="RSVP" icon={CgWebsite}>
                            <AccordionDirectLink
                                onClose={onClose}
                                nested
                                to={routes.weddingRsvp({
                                    invitationType: 'F',
                                    weddingId: wedding.id,
                                })}
                                icon={BiSun}
                            >
                                RSVP Dag
                            </AccordionDirectLink>

                            <AccordionDirectLink
                                onClose={onClose}
                                nested
                                to={routes.weddingRsvp({
                                    invitationType: 'E',
                                    weddingId: wedding.id,
                                })}
                                icon={BsFillMoonStarsFill}
                            >
                                RSVP Avond
                            </AccordionDirectLink>
                        </AccordionWithNestedLinks>

                        <AccordionDirectLink
                            onClose={onClose}
                            to={routes.galleries()}
                            icon={BiPhotoAlbum}
                        >
                            Galerij
                        </AccordionDirectLink>
                        <AccordionDirectLink
                            onClose={onClose}
                            to={routes.weddingSettings()}
                            icon={CgOptions}
                        >
                            Instellingen
                        </AccordionDirectLink>
                    </Accordion>
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

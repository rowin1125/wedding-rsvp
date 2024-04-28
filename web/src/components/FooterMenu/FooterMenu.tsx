import React from 'react';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { BiPhotoAlbum, BiSun } from 'react-icons/bi';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { CgOptions, CgWebsite } from 'react-icons/cg';
import { FaRegEnvelopeOpen } from 'react-icons/fa6';
import { MdFormatListBulleted } from 'react-icons/md';
import { RiDashboard3Line } from 'react-icons/ri';

import { routes } from '@redwoodjs/router';

import FooterDrawer from './components/FooterDrawer';
import FooterMenuItem from './components/FooterMenuItem';
import FooterMenuItemChild from './components/FooterMenuItemChild';

export const footerMenuHeight = '70px';

const FooterMenu = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

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
                    <FooterMenuItem
                        title="Dashboard"
                        icon={RiDashboard3Line}
                        to={routes.dashboard()}
                        iconProps={{
                            fontSize: 'xl',
                        }}
                    />
                    <FooterMenuItem title="dagdelen" icon={FaRegEnvelopeOpen}>
                        <FooterMenuItemChild
                            icon={BiSun}
                            to={routes.dayGuests()}
                        >
                            Dag gasten
                        </FooterMenuItemChild>
                        <FooterMenuItemChild
                            icon={BsFillMoonStarsFill}
                            divider={false}
                            to={routes.eveningGuests()}
                        >
                            Avond gasten
                        </FooterMenuItemChild>
                    </FooterMenuItem>

                    <FooterMenuItem title="RSVP" icon={CgWebsite}>
                        <FooterMenuItemChild
                            icon={BiSun}
                            to={routes.dayGuests()}
                        >
                            RSVP Dag
                        </FooterMenuItemChild>
                        <FooterMenuItemChild
                            icon={BsFillMoonStarsFill}
                            divider={false}
                            to={routes.eveningGuests()}
                        >
                            RSVP Avond
                        </FooterMenuItemChild>
                    </FooterMenuItem>

                    <FooterMenuItem
                        icon={BiPhotoAlbum}
                        title="Galerij"
                        to={routes.galleries()}
                    />
                    <FooterMenuItem
                        icon={CgOptions}
                        title="Instellingen"
                        to={routes.weddingSettings()}
                    />
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

import React from 'react';

import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { BiSun } from 'react-icons/bi';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { CgOptions } from 'react-icons/cg';
import { MdFormatListBulleted } from 'react-icons/md';
import { RiDashboard3Line } from 'react-icons/ri';

import { routes } from '@redwoodjs/router';

import FooterDrawer from './components/FooterDrawer';
import FooterMenuItem from './components/FooterMenuItem';

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

                    <FooterMenuItem
                        icon={BiSun}
                        title="Dag-gasten"
                        to={routes.dayGuests()}
                    />
                    <FooterMenuItem
                        icon={BsFillMoonStarsFill}
                        title="Avond-gasten"
                        to={routes.eveningGuests()}
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

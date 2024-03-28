import { Button, Flex, Icon, Image, useEventListener } from '@chakra-ui/react';
import { BiLogOut, BiSun } from 'react-icons/bi';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { CgOptions, CgWebsite } from 'react-icons/cg';
import { FaRegEnvelopeOpen } from 'react-icons/fa6';
import { RiDashboard3Line } from 'react-icons/ri';

import { routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import useLocalStorage from 'src/hooks/useLocalStorage';

import RedwoodLink from '../RedwoodLink';

import SidebarItem from './components/SidebarItem';
import SidebarItemChild from './components/SidebarItemChild';
import SidebarToggle from './components/SidebarToggle';

const ClOSE_SIDEBAR_KEYS = ['221', '['];

const Sidebar = () => {
    const [navOpen, toggleNav] = useLocalStorage('navOpen', true);
    const { logOut } = useAuth();
    const handleLogout = () => {
        toast.success('Je bent uitgelogd');
        logOut();
    };
    const { wedding } = useGetWeddingById();
    const handler = ({ key }: { key: string }) => {
        if (ClOSE_SIDEBAR_KEYS.includes(String(key))) {
            toggleNav(!navOpen);
        }
    };

    useEventListener('keydown', handler);

    return (
        <Flex
            pos="sticky"
            left="0"
            top={0}
            h="100vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            flexDir="column"
            justifyContent="space-between"
            borderBottomRightRadius="10px"
            bg="body.50"
            display={{ base: 'none', lg: 'flex' }}
            zIndex={4}
        >
            <Flex flexDir="column" w="full" as="nav">
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    py={6}
                    minH="190px"
                >
                    <RedwoodLink
                        w="full"
                        to={routes.weddingRsvp({
                            invitationType: 'F',
                            weddingId: wedding?.id || '',
                        })}
                        _hover={{
                            textDecoration: 'none',
                        }}
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            w="full"
                        >
                            <Image
                                src="/Bruiloft buddy logo.png"
                                w={navOpen ? '120px' : '50px'}
                                h="auto"
                            />
                        </Flex>
                    </RedwoodLink>
                </Flex>

                <SidebarItem
                    navOpen={navOpen}
                    icon={RiDashboard3Line}
                    title="Dashboard"
                    to={routes.dashboard()}
                />
                <SidebarItem
                    navOpen={navOpen}
                    icon={FaRegEnvelopeOpen}
                    title="Dagdelen"
                    to={routes.dashboard()}
                >
                    <SidebarItemChild icon={BiSun} to={routes.dayGuests()}>
                        Dag gasten
                    </SidebarItemChild>
                    <SidebarItemChild
                        icon={BsFillMoonStarsFill}
                        divider={false}
                        to={routes.eveningGuests()}
                    >
                        Avond gasten
                    </SidebarItemChild>
                </SidebarItem>
                {wedding?.id && (
                    <SidebarItem
                        navOpen={navOpen}
                        icon={CgWebsite}
                        title="RSVP"
                        to={routes.dashboard()}
                    >
                        <SidebarItemChild
                            icon={BiSun}
                            to={routes.weddingRsvp({
                                invitationType: 'F',
                                weddingId: wedding.id,
                            })}
                        >
                            Dag gasten
                        </SidebarItemChild>
                        <SidebarItemChild
                            icon={BsFillMoonStarsFill}
                            to={routes.weddingRsvp({
                                invitationType: 'E',
                                weddingId: wedding.id,
                            })}
                            divider={false}
                        >
                            Avond gasten
                        </SidebarItemChild>
                    </SidebarItem>
                )}
                <SidebarItem
                    navOpen={navOpen}
                    icon={CgOptions}
                    title="Instellingen"
                    to={routes.weddingSettings()}
                />
                <Button
                    borderBottomWidth={1}
                    borderTopWidth={1}
                    borderBottomColor="gray.200"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={4}
                    onClick={handleLogout}
                    py={8}
                    w="full"
                    bg={'body.50'}
                    color={'secondary.900'}
                    borderRadius={0}
                    _hover={{
                        bg: 'body.100',
                        textDecoration: 'none',
                    }}
                    _active={{
                        bg: 'body.100',
                    }}
                >
                    {navOpen ? (
                        <Flex alignItems="center">
                            <Icon as={BiLogOut} mr={4} />
                            Log uit
                        </Flex>
                    ) : (
                        <Button
                            my="12px"
                            mx={1}
                            colorScheme={'primary'}
                            color={'body.900'}
                        >
                            <Icon as={BiLogOut} />
                        </Button>
                    )}
                </Button>
            </Flex>
            <SidebarToggle navOpen={navOpen} toggleNav={toggleNav} />
        </Flex>
    );
};

export default Sidebar;

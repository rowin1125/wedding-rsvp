import { Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { BiLogOut, BiSun } from 'react-icons/bi';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { CgChevronRight, CgOptions } from 'react-icons/cg';
import { RiDashboard3Line } from 'react-icons/ri';

import { routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import RedwoodLink from '../RedwoodLink';

import SidebarItem from './components/SidebarItem';

const Sidebar = () => {
    const { logOut } = useAuth();
    const handleLogout = () => {
        toast.success('Je bent uitgelogd');
        logOut();
    };
    const { wedding } = useGetWeddingById();

    return (
        <Flex
            pos="sticky"
            left="0"
            top={0}
            minH="calc(100vh - 300px - 56px)"
            h="full"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            flexDir="column"
            justifyContent="space-between"
            borderBottomRightRadius="10px"
            bg="body.50"
            display={{ base: 'none', lg: 'flex' }}
            zIndex={4}
        >
            <Flex flexDir="column" w="full" as="nav">
                <Flex justifyContent="center" alignItems="center" py={16}>
                    <RedwoodLink
                        w="full"
                        zIndex={2}
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
                            <Image src="/Bruiloft buddy logo.png" h="100px" />
                            <Text
                                ml={4}
                                color="secondary.900"
                                fontWeight="semibold"
                                fontSize={{
                                    base: '2xl',
                                    xl: '3xl',
                                }}
                            >
                                Bruiloft Buddy
                            </Text>
                        </Flex>
                    </RedwoodLink>
                </Flex>

                <SidebarItem
                    navOpen={true}
                    icon={RiDashboard3Line}
                    title="Dashboard"
                    to={routes.dashboard()}
                />

                <SidebarItem
                    navOpen={true}
                    icon={BiSun}
                    title="Dag-gasten"
                    to={routes.dayGuests()}
                />
                <SidebarItem
                    navOpen={true}
                    icon={BsFillMoonStarsFill}
                    title="Avond-gasten"
                    to={routes.eveningGuests()}
                />

                <SidebarItem
                    navOpen={true}
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
                    color={'black'}
                    borderRadius={0}
                    _hover={{
                        bg: 'body.100',
                        textDecoration: 'none',
                    }}
                    _active={{
                        bg: 'body.100',
                    }}
                >
                    <Flex alignItems="center">
                        <Icon as={BiLogOut} mr={4} />
                        Log uit
                    </Flex>

                    <Icon as={CgChevronRight} ml={4} />
                </Button>
            </Flex>
        </Flex>
    );
};

export default Sidebar;

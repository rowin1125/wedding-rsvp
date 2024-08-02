import {
    Button,
    Flex,
    Icon,
    Image,
    useEventListener,
    useToast,
} from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';

import { routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import { useGetMenuItems } from 'src/hooks/useGetMenuItems';
import useLocalStorage from 'src/hooks/useLocalStorage';

import RedwoodLink from '../RedwoodLink';

import SidebarItemResolver from './components/SidebarItemResolver';
import SidebarToggle from './components/SidebarToggle';

const ClOSE_SIDEBAR_KEYS = ['221', '['];

const Sidebar = () => {
    const [navOpen, toggleNav] = useLocalStorage('navOpen', true);
    const { logOut } = useAuth();
    const toast = useToast();
    const handleLogout = () => {
        toast({
            title: 'Je bent uitgelogd',
            status: 'success',
        });
        logOut();
    };
    const handler = ({ key }: { key: string }) => {
        if (ClOSE_SIDEBAR_KEYS.includes(String(key))) {
            toggleNav(!navOpen);
        }
    };

    useEventListener('keydown', handler);

    const menuList = useGetMenuItems();

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
                        to={routes.home()}
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

                {menuList.map((item, index) => {
                    return (
                        <SidebarItemResolver
                            key={index}
                            item={item}
                            navOpen={navOpen}
                        />
                    );
                })}
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
                            as="span"
                            role="button"
                            aria-label="Log uit"
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

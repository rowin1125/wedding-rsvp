import React from 'react';

import {
    Box,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    Icon,
    Image,
    Link,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { CiMail, CiPhone } from 'react-icons/ci';
import { SlMenu } from 'react-icons/sl';
import { InvitationType } from 'types/graphql';

import { navigate, routes, useParams } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import { useGetGuestInvitationById } from 'src/components/GuestDataTable/hooks/useGetGuestInvitationById';
import RedwoodLink from 'src/components/RedwoodLink';

import logo from '../../Logo-wedding.png';

export const fakeLinks = [
    { link: 'story', label: 'Story' },
    {
        link: 'mvp',
        label: "MVP's",
    },
    {
        link: 'program',
        label: 'Programma',
    },
    {
        link: 'rsvp',
        label: 'Uitnodiging',
    },
];

export const waitFor = (time = 1000) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, time);
    });

export const handleLinkClick = async (
    link: string,
    weddingId: string,
    invitationType: 'F' | 'E',
    callBack?: () => void
) => {
    const element = document.getElementById(link);
    const pathname = window.location.pathname;

    if (!pathname.includes('bruiloft')) {
        navigate(routes.weddingRsvp({ weddingId, invitationType }));
        await waitFor(1000);
        handleLinkClick(link, weddingId, invitationType, callBack);
    }
    if (element) {
        const offset = 85;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }

    await waitFor();
    callBack?.();
};

const MobileMenuDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);
    const { logOut, currentUser } = useAuth();
    const handleLogut = () => {
        logOut();
        toast.success('Je bent uitgelogd');
    };

    const handleLoginNavigation = () => {
        navigate(routes.login());
        onClose();
    };

    const { weddingId, weddingInvitationId } = useParams();
    const { weddingInvitation } =
        useGetGuestInvitationById(weddingInvitationId);

    let invitationType: InvitationType;

    if (
        !weddingInvitation?.invitationType ||
        window.location.pathname.includes('bruiloft')
    ) {
        invitationType = window.location.pathname.includes('F')
            ? 'DAY'
            : 'EVENING';
    } else {
        invitationType = weddingInvitation?.invitationType || 'DAY';
    }

    return (
        <>
            <Center
                justifyContent="space-between"
                w={{ base: 'full', lg: 'auto' }}
                py={{ base: 2, lg: 0 }}
                display={{ base: 'flex', lg: 'none' }}
            >
                <Flex justifyContent="center" w="full">
                    <RedwoodLink
                        to="/"
                        title="Naar home"
                        display={'flex'}
                        alignItems="center"
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Image src={logo} width={24} alt="Demi & Rowin" />
                    </RedwoodLink>
                </Flex>
                <Button
                    ref={btnRef}
                    display={{ base: 'block', lg: 'none' }}
                    variant="ghost"
                    colorScheme="body"
                    onClick={onOpen}
                >
                    <Icon as={SlMenu} color="black" fontSize="2xl" />
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent bg="white" color="white">
                        <DrawerCloseButton color="white" bg="body.500" />
                        <DrawerHeader
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDir="column"
                        >
                            <Image
                                src={logo}
                                width={'100px'}
                                height={'100px'}
                                alt="Demi & Rowin"
                                style={{ objectFit: 'contain' }}
                            />
                            <Heading mt={4} fontSize="3xl">
                                Wedding
                            </Heading>
                        </DrawerHeader>

                        <DrawerBody>
                            {fakeLinks.map((link, index) => (
                                <Box key={`${link}-${index}`} w={'full'}>
                                    <Button
                                        onClick={() =>
                                            handleLinkClick(
                                                link.link,
                                                weddingId,
                                                invitationType === 'DAY'
                                                    ? 'F'
                                                    : 'E',
                                                onClose
                                            )
                                        }
                                        variant="link"
                                        py={4}
                                    >
                                        <Heading
                                            as="span"
                                            fontSize="lg"
                                            textAlign="left"
                                        >
                                            - {link.label.replace('#', '')}
                                        </Heading>
                                    </Button>
                                </Box>
                            ))}
                            <Box w={'full'}>
                                {currentUser && (
                                    <Button
                                        onClick={() =>
                                            navigate(routes.dashboard())
                                        }
                                        variant="link"
                                        py={4}
                                    >
                                        <Heading
                                            as="span"
                                            fontSize="lg"
                                            textAlign="left"
                                        >
                                            - Admin Dashboard
                                        </Heading>
                                    </Button>
                                )}
                            </Box>
                            <Heading mt={6}>Ceremoniemeesters</Heading>
                            <Text>
                                Mocht je ons willen verrassen met een dansje,
                                slechte grap of lieve woorden? Bespreek dit dan
                                met onze ceremoniemeesters. Zij weten wat wij
                                wel of niet willen op onze dag.
                            </Text>
                            <Box mt={8}>
                                <Text mb={2} fontWeight="bold">
                                    Tirza Voss
                                </Text>
                                <Flex alignItems="center">
                                    <Icon
                                        as={CiMail}
                                        color="black"
                                        fontSize="2xl"
                                    />
                                    <Link
                                        ml={4}
                                        href="mailto:tirzavoss@hotmail.com"
                                    >
                                        tirzavoss@hotmail.com
                                    </Link>
                                </Flex>
                                <Flex mt={2} alignItems="center">
                                    <Icon
                                        as={CiPhone}
                                        color="black"
                                        fontSize="2xl"
                                    />
                                    <Link ml={4} href="tel:+31654308330">
                                        +31654308330
                                    </Link>
                                </Flex>
                            </Box>

                            <Box mt={8}>
                                <Text mb={2} fontWeight="bold">
                                    Xander Greuter
                                </Text>
                                <Flex alignItems="center">
                                    <Icon
                                        as={CiMail}
                                        color="black"
                                        fontSize="2xl"
                                    />
                                    <Link
                                        ml={4}
                                        href="mailto:asgreuter@gmail.com"
                                    >
                                        asgreuter@gmail.com
                                    </Link>
                                </Flex>
                                <Flex mt={2} alignItems="center">
                                    <Icon
                                        as={CiPhone}
                                        color="black"
                                        fontSize="2xl"
                                    />
                                    <Link ml={4} href="tel:+31638190312">
                                        +31638190312
                                    </Link>
                                </Flex>
                            </Box>
                        </DrawerBody>
                        <DrawerFooter zIndex={4}>
                            <Flex>
                                {currentUser ? (
                                    <Button
                                        colorScheme="body"
                                        mr={6}
                                        variant="outline"
                                        onClick={handleLogut}
                                    >
                                        Log uit
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme="body"
                                        mr={6}
                                        variant="outline"
                                        onClick={handleLoginNavigation}
                                    >
                                        Login
                                    </Button>
                                )}
                                <Button colorScheme="body" onClick={onClose}>
                                    Sluiten
                                </Button>
                            </Flex>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Center>
        </>
    );
};

export default MobileMenuDrawer;

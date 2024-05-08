import React from 'react';

import {
    Box,
    Button,
    Center,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
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

import { navigate, routes, useLocation, useParams } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import { useGetGuestInvitationById } from 'src/components/GuestDataTable/hooks/useGetGuestInvitationById';

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
    pathname: string,
    callBack?: () => void
) => {
    const element = document.getElementById(link);

    if (!pathname.includes('bruiloft')) {
        navigate(routes.weddingRsvp({ weddingId, invitationType }));
        await waitFor(1000);
        handleLinkClick(link, weddingId, invitationType, pathname, callBack);
    }

    if (element) {
        const offset = 85;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        if (typeof window === 'undefined') return;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }

    await waitFor();
    callBack?.();
};

const RsvpMobileMenuDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);
    const { currentUser } = useAuth();
    const { pathname } = useLocation();

    const { weddingId, weddingInvitationId } = useParams();
    const { weddingInvitation } =
        useGetGuestInvitationById(weddingInvitationId);

    let invitationType: InvitationType;

    if (!weddingInvitation?.invitationType || pathname.includes('bruiloft')) {
        invitationType = pathname.includes('F') ? 'DAY' : 'EVENING';
    } else {
        invitationType = weddingInvitation?.invitationType || 'DAY';
    }

    return (
        <>
            <Center
                justifyContent="flex-end"
                w={{ base: 'full', lg: 'auto' }}
                py={{ base: 0, lg: 0 }}
                display={{ base: 'flex', lg: 'none' }}
            >
                <Button
                    ref={btnRef}
                    display={{ base: 'flex', lg: 'none' }}
                    variant="ghost"
                    alignItems="center"
                    colorScheme="body"
                    onClick={onOpen}
                >
                    <Text mr={4} as="span">
                        Behulpzame links
                    </Text>
                    <Icon as={SlMenu} color="body.900" fontSize="sm" />
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent bg="white" color="white">
                        <DrawerCloseButton color="white" bg="body.900" />
                        <DrawerHeader
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDir="column"
                        >
                            <Image
                                src={'/Bruiloft buddy logo.png'}
                                width={'80px'}
                                height="auto"
                                alt="Demi & Rowin"
                                style={{ objectFit: 'contain' }}
                            />
                            <Heading mt={4} fontSize="3xl">
                                Bruiloft Buddy
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
                                                pathname,
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
                    </DrawerContent>
                </Drawer>
            </Center>
        </>
    );
};

export default RsvpMobileMenuDrawer;

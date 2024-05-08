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

import { useLocation, useParams } from '@redwoodjs/router';

import { useGetGuestInvitationById } from 'src/components/GuestDataTable/hooks/useGetGuestInvitationById';

import {
    fakeLinks,
    handleLinkClick,
} from '../RsvpMobileMenuDrawer/RsvpMobileMenuDrawer';

const RsvpDesktopHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { weddingId, weddingInvitationId } = useParams();
    const { weddingInvitation } =
        useGetGuestInvitationById(weddingInvitationId);
    const btnRef = React.useRef(null);
    const { pathname } = useLocation();

    let invitationType: InvitationType;

    if (!weddingInvitation?.invitationType || pathname.includes('bruiloft')) {
        invitationType = pathname.includes('F') ? 'DAY' : 'EVENING';
    } else {
        invitationType = weddingInvitation?.invitationType || 'DAY';
    }

    return (
        <Center
            display={{
                base: 'none',
                lg: 'flex',
            }}
            justifyContent="space-between"
            w="full"
            py={{ base: 2, lg: 0 }}
        >
            <Box />
            <Flex justifyContent="space" alignItems="center">
                {fakeLinks.map((link) => (
                    <Link
                        onClick={() =>
                            handleLinkClick(
                                link.link,
                                weddingId,
                                invitationType === 'DAY' ? 'F' : 'E',
                                pathname
                            )
                        }
                        key={link.label}
                        mx={4}
                    >
                        <Heading fontSize="lg">{link.label}</Heading>
                    </Link>
                ))}
            </Flex>
            <Box>
                <Button
                    ref={btnRef}
                    variant="ghost"
                    colorScheme="primary"
                    onClick={onOpen}
                >
                    <Icon as={SlMenu} color="secondary.900" fontSize="2xl" />
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    size="md"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent bg="white" color="white">
                        <DrawerCloseButton color="black" />
                        <DrawerHeader
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDir="column"
                        >
                            <Image
                                src={'/Bruiloft buddy logo.png'}
                                width={'100px'}
                                height={'100px'}
                                alt="Demi & Rowin"
                                style={{ objectFit: 'contain' }}
                            />
                            <Heading mt={4}>Onze speciale dag</Heading>
                        </DrawerHeader>

                        <DrawerBody>
                            <Text textAlign="center">
                                Wij kijken er ontzetten naar uit om onze
                                speciale dag met jullie te delen.
                            </Text>
                            <Heading
                                mt={10}
                                as="h3"
                                size="h3"
                                textAlign="center"
                            >
                                Contactgegevens ceremoniemeesters
                            </Heading>
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
                        <DrawerFooter>
                            <Button colorScheme="body" onClick={onClose}>
                                Sluiten
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Center>
    );
};

export default RsvpDesktopHeader;

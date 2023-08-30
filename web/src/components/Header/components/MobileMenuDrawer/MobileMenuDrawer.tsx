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

export const handleLinkClick = async (link: string, callBack?: () => void) => {
    const element = document.getElementById(link);

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
    const waitForScroll = () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, 1000);
        });
    await waitForScroll();
    callBack?.();
};

const MobileMenuDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

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
                    colorScheme="primary"
                    _hover={{ bg: 'primary.700' }}
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
                        <DrawerCloseButton color="white" />
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
                                            handleLinkClick(link.link, onClose)
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
                                    <Link ml={4} href="mailto:xander@gmail.com">
                                        tirza@gmail.com
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
                                    <Link ml={4} href="mailto:xander@gmail.com">
                                        xander@gmail.com
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

export default MobileMenuDrawer;

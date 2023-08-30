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

import RedwoodLink from 'src/components/RedwoodLink/RedwoodLink';

import logo from '../../Logo-wedding.png';
import {
    fakeLinks,
    handleLinkClick,
} from '../MobileMenuDrawer/MobileMenuDrawer';

const DesktopHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

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
            <RedwoodLink
                to="/"
                title="Naar home"
                display={'flex'}
                alignItems="center"
                _hover={{ textDecoration: 'none' }}
            >
                <Image src={logo} width={28} alt="Demi & Rowin" />
            </RedwoodLink>
            <Flex justifyContent="space" alignItems="center">
                {fakeLinks.map((link) => (
                    <Link
                        onClick={() => handleLinkClick(link.link)}
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
                    <Icon as={SlMenu} color="black" fontSize="2xl" />
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
                                src={logo}
                                width={'100px'}
                                height={'100px'}
                                alt="Demi & Rowin"
                                style={{ objectFit: 'contain' }}
                            />
                            <Heading mt={4} fontSize="3xl">
                                Onze speciale dag
                            </Heading>
                        </DrawerHeader>

                        <DrawerBody>
                            <Text textAlign="center">
                                Wij kijken er ontzetten naar uit om onze
                                speciale dag met jullie te delen.
                            </Text>
                            <Heading mt={10}>
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
            </Box>
        </Center>
    );
};

export default DesktopHeader;

import React, { RefObject } from 'react';

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
    Icon,
    Image,
    useDisclosure,
} from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';
import { SlMenu } from 'react-icons/sl';

import { routes } from '@redwoodjs/router';

import SmartLoginButton from 'src/components/marketing/SmartLoginButton';
import RedwoodLink from 'src/components/RedwoodLink';
import { truncateText } from 'src/helpers/textHelpers/truncateText/truncateText';

import { navigationData } from '../../headerRoutes';

import AccordionDirectLink from './components/AccordionDirectLink';
import AccordionWithNestedLinks from './components/AccordionWithNestedLinks';

type MobileMenuDrawerProps = {
    mobileNavbarRef: RefObject<HTMLDivElement>;
};

const MobileMenuDrawer = ({ mobileNavbarRef }: MobileMenuDrawerProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    return (
        <Center
            display={{ base: 'flex', lg: 'none' }}
            ref={mobileNavbarRef}
            color="inherit"
            w="full"
        >
            <Flex justifyContent="center" w="full">
                <RedwoodLink
                    to={routes.home()}
                    title="Naar home"
                    display={'flex'}
                    alignItems="center"
                    _hover={{ textDecoration: 'none' }}
                >
                    <Box position="relative">
                        <Image
                            src={'/Bruiloft buddy logo.png'}
                            w={{
                                base: 12,
                            }}
                            objectPosition={'center'}
                            objectFit={'contain'}
                        />
                    </Box>
                </RedwoodLink>
            </Flex>
            <Button
                ref={btnRef}
                variant="ghost"
                colorScheme="primary"
                _hover={{ bg: 'primary.700' }}
                color="inherit"
                onClick={onOpen}
            >
                <Icon as={SlMenu} color="inherit" />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bg="primary.50" color="black">
                    <DrawerCloseButton color="secondary.900" />
                    <DrawerHeader
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDir="column"
                        mb={6}
                    >
                        <Image
                            src={'/Bruiloft buddy logo.png'}
                            width={200}
                            height={100}
                            objectFit={'contain'}
                            alt="Bruiloft Buddy logo"
                        />
                    </DrawerHeader>

                    <DrawerBody color="secondary.900">
                        {navigationData?.map((link, index) => {
                            const nestedLinks = link?.nestedLinks?.links;
                            const hasNestedLinks =
                                nestedLinks && nestedLinks?.length > 0;
                            const labelIsLink = Boolean(
                                link?.nestedLinks?.label?.url
                            );

                            if (hasNestedLinks)
                                if (nestedLinks)
                                    return (
                                        <AccordionWithNestedLinks
                                            title={
                                                link?.nestedLinks?.label
                                                    ?.label || ''
                                            }
                                            icon={BiChevronRight}
                                            key={`${link?.link?.label}-${index}`}
                                        >
                                            {labelIsLink && (
                                                <AccordionDirectLink
                                                    onClose={onClose}
                                                    key={index}
                                                    variant="link"
                                                    icon={BiChevronRight}
                                                    to={
                                                        link?.nestedLinks?.label
                                                            ?.url || '/'
                                                    }
                                                    textProps={{
                                                        fontSize: 'sm',
                                                    }}
                                                >
                                                    {truncateText(
                                                        link?.nestedLinks?.label
                                                            ?.label,
                                                        30
                                                    )}
                                                </AccordionDirectLink>
                                            )}
                                            {nestedLinks?.map((link, index) => (
                                                <AccordionDirectLink
                                                    onClose={onClose}
                                                    key={index}
                                                    variant="link"
                                                    icon={BiChevronRight}
                                                    to={link?.url}
                                                    textProps={{
                                                        fontSize: 'sm',
                                                    }}
                                                >
                                                    {truncateText(
                                                        link?.label,
                                                        30
                                                    )}
                                                </AccordionDirectLink>
                                            ))}
                                        </AccordionWithNestedLinks>
                                    );
                            return (
                                <AccordionDirectLink
                                    onClose={onClose}
                                    key={`${link?.link?.label}-${index}`}
                                    variant="link"
                                    icon={BiChevronRight}
                                    to={link?.link?.url}
                                >
                                    {link?.link?.label}
                                </AccordionDirectLink>
                            );
                        })}
                        <SmartLoginButton
                            mt={4}
                            loggedInButtonProps={{ w: 'full' }}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Center>
    );
};

export default MobileMenuDrawer;

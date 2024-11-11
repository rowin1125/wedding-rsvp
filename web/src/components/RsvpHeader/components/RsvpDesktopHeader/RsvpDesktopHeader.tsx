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
    useDisclosure,
} from '@chakra-ui/react';
import { JSONContent } from '@tiptap/react';
import { SlMenu } from 'react-icons/sl';

import { useLocation, useParams } from '@redwoodjs/router';

import Loader from 'src/components/Loader';
import Tiptap from 'src/components/PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';
import { useGetWeddingRsvpLandingPage } from 'src/pages/RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPage';

import { useWeddingRsvpLandingPageLinks } from '../../hooks/useWeddingRsvpLandingPageLinks';
import { handleLinkClick } from '../RsvpMobileMenuDrawer/RsvpMobileMenuDrawer';

const RsvpDesktopHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { weddingId, landingPageId } = useParams();

    const btnRef = React.useRef(null);
    const { pathname } = useLocation();

    const { contentLinks } = useWeddingRsvpLandingPageLinks();
    const { weddingRsvpLandingPage, loading } = useGetWeddingRsvpLandingPage();

    const sidebarData = weddingRsvpLandingPage?.sidebarData as JSONContent;
    const hasContent =
        sidebarData?.content && sidebarData.content?.[0].content?.length;

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
                {!contentLinks?.length && (
                    <Image
                        src={'/Bruiloft buddy logo.png'}
                        w={{
                            base: 14,
                        }}
                        objectPosition={'center'}
                        objectFit={'contain'}
                    />
                )}
                {contentLinks?.map((link) => (
                    <Link
                        onClick={() =>
                            handleLinkClick(
                                link?.id,
                                weddingId,
                                pathname,
                                landingPageId
                            )
                        }
                        key={link?.label}
                        mx={4}
                    >
                        <Heading fontSize="lg">{link?.label}</Heading>
                    </Link>
                ))}
            </Flex>
            <Box>
                {hasContent && (
                    <Button
                        ref={btnRef}
                        variant="ghost"
                        colorScheme="primary"
                        onClick={onOpen}
                    >
                        <Icon
                            as={SlMenu}
                            color="secondary.900"
                            fontSize="2xl"
                        />
                    </Button>
                )}
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    size="md"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent bg="white">
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
                        </DrawerHeader>
                        <DrawerBody>
                            {loading && <Loader />}
                            {sidebarData && (
                                <Tiptap
                                    content={sidebarData}
                                    editorConfig={{
                                        editable: false,
                                    }}
                                />
                            )}
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

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
    Heading,
    Icon,
    Image,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { JSONContent } from '@tiptap/react';
import { SlMenu } from 'react-icons/sl';

import { navigate, routes, useLocation, useParams } from '@redwoodjs/router';

import Loader from 'src/components/Loader';
import Tiptap from 'src/components/PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';
import { useGetWeddingRsvpLandingPage } from 'src/pages/RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPage';

import { useWeddingRsvpLandingPageLinks } from '../../hooks/useWeddingRsvpLandingPageLinks';

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
    pathname: string,
    landingPageId: string,
    callBack?: () => void
) => {
    const element = document.getElementById(link);

    if (!pathname.includes('bruiloft')) {
        if (!landingPageId) return;

        navigate(routes.weddingRsvpLandingPage({ weddingId, landingPageId }));
        await waitFor(1000);
        handleLinkClick(link, weddingId, pathname, landingPageId, callBack);
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
    const { landingPageId } = useParams();
    const btnRef = React.useRef(null);
    const { pathname } = useLocation();
    const { contentLinks } = useWeddingRsvpLandingPageLinks();
    const { weddingRsvpLandingPage, loading } = useGetWeddingRsvpLandingPage();

    const content = weddingRsvpLandingPage?.sidebarData as JSONContent;

    const { weddingId } = useParams();

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
                            {contentLinks?.map((link, index) => (
                                <Box key={`${link}-${index}`} w={'full'}>
                                    <Button
                                        onClick={() =>
                                            handleLinkClick(
                                                link?.id,
                                                weddingId,
                                                pathname,
                                                landingPageId,
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
                                            - {link?.label.replace('#', '')}
                                        </Heading>
                                    </Button>
                                </Box>
                            ))}

                            <Box mt={4}>
                                {loading && <Loader />}
                                {content && (
                                    <Tiptap
                                        content={content}
                                        editorConfig={{
                                            editable: false,
                                        }}
                                        editorContentProps={{
                                            style: {
                                                padding: '8px 0px',
                                            },
                                        }}
                                    />
                                )}
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Center>
        </>
    );
};

export default RsvpMobileMenuDrawer;

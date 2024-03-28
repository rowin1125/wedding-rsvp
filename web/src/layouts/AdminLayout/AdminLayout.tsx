import { useEffect } from 'react';

import { Box, Flex, Heading, Image } from '@chakra-ui/react';

import { navigate, routes, useLocation } from '@redwoodjs/router';
import { Toaster, toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import Footer from 'src/components/Footer/Footer';
import FooterMenu from 'src/components/FooterMenu/FooterMenu';
import Sidebar from 'src/components/Sidebar/Sidebar';
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

import heroImage from '../../components/Hero/images/Screenshot from 2023-08-25 17-41-23.png';

type AdminLayoutProps = {
    children?: React.ReactNode;
};

const unSlugify = (slug: string) => {
    return slug.replace(/-/g, ' ');
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { currentUser, loading } = useAuth();
    const { pathname } = useLocation();

    const segmentedPathname = pathname.split('/');
    const pageTitle = unSlugify(
        segmentedPathname[segmentedPathname.length - 1]
    );

    const isSettingsPage = pathname === routes.weddingSettings();

    useEffect(() => {
        if (!currentUser) return;
        if (loading || isSettingsPage || currentUser?.weddingId) return;

        navigate(routes.weddingSettings());
        toast.error('Je hebt nog geen bruiloft aangemaakt');
    }, [currentUser, loading, pathname, isSettingsPage]);

    return (
        <Box>
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <Box as="main">
                <Box
                    h="400px"
                    bg="primary.500"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    zIndex={-1}
                >
                    <Image
                        src={heroImage}
                        w="full"
                        h="full"
                        objectFit="cover"
                        filter="brightness(0.5)"
                    />
                    <Flex
                        inset={0}
                        position="absolute"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Heading color="white" fontSize="6xl">
                            {capitalizeText(pageTitle)}
                        </Heading>
                    </Flex>
                </Box>
                <Flex
                    justifyContent="space-between"
                    mx={{ base: 4, xl: 0 }}
                    pr={{ base: 0, xl: 4 }}
                    position="relative"
                >
                    <Box position="relative">
                        <Sidebar />
                    </Box>
                    <Flex flexDir="column" w="full" pt={8} mb={10}>
                        <Box
                            pt="400px"
                            as="main"
                            pl={{ xl: 8 }}
                            px={{ xl: 8 }}
                            pr={{ xl: 0 }}
                        >
                            {children}
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <Footer backgroundColor="#F1E7DB" />
            <FooterMenu />
        </Box>
    );
};

export default AdminLayout;

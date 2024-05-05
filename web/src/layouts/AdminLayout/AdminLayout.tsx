import { useEffect } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { navigate, routes, useLocation } from '@redwoodjs/router';
import { Toaster, toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import Footer from 'src/components/Footer/Footer';
import FooterMenu from 'src/components/FooterMenu/FooterMenu';
import Sidebar from 'src/components/Sidebar/Sidebar';

import SamsungAlert from './components/SamsungAlert';

type AdminLayoutProps = {
    children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { currentUser, loading } = useAuth();
    const { pathname } = useLocation();

    const isSettingsPage = pathname === routes.weddingSettings();

    useEffect(() => {
        if (!currentUser) return;
        if (loading || isSettingsPage || currentUser?.weddingId) return;

        navigate(routes.weddingSettings());
        toast.error('Je hebt nog geen bruiloft aangemaakt');
    }, [currentUser, loading, pathname, isSettingsPage]);

    return (
        <Box>
            <SamsungAlert />
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <Box as="main">
                <Flex justifyContent="space-between" position="relative">
                    <Box position="relative">
                        <Sidebar />
                    </Box>
                    <Flex flexDir="column" w="full" mb={10}>
                        {children}
                    </Flex>
                </Flex>
            </Box>
            <Footer backgroundColor="#F1E7DB" />
            <FooterMenu />
        </Box>
    );
};

export default AdminLayout;

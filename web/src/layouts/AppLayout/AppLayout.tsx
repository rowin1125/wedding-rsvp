import { useEffect } from 'react';

import { Box, Flex, useToast } from '@chakra-ui/react';

import { navigate, routes, useLocation } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import Footer from 'src/components/Footer/Footer';
import FooterMenu from 'src/components/FooterMenu/FooterMenu';
import Sidebar from 'src/components/Sidebar/Sidebar';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Sentry from 'src/lib/sentry';

import SamsungAlert from './components/SamsungAlert';

type AppLayoutProps = {
    children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    const { currentUser, loading } = useAuth();
    const { pathname } = useLocation();
    const toast = useToast();
    const [navOpen, toggleNav] = useLocalStorage('navOpen', true);

    const isOnboardingPage = pathname === routes.onboarding();

    useEffect(() => Sentry.setUser(currentUser), [currentUser]);

    useEffect(() => {
        if (
            !currentUser ||
            loading ||
            isOnboardingPage ||
            currentUser?.weddingId
        )
            return;

        navigate(routes.onboarding());
        toast({
            title: 'Je hebt nog geen bruiloft aangemaakt',
            status: 'error',
        });
    }, [currentUser, loading, pathname, isOnboardingPage, toast]);

    return (
        <Box>
            <SamsungAlert />
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <Box as="main">
                <Flex justifyContent="space-between" position="relative">
                    <Box position="relative">
                        <Sidebar navOpen={navOpen} toggleNav={toggleNav} />
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

export default AppLayout;

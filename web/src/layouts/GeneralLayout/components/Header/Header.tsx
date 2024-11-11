import { Box, Container, Flex } from '@chakra-ui/react';

import { useLocation, useParams } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import RsvpHeader from 'src/components/RsvpHeader';
import { useIsDevice } from 'src/hooks/useIsDevice';

import DesktopHeader from './components/DesktopHeader';
import MobileMenuDrawer from './components/MobileMenuDrawer';
import { useNavigationAnimation } from './hooks/useNavigationAnimation';

type HeaderProps = {
    navOpen: boolean;
};

const Header = ({ navOpen }: HeaderProps) => {
    const { isDesktop } = useIsDevice();
    const { pathname } = useLocation();
    const { weddingId } = useParams();
    const { currentUser, loading } = useAuth();

    const isInvitationRoute =
        pathname.includes(`/bruiloft/${weddingId}/rsvp`) ||
        pathname.includes(`/studio`);
    const headerNeedsSidebarAdjustment =
        currentUser?.weddingId === weddingId &&
        !!currentUser?.weddingId &&
        !loading &&
        isInvitationRoute;

    const { navBarRef, navigationListRef, mobileNavbarRef } =
        useNavigationAnimation({
            disableBackgroundTransition: isInvitationRoute,
        });

    return (
        <Box
            ml={
                headerNeedsSidebarAdjustment
                    ? navOpen
                        ? { lg: '197px' }
                        : { lg: '88px' }
                    : undefined
            }
            w={
                headerNeedsSidebarAdjustment
                    ? navOpen
                        ? { base: 'full', lg: 'calc(100% - 197px)' }
                        : { base: 'full', lg: 'calc(100% - 88px)' }
                    : '100%'
            }
            ref={navBarRef}
            bg={isInvitationRoute ? 'body.50' : 'transparent'}
            position="fixed"
            transition="background-color 0.2s ease"
            zIndex={11}
            as="header"
            color={isInvitationRoute ? 'secondary.900' : 'white'}
        >
            <Container position="relative" zIndex={3}>
                <Flex
                    py={isDesktop ? 0 : 2}
                    gap={4}
                    justifyContent={{ base: 'center', lg: 'space-between' }}
                    color="inherit"
                    h="full"
                >
                    <MobileMenuDrawer mobileNavbarRef={mobileNavbarRef} />
                    <DesktopHeader navigationListRef={navigationListRef} />
                </Flex>
            </Container>
            {isInvitationRoute && (
                <Flex w="full">
                    <RsvpHeader />
                </Flex>
            )}
        </Box>
    );
};

export default Header;

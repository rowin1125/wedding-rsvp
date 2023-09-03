import { Box, Container, Flex } from '@chakra-ui/react';

import { useIsDevice } from 'src/hooks/useIsDevice';

import DesktopHeader from './components/DesktopHeader';
import MobileMenuDrawer from './components/MobileMenuDrawer/MobileMenuDrawer';

const Header = () => {
    const { isDesktop } = useIsDevice();

    return (
        <Box
            backgroundColor="#F1E7DB"
            position={{ base: 'sticky', lg: 'relative' }}
            top={0}
            zIndex={10}
            boxShadow="md"
        >
            <Container position="relative">
                <Flex
                    py={isDesktop ? 4 : 2}
                    gap={4}
                    justifyContent={{ base: 'center', lg: 'space-between' }}
                >
                    <MobileMenuDrawer />
                    <DesktopHeader />
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;

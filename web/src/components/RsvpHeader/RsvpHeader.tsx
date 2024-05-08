import { Box, Container, Flex } from '@chakra-ui/react';

import { useIsDevice } from 'src/hooks/useIsDevice';

import RsvpDesktopHeader from './components/RsvpDesktopHeader';
import RsvpMobileMenuDrawer from './components/RsvpMobileMenuDrawer';

const RsvpHeader = () => {
    const { isDesktop } = useIsDevice();

    return (
        <Box backgroundColor="primary.50" w="full" shadow="md">
            <Container position="relative">
                <Flex
                    py={isDesktop ? 2 : 2}
                    gap={4}
                    justifyContent={{ base: 'center', lg: 'space-between' }}
                >
                    <RsvpMobileMenuDrawer />
                    <RsvpDesktopHeader />
                </Flex>
            </Container>
        </Box>
    );
};

export default RsvpHeader;

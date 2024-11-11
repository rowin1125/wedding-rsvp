import { Box, Flex } from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import ClientOnlyWrapper from 'src/components/ClientOnlyWrapper';
import Footer from 'src/components/Footer/Footer';
import FooterMenu from 'src/components/FooterMenu/FooterMenu';
import Sidebar from 'src/components/Sidebar/Sidebar';
import useLocalStorage from 'src/hooks/useLocalStorage';

import Header from './components/Header';

type GeneralLayoutProps = {
    children?: React.ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
    const { loading, currentUser } = useAuth();
    const { weddingId } = useParams();
    const [navOpen, toggleNav] = useLocalStorage('navOpen', true);

    const isConnectedToWedding =
        currentUser?.weddingId === weddingId && !!weddingId && !loading;

    return (
        <Box>
            <ClientOnlyWrapper>
                <Header navOpen={navOpen} />
            </ClientOnlyWrapper>
            <Flex
                justifyContent="space-between"
                mx={{ base: 0, xl: 0 }}
                position="relative"
            >
                {isConnectedToWedding && (
                    <Box position="relative">
                        <Sidebar navOpen={navOpen} toggleNav={toggleNav} />
                    </Box>
                )}
                <Flex flexDir="column" w="full" mb={10}>
                    <Box>{children}</Box>
                </Flex>
            </Flex>
            <Footer backgroundColor="#F1E7DB" />
            {isConnectedToWedding && <FooterMenu />}
        </Box>
    );
};

export default GeneralLayout;

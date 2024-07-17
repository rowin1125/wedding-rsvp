import { Box } from '@chakra-ui/react';

import { useParams } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import ClientOnlyWrapper from 'src/components/ClientOnlyWrapper';
import Footer from 'src/components/Footer/Footer';
import FooterMenu from 'src/components/FooterMenu/FooterMenu';

import Header from './components/Header';

type GeneralLayoutProps = {
    children?: React.ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
    const { loading, currentUser } = useAuth();
    const { weddingId } = useParams();

    const isConnectedToWedding =
        currentUser?.weddingId === weddingId && !loading;

    return (
        <Box>
            <ClientOnlyWrapper>
                <Header />
            </ClientOnlyWrapper>
            <Box>{children}</Box>
            <Footer backgroundColor="#F1E7DB" />
            {isConnectedToWedding && <FooterMenu />}
        </Box>
    );
};

export default GeneralLayout;

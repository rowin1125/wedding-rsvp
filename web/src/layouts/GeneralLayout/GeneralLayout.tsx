import { Box } from '@chakra-ui/react';

import { Toaster } from '@redwoodjs/web/dist/toast';

import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';

type GeneralLayoutProps = {
    children?: React.ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
    return (
        <Box>
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <Header />
            <Box as="main">{children}</Box>
            <Footer />
        </Box>
    );
};

export default GeneralLayout;

import { Box } from '@chakra-ui/react';

import Footer from 'src/components/Footer';

type AuthLayoutProps = {
    children?: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <>
            <Box as="main" pb={{ base: 10, lg: 0 }} bg="primary.500">
                {children}
            </Box>
            <Footer
                position="fixed"
                zIndex={1}
                bottom={0}
                w="full"
                color={{
                    base: 'secondary.900',
                    xl: 'white',
                }}
            />
        </>
    );
};

export default AuthLayout;

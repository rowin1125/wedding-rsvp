import { Box, Flex, Grid, GridItem, Heading, Image } from '@chakra-ui/react';

import { navigate, routes, useLocation } from '@redwoodjs/router';
import { Toaster, toast } from '@redwoodjs/web/dist/toast';

import Footer from 'src/components/Footer/Footer';
import FooterMenu from 'src/components/FooterMenu/FooterMenu';
import Sidebar from 'src/components/Sidebar/Sidebar';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';

import heroImage from '../../components/Hero/images/Screenshot from 2023-08-25 17-41-23.png';

type AdminLayoutProps = {
    children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { pathname } = useLocation();
    const unSlugify = (slug: string) => {
        return slug.replace(/-/g, ' ');
    };
    const segmentedPathname = pathname.split('/');
    const pageTitle = unSlugify(
        segmentedPathname[segmentedPathname.length - 1]
    );
    const capitalize = (s: string) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const { wedding, loading, networkStatus } = useGetWeddingById();

    const isSettingsPage = pathname === routes.weddingSettings();
    const isFetched = networkStatus === 7;

    if (isFetched && !loading && !isSettingsPage && !wedding?.id) {
        navigate(routes.weddingSettings());
        toast.error('Je hebt nog geen bruiloft aangemaakt');
    }

    return (
        <Box>
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            <Box as="main">
                <Grid templateColumns="repeat(12, 1fr)" gap={4} rowGap={0}>
                    <GridItem colSpan={12} position="relative">
                        <Image
                            src={heroImage}
                            w="full"
                            h="300px"
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
                                {capitalize(pageTitle)}
                            </Heading>
                        </Flex>
                    </GridItem>
                    <GridItem
                        colSpan={3}
                        display={{ base: 'none', lg: 'block' }}
                    >
                        <Sidebar />
                    </GridItem>
                    <GridItem
                        colSpan={{ base: 12, lg: 9 }}
                        p={{ base: 4, lg: 10 }}
                    >
                        {children}
                    </GridItem>
                </Grid>
            </Box>
            <Footer />
            <FooterMenu />
        </Box>
    );
};

export default AdminLayout;

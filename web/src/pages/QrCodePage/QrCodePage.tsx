import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';

import { Link, navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import Loader from 'src/components/Loader';

import { useScanQrCode } from './hooks/useScanQrCode';

const QrCodePage = () => {
    const { qrCode, loading } = useScanQrCode();

    if (loading)
        return (
            <>
                <Metadata title="QrCode" description="QrCode page" />
                <Loader />
            </>
        );

    if (qrCode && !loading) {
        const isAppUrl = qrCode.redirectUrl.includes(
            process.env.REDWOOD_ENV_VERCEL_URL
        );

        if (isAppUrl) {
            navigate(
                qrCode.redirectUrl.replace(
                    process.env.REDWOOD_ENV_VERCEL_URL,
                    ''
                ),
                { replace: true }
            );
        }

        window.location.href = qrCode.redirectUrl;
        return null;
    }

    return (
        <>
            <Metadata title="QrCode" description="QrCode page" />
            <Box>
                <Heading as="h1" textAlign="center" mt={10}>
                    QR Code niet gevonden
                </Heading>
                <Flex
                    justifyContent="center"
                    mt={10}
                    flexDir="column"
                    alignItems="center"
                >
                    <Button as={Link} to={routes.home()}>
                        Ga terug naar home
                    </Button>
                    <Image
                        src="https://images.prismic.io/derow-v1/ZjYzo0MTzAJOCiCe_qr-code-cartoon-illustration-with-crying-gesture-vector-removebg-preview.png?auto=format,compress"
                        alt="QrCode"
                        w="50%"
                        h="50%"
                    />
                </Flex>
            </Box>
        </>
    );
};

export default QrCodePage;

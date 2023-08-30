import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box backgroundColor="tertairy.500">
            <Container maxW="8xl" p={4}>
                <Flex gap={8} justifyContent={'center'}>
                    <Text color="black" fontSize="sm" fontWeight="semibold">
                        ©️ Ontwikkeld door{' '}
                        <Link
                            color="info.500"
                            as={Link}
                            href="https://derow.nl"
                            textDecor="underline"
                            target="_blank"
                            fontSize="inherit"
                        >
                            Derow
                        </Link>
                    </Text>
                </Flex>
            </Container>
        </Box>
    );
};

export default Footer;

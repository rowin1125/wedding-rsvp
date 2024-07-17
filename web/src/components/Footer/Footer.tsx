import {
    Box,
    BoxProps,
    Container,
    Flex,
    Icon,
    Link,
    Text,
} from '@chakra-ui/react';
import { CgCopyright } from 'react-icons/cg';

const Footer = ({ ...rest }: BoxProps) => {
    return (
        <Box {...rest}>
            <Container p={4}>
                <Flex justifyContent={'center'} alignItems="center">
                    <Icon as={CgCopyright} color="inherit" fontSize="24px" />{' '}
                    <Text color="inherit" fontSize="sm" fontWeight="semibold">
                        {new Date().getFullYear()}, Ontwikkeld door{' '}
                        <Link
                            color="inherit"
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

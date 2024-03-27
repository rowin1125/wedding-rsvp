import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react';

import { routes } from '@redwoodjs/router';

import RedwoodLink from '../RedwoodLink';

type AuthScreenProps = {
    title: string;
    description: string;
    imageSrc: string;
    children?: React.ReactNode;
};

const AuthScreen = ({
    imageSrc,
    children,
    title,
    description,
}: AuthScreenProps) => {
    return (
        <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            bg="primary.500"
            position="relative"
        >
            <RedwoodLink
                position="absolute"
                left={4}
                top={4}
                zIndex={2}
                to={routes.home()}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Flex alignItems="center">
                    <Image src="./Bruiloft buddy logo.png" h="70px" />
                    <Text
                        ml={4}
                        color="white"
                        fontWeight="semibold"
                        fontSize={{
                            base: '2xl',
                            xl: '3xl',
                        }}
                    >
                        Bruiloft Buddy
                    </Text>
                </Flex>
            </RedwoodLink>
            <GridItem colSpan={{ base: 12, xl: 8 }} position="relative">
                <Box position="relative" minH={{ base: '300px', xl: '100vh' }}>
                    <Box
                        h="100%"
                        bg="primary.500"
                        position={{ base: 'relative', xl: 'absolute' }}
                        top={0}
                        left={0}
                        right={0}
                        zIndex="0"
                    >
                        <Image
                            filter="auto"
                            blur="1px"
                            brightness="0.8"
                            src={imageSrc}
                            objectFit="cover"
                            w="full"
                            h="full"
                        />
                    </Box>
                    <Flex
                        position="absolute"
                        inset={0}
                        zIndex={1}
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <Box
                            maxW={{
                                base: '400px',
                                xl: '600px',
                            }}
                            w="full"
                            p={{ base: 4, xl: 0 }}
                            textAlign="center"
                        >
                            <Heading
                                as="h2"
                                fontSize={{ base: '5xl', xl: '8xl' }}
                                color="white"
                                fontWeight="bold"
                            >
                                {title}
                            </Heading>
                            <Text
                                color={'white'}
                                fontSize={{ base: 'md', xl: '2xl' }}
                            >
                                {description}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </GridItem>
            <GridItem
                colSpan={{ base: 12, xl: 4 }}
                position="relative"
                minH={{
                    base: 'calc(100vh - 300px)',
                    xl: 'auto',
                }}
            >
                <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    h="full"
                >
                    <Box maxW="400px" w="full" p={{ base: 4, xl: 0 }}>
                        {children}
                    </Box>
                </Flex>
            </GridItem>
        </Grid>
    );
};

export default AuthScreen;

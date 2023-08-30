import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Link,
    Text,
} from '@chakra-ui/react';

import banner from '../Banner/images/banner.jpg';

import angelique from './images/angelique.jpg';
import cheyenne from './images/cheyenne.jpg';
import rajco from './images/rajco.jpg';
import remco from './images/remco.jpg';
import tirza from './images/tirza.jpg';
import xander from './images/xander.jpg';

const Mvps = () => {
    const mvps = [
        {
            type: 'Getuige',
            name: 'Angelique Greuter',
            image: angelique,
        },
        {
            type: 'Getuige',
            name: 'Cheyenne de Vink',
            image: cheyenne,
        },
        {
            type: 'Getuige',
            name: 'Remco Mol',
            image: remco,
            objectPosition: '70%',
        },
        {
            type: 'Getuige',
            name: 'Rajco Mol',
            image: rajco,
            objectPosition: 'left',
        },
        {
            type: 'Ceremoniemeester',
            name: 'Xander Greuter',
            image: xander,
            objectPosition: 'right',
        },
        {
            type: 'Ceremoniemeester',
            name: 'Tirza Voss',
            image: tirza,
        },
    ];

    return (
        <Box
            mt={{ base: 10, lg: 20 }}
            py={{ base: 10, lg: 20 }}
            bgImage={`url(${banner})`}
            bgRepeat="repeat-x reapet-y"
            id="mvp"
        >
            <Container>
                <Grid gridTemplateColumns="repeat(6, 1fr)" gap={4}>
                    <GridItem colSpan={6} textAlign="center" mb={4}>
                        <Heading
                            textTransform="uppercase"
                            fontSize="lg"
                            fontFamily="Butler"
                        >
                            Maak kennis met onze:
                        </Heading>
                        <Heading fontSize={{ base: '3xl', lg: '5xl' }}>
                            Getuigen & ceremoniemeesters
                        </Heading>
                    </GridItem>
                    {mvps.map((mvp) => (
                        <GridItem
                            colSpan={{ base: 6, lg: 2 }}
                            key={mvp.name}
                            position="relative"
                            display={'flex'}
                            overflow="hidden"
                        >
                            <Box
                                style={{
                                    textOrientation: 'mixed',
                                    writingMode: 'vertical-lr',
                                    transform: 'rotate(180deg)',
                                    whiteSpace: 'nowrap',
                                }}
                                textAlign="center"
                                p={2}
                            >
                                <Flex
                                    alignItems="center"
                                    justifyContent="flex-start"
                                >
                                    <Heading fontSize="3xl" mb={4}>
                                        {mvp.name}
                                    </Heading>
                                    <Heading
                                        fontSize="sm"
                                        textTransform="uppercase"
                                    >
                                        {mvp.type}
                                    </Heading>
                                </Flex>
                            </Box>
                            <Image
                                w="full"
                                h={{
                                    base: '400px',
                                    lg: '400px',
                                }}
                                src={mvp.image}
                                objectFit="cover"
                                objectPosition={mvp.objectPosition ?? 'center'}
                            />
                        </GridItem>
                    ))}
                </Grid>
                <Box
                    textAlign="center"
                    maxW={{ base: 'unset', lg: '800px' }}
                    mx="auto"
                >
                    <Heading mt={20} fontSize={{ base: '3xl', lg: '5xl' }}>
                        Ceremoniemeesters
                    </Heading>
                    <Text mb={4}>
                        Tirza Voss en Xander Greuter zijn onze helden van deze
                        dag, onze ceremoniemeesters.
                    </Text>
                    <Text mb={2}>
                        Wil je iets vragen of doorgeven? Ze zijn te bereiken op:
                    </Text>
                    <Text>
                        <Box fontWeight="semibold" as="span">
                            Tirza Voss:
                        </Box>{' '}
                        <Link href="tel:+31654308330">+31654308330</Link> <br />{' '}
                    </Text>
                    <Text mb={4}>
                        <Box fontWeight="semibold" as="span">
                            Xander Greuter:
                        </Box>{' '}
                        <Link href="tel:+31638190312">+31638190312</Link>
                    </Text>
                    <Text>
                        Mocht je ons willen verrassen met een dansje, slechte
                        grap of lieve woorden? Bespreek dit dan met onze
                        ceremoniemeesters. Zij weten wat wij wel of niet willen
                        op onze dag.
                    </Text>
                </Box>
            </Container>
        </Box>
    );
};

export default Mvps;

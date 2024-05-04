import { Fragment } from 'react';

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

const Mvps = () => {
    const mvps = [
        {
            type: 'Getuige',
            name: 'Angelique Greuter',
            image: 'https://images.prismic.io/derow-v1/ZjZtGkMTzAJOCiHM_angelique.jpg?auto=format,compress',
        },
        {
            type: 'Getuige',
            name: 'Cheyenne de Vink',
            image: 'https://images.prismic.io/derow-v1/ZjZtG0MTzAJOCiHN_cheyenne.jpg?auto=format,compress',
            objectPosition: 'center 20%',
        },
        {
            type: 'Getuige',
            name: 'Remco Mol',
            image: 'https://images.prismic.io/derow-v1/ZjZtHUMTzAJOCiHP_remco.jpg?auto=format,compress',
            objectPosition: '70%',
        },
        {
            type: 'Getuige',
            name: 'Rajco Mol',
            image: 'https://images.prismic.io/derow-v1/ZjZtHEMTzAJOCiHO_rajco.jpg?auto=format,compress',
            objectPosition: 'left',
        },
        {
            type: 'Ceremoniemeester',
            name: 'Xander Greuter',
            image: 'https://images.prismic.io/derow-v1/ZjZtH0MTzAJOCiHR_xander.jpg?auto=format,compress',
            objectPosition: 'right',
        },
        {
            type: 'Ceremoniemeester',
            name: 'Tirza Voss',
            image: 'https://images.prismic.io/derow-v1/ZjZtHkMTzAJOCiHQ_tirza.jpg?auto=format,compress',
        },
    ];

    return (
        <Box
            mt={{ base: 10, lg: 20 }}
            py={{ base: 10, lg: 20 }}
            bgImage={
                'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
            }
            bgRepeat="repeat-x reapet-y"
            id="mvp"
        >
            <Container>
                <Grid gridTemplateColumns="repeat(8, 1fr)" gap={4}>
                    <GridItem colSpan={8} textAlign="center" mb={4}>
                        <Heading
                            textTransform="uppercase"
                            fontSize="lg"
                            fontFamily="Butler"
                        >
                            Maak kennis met onze:
                        </Heading>
                        <Heading fontSize={{ base: '4xl', lg: '5xl' }}>
                            Getuigen{' '}
                        </Heading>
                    </GridItem>
                    {mvps.map((mvp, index) => {
                        return (
                            <Fragment key={mvp.name}>
                                {index === 4 && (
                                    <GridItem
                                        colSpan={8}
                                        textAlign="center"
                                        mb={4}
                                    >
                                        <Heading
                                            fontSize={{
                                                base: '4xl',
                                                lg: '5xl',
                                            }}
                                        >
                                            Ceremoniemeesters
                                        </Heading>
                                    </GridItem>
                                )}
                                <GridItem
                                    colSpan={{
                                        base: 4,
                                        lg:
                                            mvp.type === 'Ceremoniemeester'
                                                ? 4
                                                : 2,
                                    }}
                                    position="relative"
                                    overflow="hidden"
                                >
                                    <Flex
                                        justifyContent={
                                            index > 3 ? 'center' : 'unset'
                                        }
                                    >
                                        <Box
                                            style={{
                                                textOrientation: 'mixed',
                                                writingMode: 'vertical-lr',
                                                transform: 'rotate(180deg)',
                                                whiteSpace: 'nowrap',
                                            }}
                                            textAlign="center"
                                            p={{
                                                base: 4,
                                                lg: 2,
                                            }}
                                            pl={0}
                                        >
                                            <Flex
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Heading
                                                    fontSize="sm"
                                                    textTransform="uppercase"
                                                >
                                                    {mvp.type}
                                                </Heading>
                                            </Flex>
                                        </Box>
                                        <Image
                                            w={{
                                                base: '100%',
                                                lg:
                                                    mvp.type ===
                                                    'Ceremoniemeester'
                                                        ? '300px'
                                                        : '200%',
                                            }}
                                            h={{
                                                base: '200px',
                                                lg:
                                                    mvp.type ===
                                                    'Ceremoniemeester'
                                                        ? '300px'
                                                        : '200px',
                                            }}
                                            src={mvp.image}
                                            objectFit="cover"
                                            objectPosition={
                                                mvp?.objectPosition ?? 'center'
                                            }
                                            filter="grayscale(50%)"
                                        />
                                    </Flex>

                                    <Heading
                                        fontSize="3xl"
                                        mb={4}
                                        textAlign="center"
                                    >
                                        {mvp.name}
                                    </Heading>
                                </GridItem>
                            </Fragment>
                        );
                    })}
                </Grid>
                <Box
                    textAlign="center"
                    maxW={{ base: 'unset', lg: '800px' }}
                    mx="auto"
                >
                    <Heading
                        mt={{ base: 4, lg: 10 }}
                        fontSize={{ base: '3xl', lg: '5xl' }}
                    >
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

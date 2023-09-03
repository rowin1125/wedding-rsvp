import {
    Box,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react';

import aanzoek from '../Hero/images/Screenshot from 2023-08-25 17-41-23.png';

// import calendar from './images/4944549.png';
import infinityImage from './images/8.png';
import calendar from './images/89412-200.png';
import ring from './images/diamond-ring.png';
import like from './images/like.png';
import saveTheDate from './images/save-the-date.jpg';
import start from './images/start.jpg';

const StoryTimeline = () => {
    const items = [
        {
            image: start,
            heading: 'Onze ontmoeting',
            text: 'Het begon allemaal begin 2015. We kenden elkaar al een tijdje door het samenwerken bij Spurd, maar op die zekere dag, 5 februari 2015 wisten we het zeker: wij zijn verliefd. ',
            year: '2015',
            icon: like,
        },
        {
            image: aanzoek,
            heading: 'Het aanzoek',
            text: 'Begin 2023 was het moment dat onze droomreis naar Australië en Nieuw-Zeeland werkelijkheid werd. Daar, op die prachtige plek in Nieuw-Zeeland op 8 maart 2023 vroeg Rowin aan Demi: wil je met me trouwen? Ja! Was het antwoord.',
            year: '2023',
            icon: ring,
        },
        {
            image: saveTheDate,
            heading: 'Save the date',
            text: 'En op 16 mei 2024 willen wij onze trouwdag met jullie vieren! Een dag vol liefde, gezelligheid, lachen, lekker eten en feesten. Wij kijken er enorm naar uit. Scroll verder voor meer informatie.',
            year: '2024',
            icon: calendar,
        },
    ];
    return (
        <Box id="story">
            <Container pt={{ base: 10, lg: 20 }}>
                <Center flexDir="column" mb={8}>
                    <Heading fontFamily="butler" fontSize="md">
                        OUR STORY{' '}
                    </Heading>
                    <Heading fontSize="4xl">With love </Heading>
                </Center>
                {items.map((item, index) => {
                    const isTextFirst = index % 2 === 0;
                    const isLastItem = index === items.length - 1;

                    return (
                        <Grid
                            gridTemplateColumns="repeat(2, 1fr)"
                            key={item.text}
                            pl={{ base: 10, lg: 'unset' }}
                        >
                            <GridItem
                                colSpan={{ base: 2, lg: 1 }}
                                order={{ base: 1, lg: isTextFirst ? 1 : 2 }}
                                position="relative"
                                px={8}
                                pr={isTextFirst ? { base: 0, lg: 20 } : 'unset'}
                                pl={{
                                    base: 12,
                                    lg: isTextFirst ? 'unset' : 20,
                                }}
                                borderRightWidth={{
                                    base: 0,
                                    lg: isTextFirst ? 1 : 0,
                                }}
                                borderLeftWidth={{
                                    base: 1,
                                    lg: isTextFirst ? 0 : 1,
                                }}
                                borderColor="tertairy.500"
                            >
                                <Heading
                                    mb={0}
                                    fontSize={{ base: '12px', lg: '20px' }}
                                >
                                    {item.year}
                                </Heading>
                                <Heading mb={4}>{item.heading}</Heading>
                                <Text>{item.text}</Text>
                                <Flex
                                    position="absolute"
                                    right={{
                                        base: 'unset',
                                        lg: isTextFirst ? '-45px' : 'unset',
                                    }}
                                    left={{
                                        base: '-30px',
                                        lg: isTextFirst ? 'unset' : '-45px',
                                    }}
                                    top={0}
                                    bg="#F1E7DB"
                                    w={{ base: '60px', lg: '90px' }}
                                    h={{ base: '60px', lg: '90px' }}
                                    borderRadius="full"
                                    justifyContent="center"
                                    alignItems={'center'}
                                >
                                    <Image
                                        src={item.icon}
                                        w={{ base: '20px', lg: '40px' }}
                                        h={{ base: '20px', lg: '40px' }}
                                    />
                                </Flex>
                            </GridItem>
                            <GridItem
                                order={{ base: 2, lg: isTextFirst ? 2 : 1 }}
                                colSpan={{ base: 2, lg: 1 }}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                pl={isTextFirst ? { base: 0, lg: 10 } : 0}
                                pr={isTextFirst ? 0 : { base: 0, lg: 10 }}
                                borderLeftWidth={{ base: 1, lg: 0 }}
                                borderColor="#F1E7DB"
                                py={10}
                                position="relative"
                            >
                                <Image
                                    rounded="full"
                                    src={item.image}
                                    w={{ base: '200px', lg: '300px' }}
                                    h={{ base: '200px', lg: '300px' }}
                                    objectFit="cover"
                                    objectPosition="top"
                                />
                                {isLastItem && (
                                    <Flex
                                        position="absolute"
                                        right={{
                                            base: 'unset',
                                            lg: !isTextFirst
                                                ? '-45px'
                                                : 'unset',
                                        }}
                                        left={{
                                            base: '-30px',
                                            lg: !isTextFirst
                                                ? 'unset'
                                                : '-45px',
                                        }}
                                        bottom={0}
                                        bg="#F1E7DB"
                                        w={{ base: '60px', lg: '90px' }}
                                        h={{ base: '60px', lg: '90px' }}
                                        borderRadius="full"
                                        justifyContent="center"
                                        alignItems={'center'}
                                    >
                                        <Image
                                            src={infinityImage}
                                            w={{ base: '20px', lg: '40px' }}
                                            h={{ base: '20px', lg: '40px' }}
                                        />
                                    </Flex>
                                )}
                            </GridItem>
                        </Grid>
                    );
                })}
            </Container>
        </Box>
    );
};

export default StoryTimeline;

import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Link,
    Text,
} from '@chakra-ui/react';
import { BsEnvelopePaperHeart } from 'react-icons/bs';

import ImageTextBlock from '../ImageTextBlock';

const PartyInformation = () => {
    return (
        <>
            <Box
                bgImage={
                    'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
                }
            >
                <ImageTextBlock
                    title="Onze locatie"
                    image={
                        'https://images.prismic.io/derow-v1/ZjZrvEMTzAJOCiHF_locatie.png?auto=format,compress'
                    }
                >
                    <Heading display={{ base: 'none', lg: 'block' }}>
                        Onze locatie
                    </Heading>
                    <Text mb={4}>
                        In de buurt van Utrecht ligt Buitenplaats Amerongen. Met
                        een mooi landgoed, de kasteeltuinen, en historische
                        bijgebouwen, het koetshuis en het poortgebouw, voelde
                        het voor ons als een bijzondere locatie, de locatie waar
                        wij willen trouwen!
                    </Text>
                    <Text mb={4}>
                        <Box as="span" fontWeight="bold">
                            <Link
                                href="https://swijnenburg.com/locatie/buitenplaats-amerongen/"
                                isExternal
                            >
                                Buitenplaats Amerongen
                            </Link>
                        </Box>{' '}
                        <br />
                        Drostestraat 12, <br /> 3958 BK Amerongen
                    </Text>
                    <Heading mt={8} mb={4}>
                        Cadeautip
                    </Heading>
                    <Text mb={4}>
                        Wij zouden graag deze onvergetelijke dag afsluiten met
                        een mooie huwelijksreis. Mocht je ons een cadeau willen
                        geven, dan is een bijdrage aan onze huwelijksreis meer
                        dan welkom.
                    </Text>

                    <Flex justifyContent="center">
                        <Box
                            _hover={{
                                transform: 'scale(1.05)',
                            }}
                            isExternal
                            transition="all 0.2s ease-in-out"
                            as={Link}
                            href="https://giphy.com/gifs/baby-money-little-rascals-l0HFkA6omUyjVYqw8/fullscreen"
                            bg="body.500"
                            w="70px"
                            h="70px"
                            rounded="full"
                            display="flex"
                            justifyContent="center"
                            alignItems={'center'}
                        >
                            <Icon
                                as={BsEnvelopePaperHeart}
                                color="secondary.50"
                                fontSize="3xl"
                            />
                        </Box>
                    </Flex>
                </ImageTextBlock>
                <ImageTextBlock
                    title="Overnachting"
                    image={'https://shorturl.at/ipsxC'}
                    imageFirst
                >
                    <Heading display={{ base: 'none', lg: 'block' }}>
                        Overnachting
                    </Heading>
                    <Text mb={4}>
                        In de buurt zijn veel {"B&B's"}, hotels en
                        vakantieparken. Voor wie het wil, boek alvast een
                        heerlijke overnachting want wij beloven: er staan genoeg
                        drankjes klaar deze avond! En hoe fijn (en leuk) is het
                        dan als je niet naar huis hoeft te rijden. {"Taxi's"} en
                        OV zijn natuurlijk ook opties!
                    </Text>
                    <Text mb={4}>
                        Bij Van der Valk Veenendaal hebben wij een korting
                        kunnen regelen. Dit hotel ligt op +/- 15 minuten rijden
                        van de locatie. Boek via de onderstaande knop en gebruik
                        de kortingscode: <br />
                        <Box as="span" fontWeight="bold" mt={4}>
                            VEE-GF24322
                        </Box>
                    </Text>

                    <Alert status="info" mb={4}>
                        <AlertIcon />

                        <Text>
                            Deze korting is exclusief voor de optie kamer met
                            ontbijt & annulering
                        </Text>
                    </Alert>
                    <Button
                        colorScheme="body"
                        as={Link}
                        _hover={{
                            textDecoration: 'none',
                        }}
                        href="http://www.hotelveenendaal.com/acties?voucher=VEE-GF24322"
                        isExternal
                        mb={4}
                    >
                        Boek via de link
                    </Button>
                    <Text>
                        Of bekijk de mogelijkheden via{' '}
                        <Link
                            href="https://swijnenburg.com/trouwen/ontzorgen/overnachten/"
                            isExternal
                        >
                            deze
                        </Link>{' '}
                        link van Buitenplaats Amerongen
                    </Text>
                </ImageTextBlock>
            </Box>

            <ImageTextBlock
                title="Dresscode"
                image={
                    'https://images.prismic.io/derow-v1/ZjZrs0MTzAJOCiHE_colors.jpg?auto=format,compress'
                }
            >
                <Heading display={{ base: 'none', lg: 'block' }}>
                    Dresscode
                </Heading>
                <Text mb={4}>
                    {` Zoals de meeste van jullie weten is Demi gék op beige, beige
                    en nog is beige. Nou dat gaan we niet van jullie vragen
                    hoor! Natuurlijk moet je dragen wat voor jou prettig is,
                    maar als wij mee mogen denken over deze outfit zouden we het
                    leuk vinden als je iets uitzoekt in 'pastel chique'. Wat is
                    dat dan?`}
                </Text>
                <Text>
                    {`Nou gewoon iets moois wat je draagt naar een bruiloft in het kleurenpallet zoals hierboven. We zouden het kunnen waarderen als je niet in het zwart, wit of rood komt.`}
                </Text>
                <Text mt={4}>
                    Heb je inspiratie nodig, bekijk dan hier voorbeelden:
                </Text>

                <Flex flexDir={{ base: 'column', lg: 'row' }} mt={4}>
                    <Button
                        href={
                            'https://www.google.com/search?q=pastelkleuren+bruiloft+kleding+vrouwen&tbm=isch&ved=2ahUKEwjz_4PkgIWBAxW5h_0HHUdaAlgQ2-cCegQIABAA&oq=pastelkleuren+bruiloft+kleding+vrouwen&gs_lcp=CgNpbWcQAzoGCAAQCBAeUNkBWPcVYIwXaAJwAHgAgAGiAYgBpQuSAQQwLjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=i4nvZLOOD7mP9u8Px7SJwAU&bih=972&biw=1400'
                        }
                        isExternal
                        as={Link}
                        mb={{ base: 4, lg: 0 }}
                        mr={{ base: 0, lg: 4 }}
                        _hover={{
                            textDecoration: 'none',
                        }}
                        w="full"
                        colorScheme="body"
                    >
                        Vrouwen
                    </Button>
                    <Button
                        href={
                            'https://www.google.com/search?q=pastelkleuren+bruiloft+kleding+mannen&tbm=isch&ved=2ahUKEwjD-ZabgYWBAxWwi_0HHYmhDcUQ2-cCegQIABAA&oq=pastelkleuren+bruiloft+kleding+mannen&gs_lcp=CgNpbWcQA1DZBViXCmDYC2gAcAB4AIABlAGIAe8HkgEDMC43mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=_onvZMOCN7CX9u8PicO2qAw&bih=972&biw=1400'
                        }
                        as={Link}
                        isExternal
                        _hover={{
                            textDecoration: 'none',
                        }}
                        colorScheme="body"
                        w="full"
                    >
                        Mannen
                    </Button>
                </Flex>
            </ImageTextBlock>
        </>
    );
};

export default PartyInformation;

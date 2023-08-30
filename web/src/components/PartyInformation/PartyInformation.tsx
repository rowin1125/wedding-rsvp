import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';

import ImageTextBlock from '../ImageTextBlock';

import colors from './images/colors.png';
import locatie from './images/locatie.webp';

const PartyInformation = () => {
    return (
        <>
            <ImageTextBlock image={locatie}>
                <Heading>Onze locatie</Heading>
                <Text mb={4}>
                    In de buurt van Utrecht ligt Buitenplaats Amerongen. Met een
                    mooi landgoed, de kasteeltuinen, en historische bijgebouwen,
                    het koetshuis en het poortgebouw, voelde het voor ons als
                    een bijzondere locatie, de locatie waar wij willen trouwen!
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
                <Text mb={4}>
                    In de buurt zijn veel {"B&B's"}, hotels en vakantieparken.
                    Voor wie het wil, boek alvast een heerlijke overnachting
                    want wij beloven: er staan genoeg drankjes klaar deze avond!
                    En hoe fijn (en leuk) is het dan als je niet naar huis hoeft
                    te rijden. {"Taxi's"} en OV zijn natuurlijk ook opties!
                </Text>
            </ImageTextBlock>
            <ImageTextBlock image={colors} imageFirst>
                <Heading>Dresscode</Heading>
                <Text mb={4}>
                    {` Zoals de meeste van jullie weten is Demi gék op beige, beige
                    en nog is beige. Nou dat gaan we niet van jullie vragen
                    hoor! Natuurlijk moet je dragen wat voor jou prettig is,
                    maar als wij mee mogen denken over deze outfit zouden we het
                    leuk vinden als je iets uitzoekt in 'pastel chique'. Wat is
                    dat dan?`}
                </Text>
                <Text>
                    {`Nou gewoon iets moois wat je draagt naar een
                    bruiloft in het kleurenpallet zoals hieronder. Kleurenpallet
                    zoeken met pastelgroen, pastelgeel, pastelroze, lila,
                    pastelblauw, pastelroze, beige We zouden het kunnen
                    waarderen als je niet in het zwart of wit (of rood?) komt.`}
                </Text>
                <Text>
                    Heb je inspiratie nodig, bekijk dan hier voorbeelden:
                </Text>

                <Flex flexDir={{ base: 'column', lg: 'row' }} mt={4}>
                    <Button
                        href={
                            'https://www.google.com/search?q=pastelkleuren+bruiloft+kleding+vrouwen&tbm=isch&ved=2ahUKEwjz_4PkgIWBAxW5h_0HHUdaAlgQ2-cCegQIABAA&oq=pastelkleuren+bruiloft+kleding+vrouwen&gs_lcp=CgNpbWcQAzoGCAAQCBAeUNkBWPcVYIwXaAJwAHgAgAGiAYgBpQuSAQQwLjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=i4nvZLOOD7mP9u8Px7SJwAU&bih=972&biw=1400'
                        }
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

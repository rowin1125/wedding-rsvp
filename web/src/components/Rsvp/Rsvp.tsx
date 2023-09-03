import {
    Box,
    Button,
    Card,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Radio,
    Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { boolean, object, string } from 'yup';

import ControlledInput from '../forms/components/ControlledInput/ControlledInput';
import ControlledRadioGroup from '../forms/components/ControlledRadioGroup/ControlledRadioGroup';
import ControlledSelect from '../forms/components/ControlledSelect/ControlledSelect';
import ControlledTextarea from '../forms/components/ControlledTextarea/ControlledTextarea';

import rsvpBg from './images/banner.jpg';
import image1 from './images/image-1.jpg';
import image2 from './images/image-2.jpg';
import image3 from './images/image-3.jpg';

const Rsvp = () => {
    const validationSchema = object({
        name: string().required('Verplicht veld'),
        email: string()
            .email('Niet geldig emailadres')
            .required('Verplicht veld'),
        presence: boolean().required('Verplicht veld'),
        amountPresent: string().when('presence', {
            is: (presence: string) => presence === 'true',
            then: (schema) => schema.required('Verplicht veld'),
        }),
        dietaryWishes: string().when('presence', {
            is: (presence: string) => presence === 'true',
            then: (schema) => schema.required('Verplicht veld'),
        }),
        specialRequest: string(),
        remarks: string(),
    });

    const initialValues = {
        name: '',
        email: '',
        presence: 'false',
        amountPresent: '',
        dietaryWishes: '',
        specialRequest: '',
        remarks: '',
    };

    return (
        <Box
            py={{ base: 10, lg: 20 }}
            mb={{ base: 10, lg: 20 }}
            position="relative"
            w="full"
            id="rsvp"
        >
            <Box
                bgImage={`url(${rsvpBg})`}
                bgPosition="center"
                bgSize="cover"
                bgRepeat="repeat-y"
                position="absolute"
                inset={0}
                w="full"
                maxW="1200px"
                mx="auto"
                h="full"
            />
            <Grid
                gridTemplateColumns="repeat(6, 1fr)"
                gap={8}
                px={8}
                position="relative"
                overflowX="auto"
                maxW={{ base: '100vw', lg: '1600px' }}
                mx="auto"
            >
                <GridItem colSpan={6}>
                    <Heading
                        textAlign="center"
                        fontSize={{ base: '3xl', lg: '5xl' }}
                    >
                        Wedding time!
                    </Heading>
                </GridItem>
                <GridItem
                    colSpan={{ base: 3, lg: 2 }}
                    display={{ base: 'none', lg: 'unset' }}
                    w="full"
                >
                    <Image
                        w="full"
                        src={image3}
                        h={{ base: '150px', lg: '360px' }}
                        objectFit="cover"
                        objectPosition="center"
                        filter="grayscale(0.8)"
                    />
                </GridItem>
                <GridItem colSpan={{ base: 3, lg: 2 }}>
                    <Box
                        h={{ base: '150px', lg: '360px' }}
                        overflow="hidden"
                        w="full"
                    >
                        <Image
                            w="full"
                            h="full"
                            src={image2}
                            objectFit="cover"
                            objectPosition="top"
                            filter="grayscale(1)"
                            transform={{
                                base: 'scale(1.4) translateX(-20px)',
                                lg: 'scale(1.4) translateX(-50px)',
                            }}
                        />
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 3, lg: 2 }} w="full">
                    <Image
                        w="full"
                        src={image1}
                        h={{ base: '150px', lg: '360px' }}
                        objectFit="cover"
                        objectPosition="center"
                        filter="grayscale(1)"
                    />
                </GridItem>
            </Grid>
            <Container>
                <Center>
                    <Card
                        mt={{ base: 16, lg: 28 }}
                        maxW="750px"
                        px={{ base: 10, lg: 20 }}
                        id="rsvpForm"
                    >
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            <Box as={Form}>
                                <Heading textAlign="center" fontSize="md">
                                    RSVP
                                </Heading>
                                <Heading textAlign="center" fontSize="4xl">
                                    Ben jij erbij op onze bruiloft?
                                </Heading>
                                <Grid
                                    mt={4}
                                    gridTemplateColumns={'repeat(8, 1fr)'}
                                    gap={{ base: 4, lg: 4 }}
                                >
                                    <GridItem colSpan={{ base: 8, lg: 8 }}>
                                        <ControlledRadioGroup
                                            id="presence"
                                            label="Aanwezigheid"
                                        >
                                            <Flex
                                                flexWrap="wrap"
                                                w="full"
                                                columnGap={4}
                                                rowGap={1}
                                            >
                                                <Radio value="true">
                                                    <Text>
                                                        Ja, ik ben aanwezig
                                                    </Text>
                                                </Radio>
                                                <Radio value="false">
                                                    <Text>
                                                        Nee, ik kan helaas niet
                                                    </Text>
                                                </Radio>
                                            </Flex>
                                        </ControlledRadioGroup>
                                    </GridItem>

                                    <GridItem colSpan={{ base: 8, lg: 4 }}>
                                        <ControlledInput
                                            id="name"
                                            label="Naam"
                                            placeholder="Naam"
                                        />
                                    </GridItem>
                                    <GridItem colSpan={{ base: 8, lg: 4 }}>
                                        <ControlledInput
                                            id="email"
                                            label="Email"
                                            placeholder="Jouw emailadres"
                                        />
                                    </GridItem>
                                    <GridItem colSpan={{ base: 8, lg: 8 }}>
                                        <ControlledTextarea
                                            id="dietaryWishes"
                                            label="Dieetwensen"
                                            placeholder="Dieetwensen, allergieën of een kleine onderweg 👶?"
                                            rows={3}
                                        />
                                    </GridItem>
                                    <GridItem colSpan={{ base: 8, lg: 3 }}>
                                        <ControlledSelect
                                            id="amountPresent"
                                            label="Aantal personen"
                                            placeholder="Aantal personen"
                                            options={[...Array(10).keys()].map(
                                                (key) => ({
                                                    label: String(key + 1),
                                                    value: String(key + 1),
                                                })
                                            )}
                                        />
                                    </GridItem>
                                    <GridItem colSpan={{ base: 8, lg: 5 }}>
                                        <ControlledInput
                                            id="specialRequest"
                                            label="Speciale verzoeken"
                                            placeholder="Speech, dansje, etc."
                                        />
                                    </GridItem>

                                    <GridItem colSpan={{ base: 8, lg: 8 }}>
                                        <ControlledTextarea
                                            id="remarks"
                                            label="Opmerkingen"
                                            placeholder="Opmerkingen"
                                            rows={3}
                                        />
                                    </GridItem>
                                </Grid>
                                <Flex justifyContent="flex-end">
                                    <Button
                                        colorScheme="body"
                                        type="submit"
                                        mt={4}
                                    >
                                        Versturen
                                    </Button>
                                </Flex>
                            </Box>
                        </Formik>
                    </Card>
                </Center>
            </Container>
        </Box>
    );
};

export default Rsvp;

import React from 'react';

import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    GridItem,
    Radio,
    Text,
} from '@chakra-ui/react';

import InputControl from 'src/components/react-hook-form/components/InputControl';
import RadioGroupControl from 'src/components/react-hook-form/components/RadioGroupControl';

const EssentialInformationFields = () => {
    return (
        <>
            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <RadioGroupControl name="presence" label="Aanwezigheid">
                    <Flex flexWrap="wrap" w="full" columnGap={4} rowGap={1}>
                        <Radio value="true">
                            <Text>Ja, ik ben aanwezig</Text>
                        </Radio>
                        <Radio value="false">
                            <Text>Nee, ik kan helaas niet</Text>
                        </Radio>
                    </Flex>
                </RadioGroupControl>
            </GridItem>
            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <RadioGroupControl
                    name="useCouponCode"
                    label="Overnachting bij Van der Valk"
                >
                    <Box>
                        <Alert status="info" mb={4}>
                            <AlertIcon />

                            <Text fontSize="sm">
                                Als je de kortingscode van Van der Valk
                                gebruikt, laat het ons dan weten! Bij voldoende
                                aanmeldingen zullen we bekijken of we iets
                                kunnen regelen wat betreft het vervoer.
                            </Text>
                        </Alert>
                        <Flex>
                            <Flex
                                flexWrap="wrap"
                                w="full"
                                columnGap={4}
                                rowGap={1}
                            >
                                <Radio value="true">
                                    <Text>Ja, hier maak ik gebruik van</Text>
                                </Radio>
                                <Radio value="false">
                                    <Text>Nee</Text>
                                </Radio>
                            </Flex>
                        </Flex>
                    </Box>
                </RadioGroupControl>
            </GridItem>

            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <Text as="i" fontWeight="semibold" fontSize="xs" color="orange">
                    Vul alle namen in van de personen die uitgenodigd zijn (ook
                    als je afwezig bent)
                </Text>
            </GridItem>

            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <InputControl
                    name="email"
                    label="Email"
                    inputProps={{
                        placeholder: 'Jouw emailadres',
                    }}
                />
            </GridItem>
        </>
    );
};

export default EssentialInformationFields;

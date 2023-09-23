import React from 'react';

import { Flex, GridItem, Radio, Text } from '@chakra-ui/react';

import ControlledInput from 'src/components/forms/components/ControlledInput';
import ControlledRadioGroup from 'src/components/forms/components/ControlledRadioGroup';

const EssentialInformationFields = () => {
    return (
        <>
            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <ControlledRadioGroup id="presence" label="Aanwezigheid">
                    <Flex flexWrap="wrap" w="full" columnGap={4} rowGap={1}>
                        <Radio value="true">
                            <Text>Ja, ik ben aanwezig</Text>
                        </Radio>
                        <Radio value="false">
                            <Text>Nee, ik kan helaas niet</Text>
                        </Radio>
                    </Flex>
                </ControlledRadioGroup>
            </GridItem>

            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <Text as="i" fontWeight="semibold" fontSize="xs" color="orange">
                    Vul alle namen in van de personen die uitgenodigd zijn (ook
                    als je afwezig bent)
                </Text>
            </GridItem>
            <GridItem colSpan={{ base: 8, lg: 4 }}>
                <ControlledInput
                    id="name"
                    label="Jouw naam"
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
        </>
    );
};

export default EssentialInformationFields;

import React from 'react';

import { GridItem } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import { countriesOptions } from 'src/config/guestList';

const WeddingInvitationResponseAddress = () => {
    const values = useWatch();
    const addAddress = values.addAddress;

    return (
        <>
            <GridItem colSpan={{ base: 2 }}>
                <CheckboxSingleControl
                    formLabel="Adres"
                    name="addAddress"
                    label={`Adres gegevens van ${
                        values.guestWeddingResponses?.[0].guest.firstName ||
                        'Gast 1'
                    } toevoegen`}
                    helperText="Vul de adresgegevens in, dit helpt het bruidspaar enorm met de voorbereidingen en communicatie."
                />
            </GridItem>
            {addAddress && (
                <>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.street"
                            label="Straat"
                            inputProps={{
                                placeholder: 'Straat',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.houseNumber"
                            label="Huisnummer"
                            inputProps={{
                                placeholder: 'Huisnummer + toevoeging',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.zipCode"
                            label="Postcode"
                            inputProps={{
                                placeholder: 'Postcode',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <InputControl
                            name="address.city"
                            label="Plaats"
                            inputProps={{
                                placeholder: 'Plaats',
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 1 }}>
                        <CheckboxSingleControl
                            formLabel="Woonachtig in het buitenland"
                            name="address.livesAbroad"
                            label="Woonachtig in het buitenland"
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 2, lg: 2 }}>
                        <ReactSelectControl
                            name="address.country"
                            label="Land"
                            options={countriesOptions}
                            selectProps={{
                                placeholder: 'Selecteer een land',
                            }}
                        />
                    </GridItem>
                </>
            )}
        </>
    );
};

export default WeddingInvitationResponseAddress;

import React from 'react';

import { GridItem } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import ReactSelectControl from 'src/components/react-hook-form/components/ReactSelectControl/ReactSelectControl';
import { countriesOptions } from 'src/config/guestList';

const GuestGroupAddressInfo = () => {
    const addAddress = useWatch({ name: 'addAddress' });

    return (
        <>
            <GridItem colSpan={{ base: 2 }}>
                <CheckboxSingleControl
                    formLabel="Adres"
                    name="addAddress"
                    label="Adres gegevens van hoofdgast toevoegen"
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
                    <GridItem colSpan={{ base: 2, lg: 2 }}>
                        <ReactSelectControl
                            name="address.country"
                            label="Land"
                            options={countriesOptions}
                        />
                    </GridItem>
                </>
            )}
        </>
    );
};

export default GuestGroupAddressInfo;

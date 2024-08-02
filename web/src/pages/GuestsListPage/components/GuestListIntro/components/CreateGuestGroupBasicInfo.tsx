import React from 'react';

import { GridItem, Box } from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectControl from 'src/components/react-hook-form/components/SelectControl';
import {
    GUEST_GROUP_MAP,
    guestGroupRelationTypeOptions,
    guestGroupTypeOptions,
} from 'src/config/guestList';

const GuestGroupBasicInfo = () => {
    const guestGroupType = useWatch({ name: 'guestGroupType' });
    const isFamily = guestGroupType === GUEST_GROUP_MAP.FAMILY;

    return (
        <>
            <GridItem colSpan={{ base: 2, lg: 1 }}>
                <SelectControl name="guestGroupRelationType" label="Relatie">
                    <option value="">Selecteer een relatie</option>
                    {guestGroupRelationTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SelectControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, lg: 1 }}>
                <SelectControl name="guestGroupType" label="Type gastengroep">
                    <option value="">Selecteer een type</option>
                    {guestGroupTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SelectControl>
            </GridItem>

            {isFamily && (
                <GridItem colSpan={2}>
                    <InputControl
                        name="name"
                        label="Familienaam"
                        inputProps={{ placeholder: 'Familienaam' }}
                    />
                </GridItem>
            )}
            <GridItem colSpan={2}>
                <Box as="hr" my={4} />
            </GridItem>
        </>
    );
};

export default GuestGroupBasicInfo;

import React from 'react';

import { GridItem } from '@chakra-ui/react';
import { InvitationType } from 'types/graphql';

import ControlledTextarea from 'src/components/forms/components/ControlledTextarea';

type ExtraInformationFieldsProps = {
    invitationType: InvitationType;
};

const ExtraInformationFields = ({
    invitationType,
}: ExtraInformationFieldsProps) => {
    return (
        <>
            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <ControlledTextarea
                    id="dietaryWishes"
                    label="Dieetwensen"
                    placeholder="Dieetwensen, allergieën of een kleine onderweg 👶?"
                    isHidden={invitationType === 'EVENING'}
                    rows={3}
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
        </>
    );
};

export default ExtraInformationFields;

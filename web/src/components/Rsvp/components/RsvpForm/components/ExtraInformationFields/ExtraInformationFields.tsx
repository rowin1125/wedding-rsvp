import React from 'react';

import { GridItem } from '@chakra-ui/react';
import { InvitationType } from 'types/graphql';

import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';

type ExtraInformationFieldsProps = {
    invitationType: InvitationType;
};

const ExtraInformationFields = ({
    invitationType,
}: ExtraInformationFieldsProps) => {
    return (
        <>
            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <TextareaControl
                    name="dietaryWishes"
                    label="Dieetwensen"
                    isHidden={invitationType === 'EVENING'}
                    textareaProps={{
                        rows: 3,
                        placeholder:
                            'Dieetwensen, allergieën of een kleine onderweg 👶?',
                    }}
                />
            </GridItem>

            <GridItem colSpan={{ base: 8, lg: 8 }}>
                <TextareaControl
                    name="remarks"
                    label="Opmerkingen"
                    textareaProps={{
                        rows: 3,
                        placeholder: 'Opmerkingen',
                    }}
                />
            </GridItem>
        </>
    );
};

export default ExtraInformationFields;

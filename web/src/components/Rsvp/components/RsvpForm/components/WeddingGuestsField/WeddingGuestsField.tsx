import React, { Fragment } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, GridItem, Icon } from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';
import { FaTrash } from 'react-icons/fa';

import ControlledInput from 'src/components/forms/components/ControlledInput';
import { initialWeddingInvitationValues } from 'src/components/Rsvp/hooks/useCreateWeddingInvitation';

const WeddingGuestsField = () => {
    const { values } =
        useFormikContext<typeof initialWeddingInvitationValues>();
    return (
        <FieldArray name="weddingGuests">
            {({ remove, push }: any) => (
                <>
                    {values.weddingGuests.length > 0 &&
                        values.weddingGuests.map((friend, index) => (
                            <Fragment key={index}>
                                <GridItem
                                    colSpan={{
                                        base: 8,
                                        lg: 4,
                                    }}
                                >
                                    <ControlledInput
                                        id={`weddingGuests.${index}.firstName`}
                                        label={`Voornaam ${index + 1}`}
                                        placeholder="Voornaam"
                                        inputRightAddonText={() => (
                                            <Button
                                                borderLeftRadius={0}
                                                colorScheme="body"
                                                onClick={() => remove(index)}
                                            >
                                                <Icon as={FaTrash} />
                                            </Button>
                                        )}
                                    />
                                </GridItem>
                                <GridItem
                                    colSpan={{
                                        base: 8,
                                        lg: 4,
                                    }}
                                >
                                    <ControlledInput
                                        id={`weddingGuests.${index}.lastName`}
                                        label={`Achternaam ${index + 1}`}
                                        placeholder="Achternaam"
                                        inputRightAddonText={() => (
                                            <Button
                                                borderLeftRadius={0}
                                                colorScheme="body"
                                                onClick={() => remove(index)}
                                            >
                                                <Icon as={FaTrash} />
                                            </Button>
                                        )}
                                    />
                                </GridItem>
                            </Fragment>
                        ))}

                    {values.weddingGuests.length < 10 && (
                        <GridItem
                            colSpan={{
                                base: 8,
                                lg: 8,
                            }}
                        >
                            <Button
                                colorScheme="body"
                                onClick={() =>
                                    push({
                                        firstName: '',
                                        lastName: '',
                                    })
                                }
                            >
                                + Voeg nog een persoon toe
                            </Button>
                        </GridItem>
                    )}
                </>
            )}
        </FieldArray>
    );
};

export default WeddingGuestsField;

import React, { Fragment } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, GridItem, Icon } from '@chakra-ui/react';
import { Control, useFieldArray } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';

import InputControl from 'src/components/react-hook-form/components/InputControl';

type WeddingGuestsFieldProps = {
    control: Control<any, any>;
};

const WeddingGuestsField = ({ control }: WeddingGuestsFieldProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'weddingGuests',
    });

    return (
        <>
            {fields.map((field, index) => (
                <Fragment key={field.id}>
                    <GridItem
                        colSpan={{
                            base: 8,
                            lg: 4,
                        }}
                    >
                        <InputControl
                            name={`weddingGuests.${index}.firstName`}
                            label={`Voornaam ${index + 1}`}
                            inputProps={{
                                placeholder: 'Voornaam',
                            }}
                            rightAddon={() => (
                                <Button
                                    borderLeftRadius={0}
                                    colorScheme="body"
                                    onClick={() => remove(index)}
                                    isDisabled={fields.length === 1}
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
                        <InputControl
                            name={`weddingGuests.${index}.lastName`}
                            label={`Achternaam ${index + 1}`}
                            inputProps={{
                                placeholder: 'Achternaam',
                            }}
                            rightAddon={() => (
                                <Button
                                    borderLeftRadius={0}
                                    colorScheme="body"
                                    isDisabled={fields.length === 1}
                                    onClick={() => remove(index)}
                                >
                                    <Icon as={FaTrash} />
                                </Button>
                            )}
                        />
                    </GridItem>
                </Fragment>
            ))}
            {fields.length < 10 && (
                <GridItem
                    colSpan={{
                        base: 8,
                        lg: 8,
                    }}
                >
                    <Button
                        isDisabled={fields.length >= 10}
                        colorScheme="body"
                        onClick={() =>
                            append({
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
    );
};

export default WeddingGuestsField;

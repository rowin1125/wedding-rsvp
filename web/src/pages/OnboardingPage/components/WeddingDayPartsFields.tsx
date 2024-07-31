import React, { Fragment } from 'react';

import {
    GridItem,
    Button,
    Heading,
    Flex,
    IconButton,
    Icon,
} from '@chakra-ui/react';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa6';

import InputControl from 'src/components/react-hook-form/components/InputControl';

import { useWeddingFormContext } from '../context/WeddingFormContext';

type WeddingDayPartsFieldsProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
};

const WeddingDayPartsFields = ({ control }: WeddingDayPartsFieldsProps) => {
    const { globalFormState } = useWeddingFormContext();
    const [globalFormValues] = globalFormState ?? [];

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'dayParts',
    });

    const dayPartsValues = useWatch({
        control,
        name: 'dayParts',
    });

    return (
        <>
            {fields.map((field, index) => {
                const currentName = dayPartsValues[index]?.name;

                return (
                    <Fragment key={field.id}>
                        <GridItem colSpan={{ base: 2, lg: 2 }}>
                            <Flex alignItems="center">
                                <Heading as="h3" size="h3">
                                    Dagdeel {currentName ?? index + 1}
                                </Heading>
                                {fields.length > 1 && (
                                    <IconButton
                                        ml={4}
                                        colorScheme="red"
                                        icon={<FaTrash />}
                                        aria-label="Verwijder dagdeel"
                                        variant={'outline'}
                                        size="sm"
                                        onClick={() => remove(index)}
                                    >
                                        Verwijder
                                    </IconButton>
                                )}
                            </Flex>
                        </GridItem>

                        <GridItem colSpan={{ base: 2, lg: 1 }}>
                            <InputControl
                                name={`dayParts.${index}.name`}
                                label={`Naam dagdeel`}
                                isRequired
                                inputProps={{
                                    placeholder: 'Naam',
                                }}
                            />
                        </GridItem>
                        <GridItem
                            colSpan={{
                                base: 2,
                                lg: 1,
                            }}
                        >
                            <InputControl
                                name={`dayParts.${index}.description`}
                                label={`Beschrijving dagdeel`}
                                inputProps={{
                                    placeholder: 'Beschrijving',
                                }}
                            />
                        </GridItem>
                        <GridItem
                            colSpan={{
                                base: 2,
                                lg: 1,
                            }}
                        >
                            <InputControl
                                name={`dayParts.${index}.startTime`}
                                label={`Start tijd dagdeel`}
                                isRequired
                                inputProps={{
                                    placeholder: 'Start tijd',
                                    type: 'datetime-local',
                                }}
                            />
                        </GridItem>
                        <GridItem
                            colSpan={{
                                base: 2,
                                lg: 1,
                            }}
                        >
                            <InputControl
                                name={`dayParts.${index}.endTime`}
                                label={`Eind tijd dagdeel`}
                                isRequired
                                inputProps={{
                                    placeholder: 'Eind tijd',
                                    type: 'datetime-local',
                                }}
                            />
                        </GridItem>
                    </Fragment>
                );
            })}
            {fields.length < 10 && (
                <GridItem
                    colSpan={{
                        base: 2,
                        lg: 2,
                    }}
                >
                    <Button
                        isDisabled={fields.length >= 4}
                        colorScheme="body"
                        onClick={() =>
                            append({
                                startTime: new Date(
                                    globalFormValues?.date ?? new Date()
                                )
                                    .toISOString()
                                    .slice(0, 16),
                                endTime: new Date(
                                    globalFormValues?.date ?? new Date()
                                )
                                    .toISOString()
                                    .slice(0, 16),
                                type: 'MORNING',
                                description: '',
                            })
                        }
                    >
                        <Icon as={FaPlus} mr={4} /> Voeg nog een dagdeel toe
                    </Button>
                </GridItem>
            )}
        </>
    );
};

export default WeddingDayPartsFields;

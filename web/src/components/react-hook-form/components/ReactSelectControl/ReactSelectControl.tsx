import React from 'react';

import { CreatableSelect, Props, Select } from 'chakra-react-select';
import { useController } from 'react-hook-form';

import FormControl from '../FormControl';
import { BaseProps } from '../FormControl/FormControl';

type ReactSelectControlProps = BaseProps & {
    selectProps?: Props;
    options: { value: string; label: string }[];
    isCreatable?: boolean;
};

const ReactSelectControl = (props: ReactSelectControlProps) => {
    const { name, control, selectProps, options, isCreatable, ...rest } = props;
    const {
        field,
        formState: { isSubmitting },
        fieldState: { isTouched, error },
    } = useController({
        name,
        control,
        defaultValue: props.selectProps?.defaultValue || '',
    });
    const isValid = !error && isTouched;

    const SelectComponent = isCreatable ? CreatableSelect : Select;

    return (
        <FormControl name={name} control={control} mb={4} {...rest}>
            <SelectComponent
                {...field}
                id={name}
                size={selectProps?.size ?? 'md'}
                colorScheme="secondary"
                chakraStyles={{
                    input: (styles) => ({
                        ...styles,
                        color: 'tertiary.900',
                    }),
                    multiValueRemove: (styles) => ({
                        ...styles,
                        color: 'tertiary.900',
                        opacity: 0.8,
                    }),
                    placeholder: (styles) => ({
                        ...styles,
                        color: 'gray.200',
                    }),
                    control: (styles) => ({
                        ...styles,
                        backgroundColor: 'primary.200',
                        borderColor: isValid ? 'success.500' : 'gray.200',
                        '&:hover': {
                            borderColor: isValid ? 'success.500' : 'gray.200',
                        },
                        borderWidth: isValid ? 1 : 2,
                    }),
                    dropdownIndicator: (styles) => ({
                        ...styles,
                        background: 'tertiary.500',
                        color: 'white',
                    }),
                }}
                isDisabled={isSubmitting}
                {...selectProps}
                options={options}
            />
        </FormControl>
    );
};

export default ReactSelectControl;

import { Flex, Switch, SwitchProps } from '@chakra-ui/react';
import { get, useController } from 'react-hook-form';

import FormControl from '../FormControl';
import { BaseProps } from '../FormControl/FormControl';

export type SwitchControlProps = BaseProps & {
    switchProps?: SwitchProps;
};

const SwitchControl = (props: SwitchControlProps) => {
    const { name, control, label, switchProps, ...rest } = props;
    const {
        field,
        fieldState: { isTouched },
        formState: { isSubmitting, errors },
    } = useController({
        name,
        control,
        defaultValue: props.switchProps?.defaultChecked || false,
    });
    const error = get(errors, name, '');

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e.target.checked ? 'true' : 'false');
    };

    return (
        <FormControl
            name={name}
            control={control}
            label={label}
            as={Flex}
            alignItems="center"
            labelProps={{ mb: 0 }}
            {...rest}
        >
            <Switch
                {...field}
                id={name}
                isInvalid={!!error && isTouched}
                isChecked={field.value === 'true'}
                isDisabled={isSubmitting}
                {...switchProps}
                onChange={handleSwitchChange}
            />
        </FormControl>
    );
};

SwitchControl.displayName = 'SwitchControl';

export default SwitchControl;

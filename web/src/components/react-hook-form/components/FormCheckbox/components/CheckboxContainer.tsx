import {
    Children,
    cloneElement,
    isValidElement,
    ReactNode,
    useState,
} from 'react';

import { Stack, StackProps as ChakraStackProps } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import FormControl from '../../FormControl';
import { BaseProps } from '../../FormControl/FormControl';

/**
 * This component wraps CheckboxControl to build groups of checkboxes.
 * If you need a standalone checkbox please use CheckboxSingleControl
 * @property stackProps Chakra StackProps
 */
export type CheckboxContainerProps = BaseProps & {
    stackProps?: ChakraStackProps;
    children: ReactNode;
};

const CheckboxContainer = (props: CheckboxContainerProps) => {
    const { name, label, control, children, stackProps, ...rest } = props;
    const { field } = useController({
        control,
        name,
        defaultValue: props.defaultValue || [],
    });
    const [value, setValue] = useState(field.value || []);

    const childrenWithProps = Children.map(children, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                checkboxValue: value,
                setCheckboxValue: setValue,
                control,
            } as never);
        }
        return child;
    });

    return (
        <FormControl name={name} label={label} control={control} {...rest}>
            <Stack mt={1} spacing={1} {...stackProps}>
                {childrenWithProps}
            </Stack>
        </FormControl>
    );
};

CheckboxContainer.displayName = 'CheckboxContainer';

export default CheckboxContainer;

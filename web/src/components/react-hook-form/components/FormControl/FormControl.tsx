/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
    FormControl as ChakraFormControl,
    FormControlProps,
    FormErrorMessage,
    FormErrorMessageProps,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    IconProps,
    TextProps,
    Tooltip,
    TooltipProps,
} from '@chakra-ui/react';
import { Control, useController, get } from 'react-hook-form';

/**
 * All of the properties from Chakra's FormControlProps except "label" which
 * we are overriding to accept a ReactNode instead of a simple string
 */
export type ChakraFormControlProps = Omit<FormControlProps, 'label'>;

/**
 * Defines react-hook-form-chakra specific properties for all components
 */
export interface BaseReactHookFormProps {
    name: string;
    control?: Control<any, any>;
    label?: ReactNode;
    labelProps?: FormLabelProps;
    helperText?: ReactNode;
    helperTextProps?: TextProps;
    errorMessageProps?: FormErrorMessageProps;
    tooltipText?: string;
    tooltipProps?: Omit<TooltipProps, 'children'>;
    tooltipIconProps?: IconProps;
}

/**
 * The union of ChakraFormControlProps and BaseReactHookFormProps which defines the base properties
 * for most of react-hook-form-chakra components
 */
export type BaseProps = ChakraFormControlProps & BaseReactHookFormProps;

const FormControl = (props: BaseProps) => {
    const {
        children,
        name,
        control,
        label,
        labelProps,
        helperText,
        helperTextProps,
        tooltipText,
        tooltipProps,
        errorMessageProps,
        tooltipIconProps,
        ...rest
    } = props;

    const {
        formState: { errors },
    } = useController({ name, control });
    const error = get(errors, name, '');
    const hasError = Boolean(error?.message);

    return (
        <ChakraFormControl isInvalid={hasError} {...rest}>
            {label && typeof label === 'string' ? (
                <FormLabel htmlFor={name} {...labelProps}>
                    {label}{' '}
                    {tooltipText && (
                        <Tooltip
                            label={tooltipText}
                            placement="right"
                            aria-label={`Tooltip for form field ${name}`}
                            {...tooltipProps}
                        >
                            <InfoOutlineIcon
                                fontSize=".9em"
                                color="blackAlpha.600"
                                {...tooltipIconProps}
                            />
                        </Tooltip>
                    )}
                </FormLabel>
            ) : (
                label
            )}
            {children}
            <FormErrorMessage {...errorMessageProps}>
                {error.message}
            </FormErrorMessage>
            {helperText && typeof helperText === 'string' ? (
                <FormHelperText {...helperTextProps}>
                    {helperText}
                </FormHelperText>
            ) : (
                helperText
            )}
        </ChakraFormControl>
    );
};

export default FormControl;

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, ButtonProps } from '@chakra-ui/react';
import { useFormState, Control } from 'react-hook-form';

export type SubmitButtonProps = ButtonProps & {
    control?: Control<any, any>;
};

export const SubmitButton = (props: SubmitButtonProps) => {
    const { children, control, ...rest } = props;
    const { isSubmitting } = useFormState({ control });

    return (
        <Button
            type="submit"
            colorScheme={props.colorScheme ?? 'tertiary'}
            isLoading={isSubmitting}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default SubmitButton;

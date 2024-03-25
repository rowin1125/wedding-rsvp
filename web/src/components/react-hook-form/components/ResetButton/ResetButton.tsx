/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';
import {
    Control,
    useFormContext,
    UseFormReset,
    useFormState,
} from 'react-hook-form';

export type ResetButtonProps = ButtonProps & {
    control?: Control<any, any>;
    reset?: UseFormReset<any>;
};

export const ResetButton: FC<ResetButtonProps> = (props: ResetButtonProps) => {
    const { children, control, ...rest } = props;
    const { isSubmitting, isDirty } = useFormState({ control });
    const { reset } = useFormContext();

    if (props.control && !props.reset) {
        throw new Error(
            'Missing prop "reset" required if not using FormProvider'
        );
    }
    const resetFn = props.control && props.reset ? props.reset : reset;

    return (
        <Button
            type="reset"
            onClick={() => resetFn()}
            isDisabled={isSubmitting || !isDirty}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ResetButton;

import React from 'react';

import { JSONContent } from '@tiptap/react';
import { useController } from 'react-hook-form';

import Tiptap, {
    TiptapProps,
} from 'src/components/PuckStudio/blocks/RickTextBlock/components/Tiptap/components/Tiptap';

import FormControl, { BaseProps } from '../FormControl/FormControl';

type TiptapControlProps = BaseProps & {
    inputProps?: Omit<TiptapProps, 'content'>;
};

const TiptapControl = ({
    name,
    control,
    label,
    inputProps,
    ...rest
}: TiptapControlProps) => {
    const { field } = useController({
        name,
        control,
        defaultValue: inputProps?.defaultValue || {
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                },
            ],
        },
    });

    return (
        <FormControl name={name} control={control} label={label} {...rest}>
            <Tiptap
                mt={0}
                id={name}
                {...inputProps}
                onChange={(value: JSONContent) => {
                    field.onChange(value);
                }}
                content={
                    field.value || {
                        type: 'doc',
                        content: [
                            {
                                type: 'paragraph',
                            },
                        ],
                    }
                }
            />
        </FormControl>
    );
};

export default TiptapControl;

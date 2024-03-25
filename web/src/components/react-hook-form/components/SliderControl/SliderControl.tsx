import {
    Slider,
    SliderFilledTrack,
    SliderProps,
    SliderThumb,
    SliderThumbProps,
    SliderTrack,
    SliderTrackProps,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import FormControl, { BaseProps } from '../FormControl/FormControl';

export type SliderControlProps = BaseProps & {
    sliderProps?: SliderProps;
    sliderTrackProps?: SliderTrackProps;
    sliderThumbProps?: SliderThumbProps;
};

export const SliderControl = (props: SliderControlProps) => {
    const {
        name,
        control,
        sliderProps,
        sliderTrackProps,
        sliderThumbProps,
        ...rest
    } = props;
    const {
        field,
        formState: { isSubmitting },
    } = useController({
        name,
        control,
        defaultValue: props.sliderProps?.defaultValue || '',
    });

    return (
        <FormControl name={name} control={control} {...rest}>
            <Slider
                {...field}
                id={name}
                isDisabled={isSubmitting}
                {...sliderProps}
            >
                <SliderTrack {...sliderTrackProps}>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb {...sliderThumbProps} />
            </Slider>
        </FormControl>
    );
};

export default SliderControl;

import { useEffect } from 'react';

import {
    Slider,
    SliderFilledTrack,
    SliderMark,
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

    const [sliderValue, setSliderValue] = React.useState<number>(
        Number(field.value)
    );

    useEffect(() => {
        setSliderValue(Number(field.value));
    }, [field.value]);

    const onChange = (value: number) => {
        setSliderValue(value);
        field.onChange(value);
    };
    return (
        <FormControl name={name} control={control} {...rest}>
            <Slider
                {...field}
                id={name}
                isDisabled={isSubmitting}
                {...sliderProps}
                onChange={onChange}
            >
                <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    mt="-2.5"
                    zIndex={4}
                    fontSize="sm"
                    fontWeight="semibold"
                    ml="-4px"
                >
                    {sliderValue}
                </SliderMark>
                <SliderTrack {...sliderTrackProps}>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb p={3} {...sliderThumbProps} />
            </Slider>
        </FormControl>
    );
};

export default SliderControl;

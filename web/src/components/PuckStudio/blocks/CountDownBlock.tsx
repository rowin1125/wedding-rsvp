import { Box } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';

import Countdown from 'src/components/Countdown/Countdown';

import PuckInput from '../components/PuckInput';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

export type CountDownBlockProps = DefaultSettingsType & {
    date: string;
};

const currentDatePlusOneYear = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
);

export const CountDownBlock: ComponentConfig<CountDownBlockProps> = {
    fields: {
        date: {
            type: 'custom',
            label: 'Datum',
            render: ({ value, onChange }) => {
                return (
                    <>
                        <FieldLabel label="Datum" />
                        <PuckInput
                            type="date"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </>
                );
            },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(defaultSettings({ disableTextColor: false }) as any),
    },
    defaultProps: {
        date: currentDatePlusOneYear.toISOString().split('T')[0],
        settings: {
            bottomSpacing: 'none',
            containerWidth: '7xl',
            topSpacing: 'none',
        },
    },
    label: 'Aftel blok',
    render: (props) => (
        <Box
            id={props.id}
            as="section"
            backgroundColor={props.settings?.backgroundColor ?? 'inherit'}
            pt={props.settings?.topSpacing ?? 0}
            pb={props.settings?.bottomSpacing ?? 0}
        >
            <Countdown
                color={props.settings?.textColor}
                maxW={props.settings?.containerWidth ?? 'full'}
                targetDate={props.date}
            />
        </Box>
    ),
};

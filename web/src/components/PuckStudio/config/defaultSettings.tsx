import { ComponentConfig, FieldLabel } from '@measured/puck';

import { chakraColorToHex } from 'src/helpers/chakraColorToHex/chakraColorToHex';

import PuckInput from '../components/PuckInput';

export type DefaultSettingsType = {
    settings?: {
        containerWidth?: string;
        topSpacing?: string;
        bottomSpacing?: string;
        backgroundColor?: string;
        textColor?: string;
        navigationLabel?: string;
    };
};

type DefaultSettingsOptions = {
    disableTextColor?: boolean;
    disableBackgroundColor?: boolean;
};

export const defaultSettings = (
    { disableBackgroundColor, disableTextColor }: DefaultSettingsOptions = {
        disableTextColor: true,
    }
): ComponentConfig<{
    settings: DefaultSettingsType['settings'];
}>['fields'] => {
    return {
        settings: {
            label: 'Blok instellingen',
            type: 'object',
            objectFields: {
                navigationLabel: {
                    type: 'text',
                    label: 'Navigatie label',
                },
                containerWidth: {
                    type: 'select',
                    options: [
                        { label: 'small', value: '3xl' },
                        { label: 'medium', value: '5xl' },
                        { label: 'groot', value: '7xl' },
                        { label: 'volledig', value: 'full' },
                    ],
                    label: 'Container breedte',
                },
                topSpacing: {
                    type: 'select',
                    options: [
                        { label: 'none', value: '0' },
                        { label: 'smal', value: '4' },
                        { label: 'medium', value: '8' },
                        { label: 'groot', value: '12' },
                        { label: 'extra groot', value: '16' },
                    ],
                    label: 'Ruimte boven',
                },
                bottomSpacing: {
                    type: 'select',
                    options: [
                        { label: 'none', value: '0' },
                        { label: 'smal', value: '4' },
                        { label: 'medium', value: '8' },
                        { label: 'groot', value: '12' },
                        { label: 'extra groot', value: '16' },
                    ],
                    label: 'Ruimte onder',
                },
                ...(disableBackgroundColor
                    ? {}
                    : {
                          backgroundColor: {
                              type: 'custom',
                              label: 'Achtergrondkleur',
                              render: ({ value, onChange }) => {
                                  return (
                                      <>
                                          <FieldLabel label="Achtergrondkleur" />
                                          <PuckInput
                                              type="color"
                                              value={
                                                  value ||
                                                  chakraColorToHex(
                                                      'primary.100'
                                                  )
                                              }
                                              onChange={(e) =>
                                                  onChange(e.target.value)
                                              }
                                          />
                                      </>
                                  );
                              },
                          },
                      }),
                ...(disableTextColor
                    ? {}
                    : {
                          textColor: {
                              type: 'custom',
                              label: 'Tekstkleur',
                              render: ({ value, onChange }) => {
                                  return (
                                      <>
                                          <FieldLabel label="Tekstkleur" />
                                          <PuckInput
                                              type="color"
                                              value={
                                                  value ||
                                                  chakraColorToHex(
                                                      'secondary.900'
                                                  )
                                              }
                                              onChange={(e) =>
                                                  onChange(e.target.value)
                                              }
                                          />
                                      </>
                                  );
                              },
                          },
                      }),
            },
        },
    };
};

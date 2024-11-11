import { Box } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';
import { JSONContent } from '@tiptap/react';
import { AssetReference } from 'types/graphql';

import Banner from 'src/components/Banner';

import AssetInput from '../components/AssetInput/AssetInput';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

import Tiptap from './RickTextBlock/components/Tiptap/components/Tiptap';

export type BannerBlockProps = DefaultSettingsType & {
    assetReference?: AssetReference;
    text: JSONContent;
};

export const BannerBlock: ComponentConfig<BannerBlockProps> = {
    fields: {
        assetReference: {
            type: 'custom',
            label: 'Afbeelding',
            render: ({ onChange, value: assetReference, id }) => {
                return (
                    <>
                        <FieldLabel label="Afbeelding" />
                        <AssetInput
                            assetReference={assetReference}
                            onChange={onChange}
                            forceModalUpload
                            id={id}
                        />
                    </>
                );
            },
        },
        text: {
            type: 'custom',
            render: ({ onChange, value: content }) => {
                return (
                    <>
                        <FieldLabel label="Text" />
                        <Tiptap
                            content={content}
                            onChange={onChange}
                            borderColor="gray.100"
                            borderWidth="1px"
                            borderRadius="md"
                        />
                    </>
                );
            },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(defaultSettings({ disableTextColor: true }) as any),
    },
    defaultProps: {
        text: {
            type: 'doc',
            content: [
                {
                    type: 'heading',
                    attrs: {
                        textAlign: 'center',
                        level: 2,
                    },
                    content: [
                        {
                            type: 'text',
                            marks: [
                                {
                                    type: 'italic',
                                },
                            ],
                            text: 'We kijken er naar uit om deze mooie dag samen met jullie te vieren!',
                        },
                    ],
                },
            ],
        },
        settings: {
            containerWidth: '5xl',
        },
    },
    render: (props) => (
        <Box
            as="section"
            backgroundColor={props.settings?.backgroundColor ?? 'inherit'}
            pt={props.settings?.topSpacing ?? 0}
            pb={props.settings?.bottomSpacing ?? 0}
            id={props.id}
        >
            <Banner
                assetReference={props.assetReference}
                content={props.text}
                containerProps={{
                    maxW: props.settings?.containerWidth ?? '7xl',
                }}
            />
        </Box>
    ),
};

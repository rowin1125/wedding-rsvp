import { ComponentConfig, FieldLabel } from '@measured/puck';
import { AssetReference } from 'types/graphql';

import Hero from 'src/components/Hero';

import AssetInput from '../components/AssetInput/AssetInput';
import { Section } from '../components/Section';
import {
    defaultSettings,
    DefaultSettingsType,
} from '../config/defaultSettings';

export type HeroBlockProps = {
    title: string;
    subtitle: string;
    height: number;
    assetReference?: AssetReference;
} & DefaultSettingsType;

const HeroBlock: ComponentConfig<HeroBlockProps> = {
    fields: {
        title: {
            type: 'text',
            label: 'Titel',
        },
        subtitle: {
            type: 'textarea',
            label: 'Subtitel',
        },
        height: {
            type: 'number',
            min: 300,
            max: 800,
            label: 'Hoogte',
        },
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
                            id={id}
                            forceModalUpload
                        />
                    </>
                );
            },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(defaultSettings({ disableTextColor: false }) as any),
    },
    defaultProps: {
        height: 600,
        subtitle: 'Demi & Rowin',
        title: 'Wij gaan trouwen!',
        settings: {
            bottomSpacing: 'none',
            containerWidth: 'full',
            topSpacing: 'none',
        },
    },

    render: ({ title, subtitle, height, settings, assetReference, id }) => {
        return (
            <Section
                as="section"
                px={0}
                id={id}
                maxW="full"
                maxWidth={settings?.containerWidth}
                pt={settings?.topSpacing}
                pb={settings?.bottomSpacing}
            >
                <Hero
                    title={title}
                    subtitle={subtitle}
                    minH="300px"
                    height={height}
                    url={assetReference?.asset.url}
                    previewUrl={assetReference?.asset.previewUrl}
                    fileType={assetReference?.asset.fileType}
                    objectPosition={
                        assetReference?.metadata?.focalPoint
                            ? `${assetReference.metadata.focalPoint.x}% ${assetReference.metadata.focalPoint.y}%`
                            : undefined
                    }
                    color={settings?.textColor ?? 'white'}
                />
            </Section>
        );
    },
};

export default HeroBlock;

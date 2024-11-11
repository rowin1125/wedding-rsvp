import { Image } from '@chakra-ui/react';
import { ComponentConfig, FieldLabel } from '@measured/puck';
import { AssetReference } from 'types/graphql';

import AssetInput from '../components/AssetInput/AssetInput';

export type ImageBlockProps = {
    assetReference?: AssetReference;
    borderRadius?: number;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
};

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
    fields: {
        assetReference: {
            type: 'custom',
            label: 'Afbeelding',
            render: ({ value: assetReference, onChange, id }) => {
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
        borderRadius: {
            type: 'select',
            label: 'Border Radius',
            options: [
                {
                    label: 'None',
                    value: 0,
                },
                {
                    label: 'Small',
                    value: 4,
                },
                {
                    label: 'Medium',
                    value: 8,
                },
                {
                    label: 'Large',
                    value: 16,
                },
                {
                    label: 'Full',
                    value: 9999,
                },
            ],
        },
        shadow: {
            type: 'select',
            label: 'Schaduw',
            options: [
                {
                    label: 'None',
                    value: 'none',
                },
                {
                    label: 'Small',
                    value: 'sm',
                },
                {
                    label: 'Medium',
                    value: 'md',
                },
                {
                    label: 'Large',
                    value: 'lg',
                },
            ],
        },
    },
    defaultProps: {
        assetReference: undefined,
        borderRadius: 0,
        shadow: 'none',
    },
    render: (props) => (
        <Image
            w="full"
            id={props.id}
            src={
                props.assetReference?.asset.previewUrl ??
                'https://images.prismic.io/derow-v1/ZjZpJUMTzAJOCiG1_banner.jpg?auto=format,compress'
            }
            h={{ base: '150px', lg: '360px' }}
            objectFit="cover"
            objectPosition={
                props.assetReference?.metadata?.focalPoint
                    ? `${props.assetReference.metadata.focalPoint.x}% ${props.assetReference.metadata.focalPoint.y}%`
                    : 'center'
            }
            borderRadius={props.borderRadius}
            boxShadow={props.shadow}
        />
    ),
};

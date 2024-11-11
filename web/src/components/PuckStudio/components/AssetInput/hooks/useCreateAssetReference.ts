import { useToast } from '@chakra-ui/react';
import {
    CreateAssetReference,
    CreateAssetReferenceVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { AssetBody } from 'src/lib/fragments/assetFragment';

export const CREATE_ASSET_REFERENCE = gql`
    mutation CreateAssetReference($input: CreateAssetReferenceInput!) {
        createAssetReference(input: $input) {
            id
            asset {
                ...AssetBody
            }
            metadata {
                focalPoint {
                    x
                    y
                }
            }
            objectReference
        }
    }
    ${AssetBody.fragment}
`;

export const useCreateAssetReference = () => {
    const toast = useToast();
    const [createAssetReference, mutationData] = useMutation<
        CreateAssetReference,
        CreateAssetReferenceVariables
    >(CREATE_ASSET_REFERENCE, {
        onError: (error) => {
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Error creating guest:', error);
        },
    });

    return {
        createAssetReference,
        ...mutationData,
    };
};

import { useToast } from '@chakra-ui/react';
import {
    DeleteAssetReference,
    DeleteAssetReferenceVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

export const DELETE_ASSET_REFERENCE = gql`
    mutation DeleteAssetReference($id: String!, $objectReference: String) {
        deleteAssetReference(id: $id, objectReference: $objectReference)
    }
`;

export const useDeleteAssetReference = () => {
    const toast = useToast();
    const [deleteAssetReference, mutationData] = useMutation<
        DeleteAssetReference,
        DeleteAssetReferenceVariables
    >(DELETE_ASSET_REFERENCE, {
        onError: (error) => {
            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            console.error('Error deleting asset reference:', error);
        },
    });

    return {
        deleteAssetReference,
        ...mutationData,
    };
};

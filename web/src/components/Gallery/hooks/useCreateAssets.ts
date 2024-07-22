import { useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { createId } from '@paralleldrive/cuid2';
import { useForm } from 'react-hook-form';
import {
    CreateAssetsMutation,
    CreateAssetsMutationVariables,
    RequestSigningUrlMutation,
    RequestSigningUrlMutationVariables,
} from 'types/graphql';
import { InferType, object } from 'yup';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import validateFile from 'src/components/react-hook-form/helpers/validateFile';
import { GET_MEDIA_ASSETS } from 'src/pages/MediaPage/hooks/useGetMediaAssets';

import { FIND_GALLERY_QUERY } from './useFindGallery';

export const CREATE_ASSETS_MUTATION = gql`
    mutation CreateAssetsMutation(
        $input: [CreateAssetInput!]!
        $galleryId: String
        $mediaLibraryId: String
        $weddingId: String!
    ) {
        createAssets(
            weddingId: $weddingId
            input: $input
            galleryId: $galleryId
            mediaLibraryId: $mediaLibraryId
        ) {
            count
        }
    }
`;

export const REQUEST_SIGNING_URL = gql`
    mutation RequestSigningUrlMutation($gcloudStoragePath: String!) {
        requestSigningUrl(gcloudStoragePath: $gcloudStoragePath)
    }
`;

export const GCLOUD_MAX_FILE_SIZE = 1024 * 1024 * 30; // 30MB

type UseCreateAssetsType = {
    gcloudPath: string;
    mediaLibraryId?: string;
    accept?: string;
    maxFiles?: number;
    weddingId: string;
};

export const useCreateAssets = ({
    gcloudPath,
    mediaLibraryId,
    accept = 'image/*, video/*',
    maxFiles,
    weddingId,
}: UseCreateAssetsType) => {
    const client = useApolloClient();
    const uploadedFiles = React.useRef<File[]>([]);
    const [globalLoading, setGlobalLoading] = useState(false);

    const modalDisclosure = useDisclosure();
    const { galleryId } = useParams();
    const validationSchema = object().shape({
        files: validateFile({
            isRequired: true,
            maxFileSize: GCLOUD_MAX_FILE_SIZE,
            accept,
            maxFiles,
        }),
    });

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            files: [],
        },
        mode: 'onBlur',
    });

    const [requestSigningUrl, requestSigningUrlMutationData] = useMutation<
        RequestSigningUrlMutation,
        RequestSigningUrlMutationVariables
    >(REQUEST_SIGNING_URL);

    const [createAssets, createAssetsMutationData] = useMutation<
        CreateAssetsMutation,
        CreateAssetsMutationVariables
    >(CREATE_ASSETS_MUTATION);

    const onSubmit = async (values: InferType<typeof validationSchema>) => {
        try {
            if (!values.files) {
                toast.error('No files selected');
                return;
            }
            setGlobalLoading(true);

            const signingUrlPromises = values.files.map((file) => {
                const fileType = file.type;
                const fileTypeExtension = fileType.split('/')[1];

                const uniqueId = createId();
                const gcloudStoragePath = `${gcloudPath}/${uniqueId}/original/${uniqueId}.${fileTypeExtension}`;

                return requestSigningUrl({
                    variables: {
                        gcloudStoragePath,
                    },
                }).then((response) => {
                    uploadedFiles.current.push(file);

                    return {
                        file,
                        fileType,
                        uniqueId,
                        gcloudStoragePath,
                        originalFilename: file.name,
                        signingUrl: response.data?.requestSigningUrl,
                    };
                });
            });

            const signingUrlResults = await Promise.all(signingUrlPromises);

            const uploadFilePromises = signingUrlResults.map(
                ({ file, signingUrl }) => {
                    if (!signingUrl) {
                        throw new Error('Failed to get signing URL');
                    }

                    return fetch(signingUrl, {
                        method: 'PUT',
                        body: file,
                        headers: {
                            'Content-Type': 'application/octet-stream',
                        },
                    });
                }
            );

            await toast.promise(
                Promise.all([
                    createAssets({
                        variables: {
                            galleryId,
                            mediaLibraryId,
                            weddingId,
                            input: signingUrlResults.map(
                                ({
                                    gcloudStoragePath,
                                    uniqueId,
                                    fileType,
                                    originalFilename,
                                }) => ({
                                    gcloudStoragePath,
                                    uuid: uniqueId,
                                    fileType,
                                    originalFilename,
                                })
                            ),
                        },
                    }),
                    ...uploadFilePromises,
                ]),
                {
                    loading:
                        'Succesvol geüpload naar de opslag, nu nog even opslaan in de database, bijna klaar! Sluit dit scherm niet af!',
                    success: (response) => {
                        return `Succesvol ${response[0].data?.createAssets?.count} bestanden opgeslagen!`;
                    },
                    error: 'Oeps er is iets misgegaan, probeer het later nog eens!',
                }
            );

            if (galleryId) {
                client.refetchQueries({
                    include: [FIND_GALLERY_QUERY],
                });
            }
            if (mediaLibraryId) {
                client.refetchQueries({
                    include: [GET_MEDIA_ASSETS],
                });
            }
            methods.reset();

            modalDisclosure.onClose();

            uploadedFiles.current = [];
            setGlobalLoading(false);
        } catch (err) {
            const error = err as Error;
            setGlobalLoading(false);
            toast.error(error.message);
        }
    };

    return {
        uploadedFiles,
        modalDisclosure,
        methods,
        onSubmit,
        createAssetsMutationData,
        requestSigningUrlMutationData,
        globalLoading,
    };
};

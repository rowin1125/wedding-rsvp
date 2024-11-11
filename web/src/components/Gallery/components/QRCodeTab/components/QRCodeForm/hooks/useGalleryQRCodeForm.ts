/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';

import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { createId } from '@paralleldrive/cuid2';
import { useForm } from 'react-hook-form';
import {
    CreateQRCodeMutation,
    CreateQRCodeMutationVariables,
    UpdateQRCodeMutation,
    UpdateQRCodeMutationVariables,
} from 'types/graphql';
import { InferType } from 'yup';

import { routes, useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { useGalleryForm } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';

import { qrCodeToFormValues } from '../helpers/qrCodeToFormValues';
import { QRValidationSchema } from '../QRCodeForm';

import { useGetQRCode } from './useGetQRCode';

export const CREATE_QR_CODE_MUTATION = gql`
    mutation CreateQRCodeMutation($input: CreateQrCodeInput!) {
        createQrCode(input: $input) {
            id
            code
            redirectUrl
            isActive
            usageCount
            expiresAt
        }
    }
`;

export const UPDATE_QR_CODE_MUTATION = gql`
    mutation UpdateQRCodeMutation($input: UpdateQrCodeInput!, $id: String!) {
        updateQrCode(input: $input, id: $id) {
            id
            code
            redirectUrl
            isActive
            usageCount
            expiresAt
        }
    }
`;

type UseGalleryQRCodeFormType = {
    formType: 'create' | 'update';
    qrCodeId?: string | null;
};

export const useGalleryQRCodeForm = ({
    formType,
    qrCodeId,
}: UseGalleryQRCodeFormType) => {
    const { galleryId } = useParams();
    const { currentUser } = useAuth();
    const { qrCode, loading: qrCodeLoading } = useGetQRCode(qrCodeId);
    const toast = useToast();

    const [createQRCode, createQRCodeMutationData] = useMutation<
        CreateQRCodeMutation,
        CreateQRCodeMutationVariables
    >(CREATE_QR_CODE_MUTATION);

    const [updateQRCode, updateQRCodeMutationData] = useMutation<
        UpdateQRCodeMutation,
        UpdateQRCodeMutationVariables
    >(UPDATE_QR_CODE_MUTATION);

    const { updateGallery, updateGalleryMutationData } = useGalleryForm();

    const defaultValues = useMemo(
        () =>
            qrCodeToFormValues({
                qrCode,
                redirectUrl: `${
                    process.env.REDWOOD_ENV_VERCEL_URL
                }${routes.publicGallery({
                    galleryId,
                    weddingId: currentUser?.weddingId ?? '',
                })}`,
            }),
        [qrCode, qrCodeId, currentUser, galleryId]
    );

    const methods = useForm({
        resolver: yupResolver(QRValidationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    useEffect(() => {
        methods.reset(defaultValues);
    }, [defaultValues, methods]);

    const onSubmit = async (data: InferType<typeof QRValidationSchema>) => {
        const transparentColor = '#0000';

        try {
            const darkIsTransparent =
                data.metadata.color.dark.isTransparent === 'true';
            const lightIsTransparent =
                data.metadata.color.light.isTransparent === 'true';

            let qrCode;
            if (formType === 'create') {
                const initialQrCodeId = createId();
                const createQRCodeResponse = await createQRCode({
                    variables: {
                        input: {
                            id: initialQrCodeId,
                            isActive: data.isActive === 'true',
                            redirectUrl: data.redirectUrl,
                            baseUrl: `${
                                process.env.REDWOOD_ENV_VERCEL_URL
                            }${routes.qrCode({
                                qrId: initialQrCodeId,
                            })}
                            `,
                            expiresAt: data.expiresAt
                                ? new Date(data.expiresAt).toISOString()
                                : undefined,
                            metadata: {
                                ...data.metadata,
                                version: 5,
                                color: {
                                    dark: darkIsTransparent
                                        ? transparentColor
                                        : data.metadata.color.dark.color,

                                    light: lightIsTransparent
                                        ? transparentColor
                                        : data.metadata.color.light.color,
                                },
                            },
                        },
                    },
                });
                qrCode = createQRCodeResponse.data?.createQrCode;
            } else {
                if (!qrCodeId) {
                    toast({
                        title: 'QR Code not found',
                        status: 'error',
                    });
                    return;
                }
                const updateQRCodeResponse = await updateQRCode({
                    variables: {
                        id: qrCodeId,
                        input: {
                            isActive: data.isActive === 'true',
                            redirectUrl: data.redirectUrl,
                            expiresAt: data.expiresAt
                                ? new Date(data.expiresAt).toISOString()
                                : undefined,
                            baseUrl: `${
                                process.env.REDWOOD_ENV_VERCEL_URL
                            }${routes.qrCode({
                                qrId: qrCodeId,
                            })}
                                `,
                            metadata: {
                                ...data.metadata,
                                version: 5,
                                color: {
                                    dark: darkIsTransparent
                                        ? '#0000'
                                        : data.metadata.color.dark.color,

                                    light: lightIsTransparent
                                        ? '#0000'
                                        : data.metadata.color.light.color,
                                },
                            },
                        },
                    },
                });
                qrCode = updateQRCodeResponse.data?.updateQrCode;
            }

            await updateGallery({
                variables: {
                    id: galleryId,
                    input: {
                        qrCode: qrCode?.code,
                        qrCodeId: qrCode?.id,
                    },
                },
            });

            methods.reset(data);

            toast({
                title: 'QR Code successfully saved',
                status: 'success',
            });
        } catch (error) {
            console.error('Failed to save QR Code', error);
        }
    };

    return {
        onSubmit,
        methods,
        qrCode,
        createQRCodeMutationData,
        updateQRCodeMutationData,
        updateGalleryMutationData,
        qrCodeLoading: qrCodeLoading,
        loading:
            createQRCodeMutationData.loading ||
            updateQRCodeMutationData.loading,
    };
};

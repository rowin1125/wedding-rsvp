import { useToast } from '@chakra-ui/react';
import {
    DeleteQrCode,
    DeleteQrCodeVariables,
    QrCodeVariants,
    UpdateWeddingRsvpLandingPageQrCode,
    UpdateWeddingRsvpLandingPageQrCodeVariables,
} from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { useGalleryForm } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';
import { UPDATE_WEDDING_RSVP_LANDING_PAGE_QR_CODE } from 'src/pages/RsvpLandingPageStudioPage/hooks/useRsvpQRCodeForm';

export const DELETE_QR_CODE = gql`
    mutation DeleteQrCode($id: String!, $variant: QrCodeVariants!) {
        deleteQrCode(id: $id, variant: $variant) {
            id
        }
    }
`;

type UseDeleteQrCodeType = {
    variant: QrCodeVariants;
};

export const useDeleteQrCode = ({ variant }: UseDeleteQrCodeType) => {
    const { updateGallery, updateGalleryMutationData } = useGalleryForm();
    const { galleryId, landingPageId } = useParams();
    const toast = useToast();

    const [deleteQrCode, deleteQrMutationData] = useMutation<
        DeleteQrCode,
        DeleteQrCodeVariables
    >(DELETE_QR_CODE, {
        onCompleted: () => {
            toast({
                title: 'QR code verwijderd!',
                status: 'success',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error deleting QR code: ' + error.message,
                status: 'error',
            });
        },
    });

    const [
        updateWeddingRsvpLandingPageQrCode,
        updateWeddingRsvpLandingPageQrCodeData,
    ] = useMutation<
        UpdateWeddingRsvpLandingPageQrCode,
        UpdateWeddingRsvpLandingPageQrCodeVariables
    >(UPDATE_WEDDING_RSVP_LANDING_PAGE_QR_CODE);

    const onDelete = async (id: string) => {
        const deleteCodePromise = deleteQrCode({
            variables: { id, variant },
        });

        if (variant === 'GALLERY') {
            const updateGalleryPromise = updateGallery({
                variables: {
                    id: galleryId,
                    input: {
                        qrCodeId: null,
                        qrCode: null,
                    },
                },
            });
            await Promise.all([updateGalleryPromise, deleteCodePromise]);
        }
        if (variant === 'RSVP') {
            const updateGalleryPromise = updateWeddingRsvpLandingPageQrCode({
                variables: {
                    id: landingPageId,
                    qrCodeId: null,
                    qrCode: null,
                },
            });

            await Promise.all([updateGalleryPromise, deleteCodePromise]);
        }
    };

    return {
        deleteQrCode: onDelete,
        ...deleteQrMutationData,
        loading:
            deleteQrMutationData.loading ||
            updateGalleryMutationData.loading ||
            updateWeddingRsvpLandingPageQrCodeData.loading,
    };
};

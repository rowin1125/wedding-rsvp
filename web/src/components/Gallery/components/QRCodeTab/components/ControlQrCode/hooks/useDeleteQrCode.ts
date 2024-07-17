import { useToast } from '@chakra-ui/react';
import { DeleteQrCode, DeleteQrCodeVariables } from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';

import { FIND_GALLERY_QUERY } from 'src/components/Gallery/hooks/useFindGallery';
import {
    DEFAULT_GALLERY_PAGINATION_OFFSET,
    useGalleryForm,
} from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';

import { FIND_QR_CODE_BY_ID } from '../../QRCodeForm/hooks/useGetQRCode';

export const DELETE_QR_CODE = gql`
    mutation DeleteQrCode($id: String!) {
        deleteQrCode(id: $id) {
            id
        }
    }
`;

export const useDeleteQrCode = () => {
    const { updateGallery, updateGalleryMutationData } = useGalleryForm();
    const { galleryId } = useParams();
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
        refetchQueries: [
            {
                query: FIND_QR_CODE_BY_ID,
                variables: {
                    id: '',
                },
            },
            {
                query: FIND_GALLERY_QUERY,
                variables: {
                    id: galleryId,
                    take: DEFAULT_GALLERY_PAGINATION_OFFSET,
                    skip: 0,
                },
            },
        ],
    });

    const onDelete = async (id: string) => {
        const deleteCodePromise = deleteQrCode({
            variables: { id },
        });
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
    };

    return {
        deleteQrCode: onDelete,
        ...deleteQrMutationData,
        loading:
            deleteQrMutationData.loading || updateGalleryMutationData.loading,
    };
};

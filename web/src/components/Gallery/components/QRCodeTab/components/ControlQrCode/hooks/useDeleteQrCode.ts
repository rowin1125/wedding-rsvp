import { DeleteQrCode, DeleteQrCodeVariables } from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { FIND_GALLERY_QUERY } from 'src/components/Gallery/hooks/useFindGallery';
import { useGalleryForm } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';
import { DEFAULT_PAGINATION_OFFSET } from 'src/pages/GalleryPage/hooks/useGalleryPagination';

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
    const { id: galleryId } = useParams();

    const [deleteQrCode, deleteQrMutationData] = useMutation<
        DeleteQrCode,
        DeleteQrCodeVariables
    >(DELETE_QR_CODE, {
        onCompleted: () => {
            toast.success('QR code verwijderd!');
        },
        onError: (error) => {
            toast.error('Error deleting QR code: ' + error.message);
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
                    take: DEFAULT_PAGINATION_OFFSET,
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

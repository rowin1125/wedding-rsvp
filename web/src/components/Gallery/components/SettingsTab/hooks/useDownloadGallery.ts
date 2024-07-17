import { useToast } from '@chakra-ui/react';

import { useMutation } from '@redwoodjs/web';

import { FIND_GALLERY_QUERY } from 'src/components/Gallery/hooks/useFindGallery';
import { DEFAULT_GALLERY_PAGINATION_OFFSET } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';

export const DOWNLOAD_GALLERY_MUTATION = gql`
    mutation DownloadGalleryMutation($id: String!) {
        downloadGallery(id: $id)
    }
`;

export const useDownloadGallery = (galleryId: string) => {
    const toast = useToast();
    const [downloadGallery, downloadMutationData] = useMutation(
        DOWNLOAD_GALLERY_MUTATION,
        {
            onCompleted: (data) => {
                toast({
                    title: data.downloadGallery,
                    status: 'success',
                });
            },
            onError: (error) => {
                toast({
                    title: 'Error downloading gallery',
                    description: error.message,
                    status: 'error',
                });
                console.error('Error downloading gallery: ', error);
            },
            refetchQueries: [
                {
                    query: FIND_GALLERY_QUERY,
                    variables: {
                        id: galleryId,
                        take: DEFAULT_GALLERY_PAGINATION_OFFSET,
                        skip: 0,
                    },
                },
            ],
        }
    );

    const handleDownloadGalleryById = async (id: string) => {
        await downloadGallery({
            variables: { id },
        });
    };

    return {
        downloadGallery: handleDownloadGalleryById,
        ...downloadMutationData,
    };
};

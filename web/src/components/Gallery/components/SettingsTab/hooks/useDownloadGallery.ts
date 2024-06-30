import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import { FIND_GALLERY_QUERY } from 'src/components/Gallery/hooks/useFindGallery';
import { DEFAULT_PAGINATION_OFFSET } from 'src/pages/GalleryPage/hooks/useGalleryPagination';

export const DOWNLOAD_GALLERY_MUTATION = gql`
    mutation DownloadGalleryMutation($id: String!) {
        downloadGallery(id: $id)
    }
`;

export const useDownloadGallery = (galleryId: string) => {
    const [downloadGallery, downloadMutationData] = useMutation(
        DOWNLOAD_GALLERY_MUTATION,
        {
            onCompleted: (data) => {
                toast.success(data.downloadGallery);
            },
            onError: (error) => {
                toast.error('Error downloading gallery: ' + error.message);
                console.error('Error downloading gallery: ', error);
            },
            refetchQueries: [
                {
                    query: FIND_GALLERY_QUERY,
                    variables: {
                        id: galleryId,
                        take: DEFAULT_PAGINATION_OFFSET,
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

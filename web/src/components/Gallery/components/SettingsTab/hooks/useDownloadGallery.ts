import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

export const DOWNLOAD_GALLERY_MUTATION = gql`
    mutation DownloadGalleryMutation($id: String!) {
        downloadGallery(id: $id)
    }
`;

export const useDownloadGallery = () => {
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
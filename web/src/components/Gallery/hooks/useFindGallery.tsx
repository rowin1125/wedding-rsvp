import { FindGalleryQuery, FindGalleryQueryVariables } from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import { DEFAULT_GALLERY_PAGINATION_OFFSET } from 'src/pages/GalleriesPage/components/GalleryForm/hooks/useGalleryForm';

import { useQueryControls } from '../../../pages/GalleryPage/hooks/useQueryControls';

export const FIND_GALLERY_QUERY = gql`
    query FindGalleryQuery($id: String!, $take: Int, $skip: Int) {
        gallery(id: $id) {
            id
            assets(take: $take, skip: $skip) {
                items {
                    id
                    url
                    gcloudStoragePath
                    fileType
                    metadata
                    thumbnailUrl
                    previewUrl
                }
                count
                pages
            }
            name
            qrCode
            qrCodeId
            weddingId
            totalDownloadRequests
            maxAllowedDownloads
            galleryDownloadRequests {
                createdAt
                updatedAt
                status
                validUntil
                downloadUrl
            }
        }
    }
`;

export const useFindGallery = () => {
    const { offset, setTotalPages } = useQueryControls();
    const { galleryId } = useParams();

    const { data, ...query } = useQuery<
        FindGalleryQuery,
        FindGalleryQueryVariables
    >(FIND_GALLERY_QUERY, {
        variables: {
            id: galleryId,
            take: DEFAULT_GALLERY_PAGINATION_OFFSET,
            skip: offset,
        },
        onCompleted: (data) => {
            setTotalPages(data.gallery?.assets.pages || 1);
        },
    });

    return {
        gallery: data?.gallery,
        ...query,
    };
};

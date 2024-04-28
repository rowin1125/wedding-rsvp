import { FindGalleryQuery, FindGalleryQueryVariables } from 'types/graphql';

import { useParams } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';

import {
    DEFAULT_PAGINATION_OFFSET,
    useGalleryPagination,
} from '../../../pages/GalleryPage/hooks/useGalleryPagination';

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
                }
                count
                pages
            }
            name
            weddingId
        }
    }
`;

export const useFindGallery = () => {
    const { offset } = useGalleryPagination();
    const { id } = useParams();
    const { setTotalPages } = useGalleryPagination();

    const { data, ...query } = useQuery<
        FindGalleryQuery,
        FindGalleryQueryVariables
    >(FIND_GALLERY_QUERY, {
        variables: {
            id,
            take: DEFAULT_PAGINATION_OFFSET,
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

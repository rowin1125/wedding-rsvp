import { GetMediaAssets, GetMediaAssetsVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { useQueryControls } from 'src/pages/GalleryPage/hooks/useQueryControls';

export type SingleAssetType = NonNullable<
    NonNullable<GetMediaAssets['mediaLibrary']>['assets']['items']
>[number];

export const GET_MEDIA_ASSETS = gql`
    query GetMediaAssets(
        $id: String!
        $skip: Int
        $take: Int
        $sortField: AssetSortField
        $sortOrder: SortOrder
        $query: String
        $fileTypes: [String!]
    ) {
        mediaLibrary(id: $id) {
            id
            createdAt
            gcloudStoragePath
            weddingId
            updatedAt
            maxAllowedAssets
            assets(
                skip: $skip
                take: $take
                sortField: $sortField
                sortOrder: $sortOrder
                query: $query
                fileTypes: $fileTypes
            ) {
                count
                totalCount
                items {
                    createdAt
                    previewUrl
                    thumbnailUrl
                    updatedAt
                    url
                    fileType
                    gcloudStoragePath
                    id
                    mediaLibraryId
                    originalFilename
                    mediaLibrary {
                        weddingId
                    }
                    title
                    altText
                    description
                    assetReferences {
                        id
                        objectReference
                        galleryReferences {
                            id
                            name
                        }
                        weddingReferences {
                            id
                            name
                        }
                        weddingRsvpLandingPage {
                            id
                            name
                        }
                    }
                }
                pages
            }
        }
    }
`;

export const DEFAULT_MEDIA_PAGINATION_OFFSET = 75;

export const useGetMediaAssets = () => {
    const { currentUser, loading: userLoading } = useAuth();
    const { offset, setTotalPages, currentSorting, finalSearchQuery } =
        useQueryControls();

    const mediaLibraryId = currentUser?.wedding?.mediaLibrary?.id as string;

    const { data, ...query } = useQuery<
        GetMediaAssets,
        GetMediaAssetsVariables
    >(GET_MEDIA_ASSETS, {
        variables: {
            id: mediaLibraryId,
            take: DEFAULT_MEDIA_PAGINATION_OFFSET,
            skip: offset,
            sortField: currentSorting?.sortField,
            sortOrder: currentSorting?.sortOrder,
            query: finalSearchQuery,
            fileTypes: ['image'],
        },
        skip: !mediaLibraryId,
        onCompleted: (data) =>
            setTotalPages(data.mediaLibrary?.assets.pages ?? 1),
    });

    return {
        mediaLibrary: data?.mediaLibrary,
        ...query,
        loading: userLoading || query.loading,
    };
};

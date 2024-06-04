import { useQuery } from '@apollo/client';
import { GetGalleriesQuery, GetGalleriesQueryVariables } from 'types/graphql';

import { useAuth } from 'src/auth';

export const GET_GALLERIES_BY_WEDDING_ID = gql`
    query GetGalleriesQuery($weddingId: String!) {
        galleries(weddingId: $weddingId) {
            id
            name
            weddingId
            assets {
                items {
                    id
                    url
                    fileType
                    thumbnailUrl
                }
            }
        }
    }
`;

export const useGetGalleries = () => {
    const { currentUser, loading: userLoading } = useAuth();
    const weddingId = currentUser?.weddingId as string;

    const { data, ...query } = useQuery<
        GetGalleriesQuery,
        GetGalleriesQueryVariables
    >(GET_GALLERIES_BY_WEDDING_ID, {
        variables: { weddingId },
        skip: !weddingId,
    });

    return {
        galleries: data?.galleries,
        ...query,
        loading: userLoading || query.loading,
    };
};

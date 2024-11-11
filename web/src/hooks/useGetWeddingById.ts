import { GetWeddingQuery, GetWeddingQueryVariables } from 'types/graphql';

import { useQuery } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { AssetBody } from 'src/lib/fragments/assetFragment';
import { PartnersBody } from 'src/lib/fragments/partnersFragment';
import { WeddingDayPartBody } from 'src/lib/fragments/weddingDayPartFragment';

export const GET_WEDDING_BY_ID = gql`
    query GetWeddingQuery($id: String!) {
        wedding(id: $id) {
            id
            name
            createdAt
            date
            theme
            isAbroad
            preferredSeason
            partners {
                ...PartnersBody
            }
            dayParts {
                ...WeddingDayPartBody
            }
            bannerImage {
                metadata {
                    focalPoint {
                        x
                        y
                    }
                }
                asset {
                    ...AssetBody
                }
            }
            weddingRsvpLandingPages {
                id
            }
        }
    }
    ${AssetBody.fragment}
    ${WeddingDayPartBody.fragment}
    ${PartnersBody.fragment}
`;

export const useGetWeddingById = (id?: string) => {
    const { currentUser } = useAuth();
    const weddingId = id ?? (currentUser?.weddingId as string);

    const { data, ...query } = useQuery<
        GetWeddingQuery,
        GetWeddingQueryVariables
    >(GET_WEDDING_BY_ID, {
        variables: { id: weddingId },
        skip: !weddingId,
    });

    return {
        wedding: data?.wedding,
        ...query,
    };
};

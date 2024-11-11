import { useToast } from '@chakra-ui/react';
import { Data } from '@measured/puck';
import {
    UpdateWeddingRsvpLandingPageMutation,
    UpdateWeddingRsvpLandingPageMutationVariables,
} from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

import {
    GET_WEDDING_RSVP_LANDING_PAGE,
    useGetWeddingRsvpLandingPage,
} from './useGetWeddingRsvpLandingPage';

export const UPDATE_WEDDING_RSVP_LANDING_PAGE = gql`
    mutation UpdateWeddingRsvpLandingPageMutation(
        $id: String!
        $input: UpdateWeddingRsvpInput!
    ) {
        updateWeddingRsvpLandingPage(id: $id, input: $input) {
            id
        }
    }
`;

export const useUpdateWeddingRsvpStudioData = () => {
    const { weddingRsvpLandingPage, loading } = useGetWeddingRsvpLandingPage();

    const toast = useToast();
    const { currentUser } = useAuth();
    const [updateWeddingRsvpLandingPage, updateWeddingRsvpLandingPageData] =
        useMutation<
            UpdateWeddingRsvpLandingPageMutation,
            UpdateWeddingRsvpLandingPageMutationVariables
        >(UPDATE_WEDDING_RSVP_LANDING_PAGE, {
            refetchQueries: [
                {
                    query: GET_WEDDING_RSVP_LANDING_PAGE,
                    variables: { id: weddingRsvpLandingPage?.id },
                },
            ],
        });

    const onSubmit = async (data: Partial<Data>) => {
        if (!currentUser?.weddingId) {
            toast({
                title: 'Er is iets fout gegaan',
                description: 'Je bent niet geauthenticeerd',
                status: 'error',
            });
            return;
        }

        if (!weddingRsvpLandingPage?.id) {
            toast({
                title: 'Er is iets fout gegaan',
                description: 'Er is geen landing page gevonden',
                status: 'error',
            });
            return;
        }

        const input: UpdateWeddingRsvpLandingPageMutationVariables['input'] = {
            isActive: weddingRsvpLandingPage.isActive,
            name: weddingRsvpLandingPage.name,
            password: weddingRsvpLandingPage.password,
            weddingDayPartsIds: weddingRsvpLandingPage.weddingDayParts.map(
                (dayPart) => dayPart?.id as string
            ),
            pageBuilderData: data,
        };

        try {
            await updateWeddingRsvpLandingPage({
                variables: { id: weddingRsvpLandingPage?.id, input },
            });
        } catch (error) {
            toast({
                title: 'Er is iets fout gegaan',
                description: error instanceof Error ? error.message : '',
                status: 'error',
            });
        }
    };

    return {
        onSubmit,
        ...updateWeddingRsvpLandingPageData,
        loading: loading || updateWeddingRsvpLandingPageData.loading,
    };
};

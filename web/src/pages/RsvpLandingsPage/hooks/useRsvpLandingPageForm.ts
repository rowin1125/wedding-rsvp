import { useDisclosure, useToast } from '@chakra-ui/react';
import {
    CreateWeddingRsvpLandingPageMutation,
    CreateWeddingRsvpLandingPageMutationVariables,
    UpdateWeddingRsvpLandingPageMutationVariables,
} from 'types/graphql';
import { InferType } from 'yup';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';
import { Salter } from 'src/helpers/Salter';

import { rsvpLandingPageValidationSchema } from '../components/RsvpLandingPageForm';
import { template1 } from '../lib/templates/template-1';
import { template2 } from '../lib/templates/template-2';

import { GET_WEDDING_RSVP_LANDING_PAGE } from './useGetWeddingRsvpLandingPage';
import { GET_WEDDING_RSVP_LANDING_PAGES } from './useGetWeddingRsvpLandingPages';

export const CREATE_WEDDING_RSVP_LANDING_PAGE = gql`
    mutation CreateWeddingRsvpLandingPageMutation(
        $input: CreateWeddingRsvpInput!
    ) {
        createWeddingRsvpLandingPage(input: $input) {
            id
        }
    }
`;

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

type UseRsvpLandingPageFormType = {
    disclosure?: ReturnType<typeof useDisclosure>;
    type: 'create' | 'update';
    id?: string;
    resetForm: () => void;
};

export const useRsvpLandingPageForm = ({
    disclosure,
    type,
    id,
    resetForm,
}: UseRsvpLandingPageFormType) => {
    const toast = useToast();
    const { currentUser } = useAuth();
    const [createWeddingRsvpLandingPage, createWeddingRsvpLandingPageData] =
        useMutation<
            CreateWeddingRsvpLandingPageMutation,
            CreateWeddingRsvpLandingPageMutationVariables
        >(CREATE_WEDDING_RSVP_LANDING_PAGE, {
            refetchQueries: [
                {
                    query: GET_WEDDING_RSVP_LANDING_PAGES,
                },
            ],
        });
    const [updateWeddingRsvpLandingPage, updateWeddingRsvpLandingPageData] =
        useMutation(UPDATE_WEDDING_RSVP_LANDING_PAGE, {
            refetchQueries: [
                {
                    query: GET_WEDDING_RSVP_LANDING_PAGES,
                },
                {
                    query: GET_WEDDING_RSVP_LANDING_PAGE,
                    variables: { id },
                },
            ],
        });

    const onSubmit = async (
        formData: InferType<typeof rsvpLandingPageValidationSchema>
    ) => {
        if (!currentUser?.weddingId) {
            toast({
                title: 'Er is iets fout gegaan',
                description: 'Je bent niet geauthenticeerd',
                status: 'error',
            });
            return;
        }
        let saltedPassword;

        if (formData.passwordRequired && formData.password) {
            const salter = new Salter();
            saltedPassword = await salter.saltString(formData.password);
        }

        try {
            if (type === 'update') {
                if (!id) {
                    toast({
                        title: 'Er is iets fout gegaan',
                        description: 'Er is geen id meegegeven',
                        status: 'error',
                    });
                    return;
                }

                const input: UpdateWeddingRsvpLandingPageMutationVariables['input'] =
                    {
                        name: formData.name,
                        weddingDayPartsIds: formData.weddingDayPartsIds,
                        weddingId: currentUser?.weddingId,
                        password: saltedPassword,
                        isActive: formData.isActive,
                        sidebarData: formData.sidebarData,
                    };

                await updateWeddingRsvpLandingPage({
                    variables: {
                        id,
                        input,
                    },
                });

                toast({
                    title: 'Succesvol geüpdatet',
                    description: 'De pagina is succesvol geüpdatet',
                    status: 'success',
                });
            } else {
                let pageBuilderData = {};
                switch (formData.template) {
                    case 'template-1':
                        pageBuilderData = template1;
                        break;
                    case 'template-2':
                        pageBuilderData = template2;
                        break;

                    default:
                        pageBuilderData = {};
                        break;
                }
                const input: CreateWeddingRsvpLandingPageMutationVariables['input'] =
                    {
                        name: formData.name,
                        weddingDayPartsIds: formData.weddingDayPartsIds,
                        weddingId: currentUser?.weddingId,
                        password: saltedPassword,
                        isActive: formData.isActive,
                        pageBuilderData: pageBuilderData,
                        sidebarData: formData.sidebarData,
                    };
                await createWeddingRsvpLandingPage({
                    variables: { input },
                });

                toast({
                    title: 'Succesvol aangemaakt',
                    description: 'De pagina is succesvol aangemaakt',
                    status: 'success',
                });
            }

            resetForm();
            disclosure?.onClose();
        } catch (error) {
            toast({
                title: 'Er is iets fout gegaan',
                description:
                    'Er is iets fout gegaan bij het aanmaken van de pagina',
                status: 'error',
            });
        }
    };

    return {
        onSubmit,
        createWeddingRsvpLandingPageData,
        isLoading:
            createWeddingRsvpLandingPageData.loading ||
            updateWeddingRsvpLandingPageData.loading,
    };
};

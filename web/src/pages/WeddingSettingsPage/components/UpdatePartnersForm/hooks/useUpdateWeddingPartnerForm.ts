import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    GetWeddingQuery,
    UpdatePartnersMutation,
    UpdatePartnersMutationVariables,
} from 'types/graphql';
import { array, InferType, object, string } from 'yup';

import { useMutation } from '@redwoodjs/web';

import { GET_WEDDING_BY_ID } from 'src/hooks/useGetWeddingById';

type UseUpdateWeddingPartnerFormType = {
    initialPartnerValues: NonNullable<GetWeddingQuery['wedding']>['partners'];
};

export const UPDATE_PARTNERS = gql`
    mutation UpdatePartnersMutation(
        $input: [UpdatePartnerInput!]!
        $ids: [String!]!
    ) {
        updatePartners(input: $input, ids: $ids) {
            id
        }
    }
`;

export const useUpdateWeddingPartnerForm = ({
    initialPartnerValues,
}: UseUpdateWeddingPartnerFormType) => {
    const toast = useToast();
    const validationSchema = object().shape({
        partners: array()
            .of(
                object({
                    firstName: string().required('Voornaam is verplicht'),
                    lastName: string().required('Achternaam is verplicht'),
                    gender: string()
                        .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Ongeldig geslacht')
                        .required('Geslacht is verplicht'),
                    type: string()
                        .oneOf(['GROOM', 'BRIDE'], 'Ongeldig type partner')
                        .required('Type partner is verplicht'),
                })
            )
            .min(2, 'Er moeten minimaal 2 partners zijn'),
    });

    const filteredInitialPartnerValues = initialPartnerValues?.filter(
        (partner) => partner !== null
    );

    const initialValues: InferType<typeof validationSchema> = {
        partners: filteredInitialPartnerValues
            ? filteredInitialPartnerValues
            : [
                  {
                      firstName: '',
                      lastName: '',
                      gender: 'MALE',
                      type: 'GROOM',
                  },
                  {
                      firstName: '',
                      lastName: '',
                      gender: 'FEMALE',
                      type: 'BRIDE',
                  },
              ],
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'onBlur',
    });

    const [updatePartners, mutationMeta] = useMutation<
        UpdatePartnersMutation,
        UpdatePartnersMutationVariables
    >(UPDATE_PARTNERS, {
        refetchQueries: [
            {
                query: GET_WEDDING_BY_ID,
                variables: {
                    id: filteredInitialPartnerValues[0].weddingId,
                },
            },
        ],
    });

    const onSubmit = async (data: InferType<typeof validationSchema>) => {
        if (!data.partners) {
            return;
        }

        const partnersWithIds = data.partners.map((partner, index) => ({
            ...partner,
            id: filteredInitialPartnerValues[index]?.id,
        }));

        try {
            await updatePartners({
                variables: {
                    ids: partnersWithIds.map((partner) => partner.id),
                    input: partnersWithIds.map((partner) => ({
                        firstName: partner.firstName,
                        lastName: partner.lastName,
                        gender: partner.gender,
                        type: partner.type,
                    })),
                },
            });
            toast({
                title: 'Partners bijgewerkt',
                description: 'Partners zijn bijgewerkt',
                status: 'success',
            });
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Er is iets fout gegaan',
                    description: error.message,
                    status: 'error',
                });
            }
        }
    };

    return {
        methods,
        onSubmit,
        ...mutationMeta,
    };
};

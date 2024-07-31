import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, array, string, InferType } from 'yup';

import { useWeddingFormContext } from '../context/WeddingFormContext';

type UseWeddingPartnerFormType = {
    handleNext: () => void;
};

export const useWeddingPartnerForm = ({
    handleNext,
}: UseWeddingPartnerFormType) => {
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

    const { globalFormState } = useWeddingFormContext();
    const [globalFormValues, setGlobalFormState] = globalFormState ?? [];

    const initialValues: InferType<typeof validationSchema> = {
        partners: globalFormValues?.partners
            ? globalFormValues?.partners
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

    const onSubmit = (data: InferType<typeof validationSchema>) => {
        if (!globalFormState) {
            throw new Error('Global form state is not defined');
        }

        setGlobalFormState?.((prev) => ({
            ...prev,
            partners: data.partners,
        }));

        handleNext();
    };

    return {
        methods,
        onSubmit,
    };
};

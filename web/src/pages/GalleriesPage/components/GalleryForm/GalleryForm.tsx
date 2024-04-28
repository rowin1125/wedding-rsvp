import React from 'react';

import { Button, Flex, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { FindGalleryQuery } from 'types/graphql';
import { InferType, object, string } from 'yup';

import { toast } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

import { useGalleryForm } from './hooks/useGalleryForm';

type GalleryFormProps =
    | {
          initialData?: FindGalleryQuery['gallery'];
          formType: 'create';
          onClose?: () => void;
      }
    | {
          initialData: FindGalleryQuery['gallery'];
          formType: 'update';
          onClose?: () => void;
      };

const validationSchema = object({
    name: string().required('Naam is verplicht'),
});

const GalleryForm = ({ initialData, formType, onClose }: GalleryFormProps) => {
    const { createGallery, updateGallery, loading } = useGalleryForm();
    const { currentUser } = useAuth();

    const defaultValues = {
        name: initialData?.name || '',
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: InferType<typeof validationSchema>) => {
        try {
            if (formType === 'create') {
                if (!currentUser?.weddingId) {
                    toast.error('Wedding not found');
                    return;
                }
                await createGallery({
                    variables: {
                        input: {
                            name: data.name,
                            weddingId: currentUser?.weddingId,
                        },
                    },
                });
            } else if (formType === 'update') {
                if (!initialData?.id) {
                    toast.error('Gallery not found');
                    return;
                }

                if (!initialData?.weddingId) {
                    toast.error('Wedding not found');
                    return;
                }

                await updateGallery({
                    variables: {
                        id: initialData?.id,
                        input: {
                            weddingId: initialData?.weddingId,
                            name: data.name,
                        },
                    },
                });
            }

            methods.reset({ name: data.name });

            toast.success('Galerij succesvol opgeslagen');
            onClose?.();
        } catch (err) {
            const error = err as Error;

            toast.error(error.message);
        }
    };

    return (
        <FormProvider {...methods}>
            <VStack
                as="form"
                onSubmit={methods.handleSubmit(onSubmit)}
                align="start"
                spacing={5}
            >
                <InputControl
                    name="name"
                    label="Galerij naam"
                    inputProps={{
                        placeholder: "Dag foto's",
                    }}
                />

                <Flex alignItems="center" justifyContent="flex-end" w="full">
                    {onClose && (
                        <Button mr={3} variant="ghost" onClick={onClose}>
                            Sluiten
                        </Button>
                    )}
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading}
                    >
                        {formType === 'create' ? 'Aanmaken' : 'Bewerken'}
                    </SubmitButton>
                </Flex>
            </VStack>
        </FormProvider>
    );
};

export default GalleryForm;

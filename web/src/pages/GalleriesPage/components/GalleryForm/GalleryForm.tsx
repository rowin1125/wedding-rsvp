import React from 'react';

import { Button, Flex, useToast, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { FindGalleryQuery } from 'types/graphql';
import { InferType, number, object, string } from 'yup';

import { useAuth } from 'src/auth';
import InputControl from 'src/components/react-hook-form/components/InputControl';
import SelectAssetControl from 'src/components/react-hook-form/components/SelectAssetControl';
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
    bannerImage: object({
        id: string(),
        focalPoint: object({
            x: number(),
            y: number(),
        }),
    }),
});

const GalleryForm = ({ initialData, formType, onClose }: GalleryFormProps) => {
    const { createGallery, updateGallery, loading } = useGalleryForm();
    const { currentUser } = useAuth();
    const toast = useToast();

    const defaultValues = {
        name: initialData?.name || '',
        bannerImage: {
            id: initialData?.bannerImage?.asset.id || '',
            focalPoint: {
                x: initialData?.bannerImage?.metadata?.focalPoint?.x || 50,
                y: initialData?.bannerImage?.metadata?.focalPoint?.y || 50,
            },
        },
    };

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const formHasChanged = methods.formState.isDirty;

    const onSubmit = async (data: InferType<typeof validationSchema>) => {
        try {
            if (formType === 'create') {
                if (!currentUser?.weddingId) {
                    toast({
                        title: 'Wedding niet gevonden',
                        description: 'Er is geen wedding gevonden',
                        status: 'error',
                    });
                    return;
                }
                await createGallery({
                    variables: {
                        input: {
                            name: data.name,
                            weddingId: currentUser?.weddingId,
                            bannerImageId: data.bannerImage.id || null,
                            bannerImageMetadata: data.bannerImage.id
                                ? {
                                      focalPoint: {
                                          x: data.bannerImage.focalPoint.x,
                                          y: data.bannerImage.focalPoint.y,
                                      },
                                  }
                                : null,
                        },
                    },
                });
            } else if (formType === 'update') {
                if (!initialData?.id) {
                    toast({
                        title: 'Gallery niet gevonden',
                        description: 'Er is geen gallery gevonden',
                        status: 'error',
                    });
                    return;
                }

                if (!initialData?.weddingId) {
                    toast({
                        title: 'Wedding niet gevonden',
                        description: 'Er is geen wedding gevonden',
                        status: 'error',
                    });
                    return;
                }

                await updateGallery({
                    variables: {
                        id: initialData?.id,
                        input: {
                            weddingId: initialData?.weddingId,
                            name: data.name,
                            bannerImageId: data.bannerImage.id || null,
                            bannerImageMetadata: data.bannerImage.id
                                ? {
                                      focalPoint: {
                                          x: data.bannerImage.focalPoint.x,
                                          y: data.bannerImage.focalPoint.y,
                                      },
                                  }
                                : null,
                        },
                    },
                });
            }

            methods.reset({ name: data.name, bannerImage: data.bannerImage });

            toast({
                title: 'Galerij succesvol opgeslagen',
                status: 'success',
            });
            onClose?.();
        } catch (err) {
            const error = err as Error;

            toast({
                title: 'Er is iets misgegaan',
                description: error.message,
                status: 'error',
            });
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
                <SelectAssetControl name="bannerImage" />

                <Flex alignItems="center" justifyContent="flex-end" w="full">
                    {onClose && (
                        <Button mr={3} variant="ghost" onClick={onClose}>
                            Sluiten
                        </Button>
                    )}
                    <SubmitButton
                        colorScheme="secondary"
                        isLoading={loading}
                        isDisabled={loading || !formHasChanged}
                    >
                        {formType === 'create' ? 'Aanmaken' : 'Bewerken'}
                    </SubmitButton>
                </Flex>
            </VStack>
        </FormProvider>
    );
};

export default GalleryForm;

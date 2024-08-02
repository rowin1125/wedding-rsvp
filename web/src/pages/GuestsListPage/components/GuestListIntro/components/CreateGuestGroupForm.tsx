import React from 'react';

import {
    Box,
    BoxProps,
    Button,
    ButtonGroup,
    Flex,
    Grid,
    GridItem,
    useDisclosure,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import CheckboxSingleControl from 'src/components/react-hook-form/components/FormCheckbox/components/CheckboxSingle';
import SubmitButton from 'src/components/react-hook-form/components/SubmitButton';

import { useCreateGuestsGroupForm } from '../hooks/useCreateGuestsGroupForm';

import CreateGuestGroupAddressInfo from './CreateGuestGroupAddressInfo';
import CreateGuestGroupBasicInfo from './CreateGuestGroupBasicInfo';
import CreateGuestGroupInitialGuestInfo from './CreateGuestGroupInitialGuestInfo';
import CreateGuestGroupPersonalInfo from './CreateGuestGroupPersonalInfo';

type CreateGuestGroupFormProps = {
    disclosure: ReturnType<typeof useDisclosure>;
} & BoxProps;

const CreateGuestGroupForm = ({
    disclosure,
    ...props
}: CreateGuestGroupFormProps) => {
    const { onSubmit, methods } = useCreateGuestsGroupForm({ disclosure });

    return (
        <>
            <FormProvider {...methods}>
                <Box
                    as="form"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    {...props}
                >
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <CreateGuestGroupBasicInfo />
                        <CreateGuestGroupInitialGuestInfo
                            control={methods.control}
                        />
                        <CreateGuestGroupPersonalInfo
                            control={methods.control}
                        />
                        <CreateGuestGroupAddressInfo />
                        <GridItem colSpan={2}>
                            <Box as="hr" my={4} />
                        </GridItem>
                        <GridItem colSpan={{ base: 2 }}>
                            <CheckboxSingleControl
                                formLabel="Afkomstig uit het buitenland"
                                name="livesAbroad"
                                label="Deze gast(en) wonen in het buitenland"
                            />
                        </GridItem>
                    </Grid>
                    <Flex justifyContent="flex-end" mt={4}>
                        <ButtonGroup spacing={4}>
                            <Button
                                onClick={disclosure.onClose}
                                colorScheme="tertiary"
                                variant="outline"
                            >
                                Annuleren
                            </Button>
                            <SubmitButton>Gastengroep aanmaken </SubmitButton>
                        </ButtonGroup>
                    </Flex>
                </Box>
            </FormProvider>
        </>
    );
};

export default CreateGuestGroupForm;

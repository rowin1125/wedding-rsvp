import React from 'react';

import { VStack } from '@chakra-ui/react';

import InputControl from 'src/components/react-hook-form/components/InputControl';
import TextareaControl from 'src/components/react-hook-form/components/TextareaControl';

const MediaAssetForm = () => {
    return (
        <VStack align="start" spacing={5}>
            <InputControl
                name="originalFilename"
                label="Bestandsnaam"
                inputProps={{
                    placeholder: 'Geef het een mooie naam',
                }}
            />
            <InputControl name="title" label="Title" />
            <InputControl name="altText" label="Alt tekst" />
            <TextareaControl
                name="description"
                label="Omschrijving"
                textareaProps={{
                    rows: 4,
                }}
            />
        </VStack>
    );
};

export default MediaAssetForm;

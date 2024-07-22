import React from 'react';

import { Alert, AlertIcon, Text } from '@chakra-ui/react';
import { GetMediaAssets } from 'types/graphql';

type MediaLibraryInfoAlertProps = {
    noFilesRemaining: boolean;
    maxFilesRemaining: number;
    mediaLibrary: GetMediaAssets['mediaLibrary'];
    filesCurrentlyUploaded: number;
};

const MediaLibraryInfoAlert = ({
    maxFilesRemaining,
    mediaLibrary,
    noFilesRemaining,
    filesCurrentlyUploaded,
}: MediaLibraryInfoAlertProps) => {
    if (!mediaLibrary) return null;

    return (
        <Alert
            status={
                noFilesRemaining
                    ? 'error'
                    : maxFilesRemaining < 10
                    ? 'warning'
                    : 'success'
            }
            mt={6}
        >
            <AlertIcon />
            <Text>
                In kunt in totaal{' '}
                <strong>{mediaLibrary.maxAllowedAssets}</strong> uploaden naar
                de media bibliotheek. Je hebt er momenteel{' '}
                <strong>{filesCurrentlyUploaded ?? 0}</strong> geupload en dus
                nog <strong>{maxFilesRemaining}</strong> over.
            </Text>
        </Alert>
    );
};

export default MediaLibraryInfoAlert;

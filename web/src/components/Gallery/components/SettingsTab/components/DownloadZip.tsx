import React, { useState } from 'react';

import { DownloadIcon } from '@chakra-ui/icons';
import { Heading, Alert, AlertIcon, Button, Box, Text } from '@chakra-ui/react';
import { FindGalleryQuery } from 'types/graphql';

import { useDownloadGallery } from '../hooks/useDownloadGallery';

type DownloadZipProps = {
    gallery: NonNullable<FindGalleryQuery['gallery']>;
};

const DownloadZip = ({ gallery }: DownloadZipProps) => {
    const { downloadGallery, loading: downloadLoading } = useDownloadGallery();
    const [requestDownload, setRequestDownload] = useState(false);

    const downloadRequestAt = gallery.downloadRequestAt
        ? new Date(gallery.downloadRequestAt)
        : new Date();
    const downloadLink = gallery.downloadUrl;
    const hours = ('0' + downloadRequestAt.getHours()).slice(-2);
    const minutes = ('0' + downloadRequestAt.getMinutes()).slice(-2);
    const seconds = ('0' + downloadRequestAt.getSeconds()).slice(-2);

    const initialDate = downloadRequestAt;
    const validTillDate = new Date(
        initialDate.setHours(initialDate.getHours() + 24)
    );

    const isValid = validTillDate > new Date();

    return (
        <Box>
            <Heading as="h2" size="h2">
                Download opties
            </Heading>
            {!isValid && !!downloadLink && (
                <Alert status="warning" my={6}>
                    <AlertIcon />
                    <Text>
                        De download link is verlopen. Vraag een nieuwe download
                        aan.
                    </Text>
                </Alert>
            )}
            {!!downloadLink && isValid && (
                <>
                    <Alert status="success" my={6}>
                        <AlertIcon />
                        <Box>
                            {gallery.downloadRequestAt && (
                                <Text fontSize="xs" fontStyle="italic">
                                    <strong>Zip bestand van:</strong>{' '}
                                    {new Date(
                                        gallery.downloadRequestAt
                                    ).toLocaleDateString()}{' '}
                                    - {hours}:{minutes}:{seconds}
                                </Text>
                            )}
                            {gallery.downloadRequestAt && (
                                <Text fontSize="xs" fontStyle="italic">
                                    <strong>Geldig tot:</strong>{' '}
                                    {new Date(
                                        validTillDate
                                    ).toLocaleDateString()}{' '}
                                    - {hours}:{minutes}:{seconds}
                                </Text>
                            )}
                            <Text mt={2}>
                                Je kunt de galerij downloaden via de volgende
                                link:
                            </Text>
                            <Box>
                                <Button
                                    variant="link"
                                    color="blue.500"
                                    as="a"
                                    href={downloadLink}
                                    target="_blank"
                                    textDecor={'underline'}
                                >
                                    Download zip
                                </Button>
                            </Box>
                        </Box>
                    </Alert>
                </>
            )}
            {!downloadLink && (
                <>
                    <Alert status="info" my={6}>
                        <AlertIcon />
                        <Text>
                            Je hebt nog geen download aangevraagd of deze is
                            verlopen voor deze galerij. Vraag een download aan
                            om de galerij te downloaden. Dit kan enkele minuten
                            duren, afhankelijk van de grootte van de galerij.
                        </Text>
                    </Alert>
                </>
            )}
            <Button
                variant="solid"
                mr={4}
                colorScheme="tertiary"
                isLoading={downloadLoading}
                isDisabled={requestDownload || gallery.downloadPending}
                onClick={async () => {
                    setRequestDownload(true);
                    await downloadGallery(gallery.id);
                }}
            >
                <DownloadIcon color="white" mr={2} />
                Vraag download aan
            </Button>
        </Box>
    );
};

export default DownloadZip;

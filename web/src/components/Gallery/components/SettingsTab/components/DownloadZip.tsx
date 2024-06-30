import React, { useEffect, useState } from 'react';

import {
    Heading,
    Box,
    Alert,
    AlertIcon,
    Text,
    Button,
    Icon,
    Tooltip,
} from '@chakra-ui/react';
import { TbReload } from 'react-icons/tb';
import { FindGalleryQuery } from 'types/graphql';

import { useDownloadGallery } from '../hooks/useDownloadGallery';

type DownloadZipProps = {
    gallery: NonNullable<FindGalleryQuery['gallery']>;
};

const DownloadZip = ({ gallery }: DownloadZipProps) => {
    const { downloadGallery, loading: downloadLoading } = useDownloadGallery(
        gallery.id
    );
    const [requestDownload, setRequestDownload] = useState(false);
    const latestDownloadRequest = gallery.galleryDownloadRequests[0];

    useEffect(() => {
        if (!latestDownloadRequest) return;

        setRequestDownload(latestDownloadRequest.status === 'PENDING');
    }, [latestDownloadRequest]);

    const downloadLink = latestDownloadRequest?.downloadUrl || null;
    const createdAt = new Date(latestDownloadRequest?.createdAt ?? new Date());

    const hours = ('0' + createdAt.getHours()).slice(-2);
    const minutes = ('0' + createdAt.getMinutes()).slice(-2);
    const seconds = ('0' + createdAt.getSeconds()).slice(-2);

    const isValid = latestDownloadRequest?.validUntil
        ? new Date(latestDownloadRequest?.validUntil) > new Date()
        : false;

    const thirtyMinutes = 30 * 60 * 1000;
    const latestDownloadRequestIsWithin30Min = latestDownloadRequest
        ? new Date(latestDownloadRequest?.createdAt).getTime() + thirtyMinutes >
              new Date().getTime() &&
          latestDownloadRequest?.status !== 'SUCCESS'
        : false;

    const maxDownloadsReached =
        gallery.totalDownloadRequests >= gallery.maxAllowedDownloads;

    return (
        <Box>
            <Heading as="h2" size="h2">
                Download opties
            </Heading>
            {/* No download */}
            {!latestDownloadRequest && (
                <Alert status="info" my={6}>
                    <AlertIcon />
                    <Box>
                        <Text>
                            Je hebt nog geen download aangevraagd. Vraag een
                            download aan om de galerij te downloaden. Dit kan
                            enkele minuten duren, afhankelijk van de grootte van
                            de galerij.
                        </Text>
                        <br />
                        <Text>
                            In totaal heb je{' '}
                            <strong>{gallery.maxAllowedDownloads}</strong>{' '}
                            downloads tegoed. Als je meer downloads nodig hebt,
                            neem dan contact op via de klantenservice.
                        </Text>
                    </Box>
                </Alert>
            )}
            {/* Pending download */}
            {latestDownloadRequest &&
                latestDownloadRequest.status === 'PENDING' && (
                    <Alert status="info" my={6}>
                        <AlertIcon />
                        <Box>
                            <Text fontSize="xs" fontStyle="italic">
                                <strong>Aangevraagd op:</strong>{' '}
                                {createdAt.toLocaleDateString()} - {hours}:
                                {minutes}:{seconds}
                            </Text>
                            <br />
                            <Text>
                                Je download is nog niet klaar. Dit kan enkele
                                minuten duren, afhankelijk van de grootte van de
                                galerij.
                            </Text>
                            <br />
                            <Text>
                                In totaal heb je{' '}
                                <strong>{gallery.maxAllowedDownloads}</strong>{' '}
                                downloads tegoed. Als je meer downloads nodig
                                hebt, neem dan contact op via de klantenservice.
                            </Text>
                        </Box>
                    </Alert>
                )}
            {/* Completed download */}
            {latestDownloadRequest &&
                latestDownloadRequest.status === 'SUCCESS' &&
                downloadLink && (
                    <Alert status="success" my={6}>
                        <AlertIcon />
                        <Box>
                            <Text fontSize="xs" fontStyle="italic">
                                <strong>Zip bestand van:</strong>{' '}
                                {createdAt.toLocaleDateString()} - {hours}:
                                {minutes}:{seconds}
                            </Text>
                            <Text fontSize="xs" fontStyle="italic">
                                <strong>Geldig tot:</strong>{' '}
                                {new Date(
                                    latestDownloadRequest.validUntil
                                        ? latestDownloadRequest.validUntil
                                        : latestDownloadRequest.createdAt
                                ).toLocaleDateString()}{' '}
                                - {hours}:{minutes}:{seconds}
                            </Text>
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
                )}
            {/* Expired download */}
            {latestDownloadRequest && !isValid && (
                <Alert status="warning" my={6}>
                    <AlertIcon />
                    <Text>
                        De download link is verlopen. Vraag een nieuwe download
                        aan.
                    </Text>
                </Alert>
            )}
            <Text my={6} color={maxDownloadsReached ? 'red.500' : 'green.500'}>
                <strong>{gallery.totalDownloadRequests}</strong> van de{' '}
                <strong>{gallery.maxAllowedDownloads}</strong> downloads
                gebruikt
            </Text>
            <Button
                variant="solid"
                mr={4}
                colorScheme="tertiary"
                isLoading={downloadLoading}
                isDisabled={
                    requestDownload ||
                    latestDownloadRequestIsWithin30Min ||
                    maxDownloadsReached
                }
                onClick={async () => {
                    if (
                        latestDownloadRequestIsWithin30Min ||
                        maxDownloadsReached
                    )
                        return;
                    setRequestDownload(true);
                    await downloadGallery(gallery.id);
                }}
            >
                Vraag download aan
            </Button>
            {requestDownload && (
                <Tooltip
                    label="Reload de pagina om de download link te zien. Dit kan enkele minuten duren. Indien dit na een lange periode nog niet werkt kun je een nieuwe download forceren. Indien dit niet werkt, neem dan contact op met de beheerder. Dit kan maximaal 1x per 30 minuten."
                    aria-label="Reload de pagina om de download link te zien. Dit kan enkele minuten duren. Indien dit na een lange periode nog niet werkt kun je een nieuwe download forceren. Indien dit niet werkt, neem dan contact op met de beheerder. Dit kan maximaal 1x per 30 minuten."
                >
                    <Button
                        variant="link"
                        color="blue.500"
                        onClick={() => setRequestDownload(false)}
                        isDisabled={latestDownloadRequestIsWithin30Min}
                    >
                        <Icon as={TbReload} color="blue.500" mr={2} />
                        Forceer nog een download
                    </Button>
                </Tooltip>
            )}
        </Box>
    );
};

export default DownloadZip;

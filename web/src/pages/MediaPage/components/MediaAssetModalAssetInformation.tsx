import React, { useState } from 'react';

import {
    Box,
    Button,
    Flex,
    GridItem,
    Icon,
    List,
    ListItem,
    Text,
} from '@chakra-ui/react';
import { BiPhotoAlbum } from 'react-icons/bi';
import { GiDiamondRing } from 'react-icons/gi';
import { RiExternalLinkLine } from 'react-icons/ri';

import { Link, routes } from '@redwoodjs/router';

import { SingleAssetType } from '../hooks/useGetMediaAssets';

import MediaAssetForm from './MediaAssetForm';

type MediaAssetModalAssetInformationProps = {
    currentAsset: SingleAssetType;
};

const MediaAssetModalAssetInformation = ({
    currentAsset,
}: MediaAssetModalAssetInformationProps) => {
    const [detailsSelected, setDetailsSelected] = useState(true);

    return (
        <GridItem colSpan={{ base: 2, lg: 1 }}>
            <Flex mb={4}>
                <Button
                    mr={2}
                    variant={detailsSelected ? 'solid' : 'ghost'}
                    onClick={() => setDetailsSelected(true)}
                >
                    Details
                </Button>
                <Button
                    onClick={() => setDetailsSelected(false)}
                    ml={2}
                    variant={detailsSelected ? 'ghost' : 'solid'}
                >
                    Referenties ( {currentAsset?.assetReferences?.length} )
                </Button>
            </Flex>
            {detailsSelected && <MediaAssetForm />}
            {!detailsSelected && (
                <Box
                    borderWidth={1}
                    borderColor="primary.400"
                    py={2}
                    px={4}
                    borderRadius="sm"
                >
                    <List spacing={3}>
                        {currentAsset?.assetReferences?.map((reference) => {
                            const hasGalleryReference =
                                !!reference?.galleryReferences?.id;
                            const hasWeddingReference =
                                !!reference?.weddingReferences?.id;
                            const hasRsvpWeddingReference =
                                !!reference?.weddingRsvpLandingPage?.id;

                            return (
                                <ListItem
                                    key={reference?.id}
                                    p={4}
                                    transition="all ease-in-out 0.2s"
                                    borderRadius="sm"
                                    _hover={{
                                        bgColor: 'primary.200',
                                    }}
                                >
                                    <Link
                                        to={
                                            reference?.galleryReferences?.id
                                                ? routes.gallery({
                                                      galleryId:
                                                          reference
                                                              ?.galleryReferences
                                                              ?.id,
                                                      tab: 'settings',
                                                  })
                                                : hasRsvpWeddingReference
                                                ? routes.rsvpLandingPageStudio({
                                                      landingPageId: reference
                                                          .weddingRsvpLandingPage
                                                          ?.id as string,
                                                      weddingId: currentAsset
                                                          .mediaLibrary
                                                          ?.weddingId as string,
                                                  })
                                                : routes.weddingSettings()
                                        }
                                    >
                                        {hasGalleryReference && (
                                            <Flex
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Flex alignItems="center">
                                                    <Icon
                                                        as={BiPhotoAlbum}
                                                        mr={4}
                                                        fontSize="xl"
                                                    />
                                                    <Text>
                                                        <strong>
                                                            Fotoalbum:
                                                        </strong>{' '}
                                                        {
                                                            reference
                                                                ?.galleryReferences
                                                                ?.name
                                                        }
                                                    </Text>
                                                </Flex>
                                                <Icon
                                                    as={RiExternalLinkLine}
                                                    color="secondary.900"
                                                    fontSize="xl"
                                                />
                                            </Flex>
                                        )}
                                        {hasWeddingReference && (
                                            <Flex
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Flex alignItems="center">
                                                    <Icon
                                                        as={GiDiamondRing}
                                                        mr={4}
                                                        fontSize="xl"
                                                    />
                                                    <Text>
                                                        <strong>
                                                            Bruiloft settings:
                                                        </strong>{' '}
                                                        {
                                                            reference
                                                                ?.weddingReferences
                                                                ?.name
                                                        }
                                                    </Text>
                                                </Flex>
                                                <Icon
                                                    as={RiExternalLinkLine}
                                                    color="secondary.900"
                                                    fontSize="xl"
                                                />
                                            </Flex>
                                        )}
                                        {hasRsvpWeddingReference && (
                                            <Flex
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Flex alignItems="center">
                                                    <Icon
                                                        as={GiDiamondRing}
                                                        mr={4}
                                                        fontSize="xl"
                                                    />
                                                    <Text>
                                                        <strong>
                                                            Rsvp landingspagina:
                                                        </strong>{' '}
                                                        {
                                                            reference
                                                                ?.weddingRsvpLandingPage
                                                                ?.name
                                                        }
                                                    </Text>
                                                </Flex>
                                                <Icon
                                                    as={RiExternalLinkLine}
                                                    color="secondary.900"
                                                    fontSize="xl"
                                                />
                                            </Flex>
                                        )}
                                    </Link>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            )}
        </GridItem>
    );
};

export default MediaAssetModalAssetInformation;

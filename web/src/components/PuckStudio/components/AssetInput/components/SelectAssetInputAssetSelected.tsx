import React from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
    useDisclosure,
    Alert,
    AlertIcon,
    Flex,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Text,
} from '@chakra-ui/react';
import { BiDotsVertical } from 'react-icons/bi';
import { IoImageOutline } from 'react-icons/io5';

import { FocalPoint } from 'src/components/FocalPoint';
import ResolveAssetType from 'src/components/ImageGallery/components/ResolveAssetType';
import { BannerBlockProps } from 'src/components/PuckStudio/blocks/BannerBlock';

import { useDeleteAssetReference } from '../hooks/useDeleteAssetReference';

type SelectAssetInputAssetSelectedProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    assetReference?: BannerBlockProps['assetReference'];
    focalPoint: FocalPoint;
    setFocalPoint: React.Dispatch<React.SetStateAction<FocalPoint>>;
    onChange: (value: BannerBlockProps['assetReference']) => void;
};

const SelectAssetInputAssetSelected = ({
    assetReference,
    disclosure,
    focalPoint,
    setFocalPoint,
    onChange,
}: SelectAssetInputAssetSelectedProps) => {
    const { deleteAssetReference, loading } = useDeleteAssetReference();
    if (!assetReference) return null;

    const handleDelete = async () => {
        onChange(undefined);
        setFocalPoint({
            x: 50,
            y: 50,
        });

        await deleteAssetReference({
            variables: {
                id: assetReference.id,
                objectReference: assetReference.objectReference,
            },
        });
    };

    return (
        <>
            {assetReference.asset.fileType.includes('image') && (
                <Alert mt={2} status="info" variant="left-accent">
                    <AlertIcon />
                    <Text
                        fontSize="x-small"
                        display={{ base: 'none', lg: 'block' }}
                    >
                        Versleep het bolletje op de afbeelding om een focuspunt
                        in te stellen.
                    </Text>
                    <Text fontSize="x-small" display={{ lg: 'none' }}>
                        Je kunt op de afbeelding klikken om een focuspunt in te
                        stellen.
                    </Text>
                </Alert>
            )}
            <Flex position="relative">
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<BiDotsVertical />}
                        variant="solid"
                        position="absolute"
                        right={2}
                        top={2}
                        zIndex={10}
                    />
                    <MenuList zIndex={10}>
                        <MenuItem
                            icon={<IoImageOutline />}
                            onClick={disclosure.onOpen}
                        >
                            Nieuwe asset selecteren
                        </MenuItem>
                        <MenuItem
                            isDisabled={loading}
                            icon={<DeleteIcon />}
                            onClick={handleDelete}
                        >
                            Verwijder huidige asset
                        </MenuItem>
                    </MenuList>
                </Menu>

                <ResolveAssetType
                    fileType={assetReference.asset.fileType}
                    imageProps={{
                        src: assetReference.asset.url,
                        thumbnailUrl: assetReference.asset.thumbnailUrl,
                        w: 'full!important',
                        h: 'auto!important',
                        minH: '600px',
                        objectFit: 'cover',
                        borderRadius: 'md',
                        focalPoint: {
                            setFocalPoint,
                            focalPoint,
                        },
                        imageProps: {
                            objectFit: 'contain',
                            maxH: 'auto',
                            w: 'full',
                        },
                    }}
                    videoProps={{
                        src: assetReference.asset.url,
                        w: 'full!important',
                        h: 'auto!important',
                        objectFit: 'cover',
                        borderRadius: 'md',
                        mr: 4,
                    }}
                />
            </Flex>
        </>
    );
};

export default SelectAssetInputAssetSelected;

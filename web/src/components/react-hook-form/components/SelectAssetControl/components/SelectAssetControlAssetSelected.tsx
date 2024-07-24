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
import { useFormContext } from 'react-hook-form';
import { BiDotsVertical } from 'react-icons/bi';
import { IoImageOutline } from 'react-icons/io5';

import { FocalPoint } from 'src/components/FocalPoint';
import ResolveAssetType from 'src/components/ImageGallery/components/ResolveAssetType';
import { SingleAssetType } from 'src/pages/MediaPage/hooks/useGetMediaAssets';

type SelectAssetControlAssetSelectedProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    currentAsset?: SingleAssetType | null;
    name: string;
    focalPoint: FocalPoint;
    setFocalPoint: React.Dispatch<React.SetStateAction<FocalPoint>>;
};

const SelectAssetControlAssetSelected = ({
    currentAsset,
    disclosure,
    name,
    focalPoint,
    setFocalPoint,
}: SelectAssetControlAssetSelectedProps) => {
    const { setValue } = useFormContext();
    if (!currentAsset) return null;

    return (
        <>
            {currentAsset.fileType.includes('image') && (
                <Alert mt={2} status="info" variant="left-accent">
                    <AlertIcon />
                    <Text display={{ base: 'none', lg: 'block' }}>
                        Versleep het bolletje op de afbeelding om een focuspunt
                        in te stellen.
                    </Text>
                    <Text display={{ lg: 'none' }}>
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
                        zIndex={1}
                    />
                    <MenuList zIndex={10}>
                        <MenuItem
                            icon={<IoImageOutline />}
                            onClick={disclosure.onOpen}
                        >
                            Nieuwe asset selecteren
                        </MenuItem>
                        <MenuItem
                            icon={<DeleteIcon />}
                            onClick={() => {
                                setValue(`${name}.id`, '', {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                });
                                setFocalPoint({
                                    x: 50,
                                    y: 50,
                                });
                            }}
                        >
                            Verwijder huidige asset
                        </MenuItem>
                    </MenuList>
                </Menu>

                <ResolveAssetType
                    fileType={currentAsset.fileType}
                    imageProps={{
                        src: currentAsset.url,
                        thumbnailUrl: currentAsset.thumbnailUrl,
                        w: 'full!important',
                        h: 'auto!important',

                        objectFit: 'cover',
                        borderRadius: 'md',
                        focalPoint: {
                            setFocalPoint,
                            focalPoint,
                        },
                        imageProps: {
                            objectFit: 'cover',
                            maxH: '40vh',
                            w: 'full',
                        },
                    }}
                    videoProps={{
                        src: currentAsset.url,
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

export default SelectAssetControlAssetSelected;

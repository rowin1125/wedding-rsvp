import React from 'react';

import { Search2Icon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { MdClear } from 'react-icons/md';
import { GetMediaAssets } from 'types/graphql';

import MediaAssetsSortMenu from './MediaAssetsSortMenu';

type MediaLibraryControlsProps = {
    mediaLibrary: GetMediaAssets['mediaLibrary'];
    searchQuery?: string;
    setSearchQuery?: (value: string) => void;
    resetSearchQuery: () => void;
    searchInputRef?: React.RefObject<HTMLInputElement> | null;
    setSelectedAssets: (value: string[]) => void;
    allIsSelected: boolean;
};

const MediaLibraryControls = ({
    mediaLibrary,
    resetSearchQuery,
    searchInputRef,
    searchQuery,
    setSearchQuery,
    setSelectedAssets,
    allIsSelected,
}: MediaLibraryControlsProps) => {
    return (
        <>
            <Box my={8}>
                <FormControl
                    maxW={{ base: 'full', lg: '300px' }}
                    isDisabled={
                        (mediaLibrary?.assets.count ?? 0) <= 0 && !searchQuery
                    }
                >
                    <FormLabel>Doorzoek bestanden</FormLabel>

                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Search2Icon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            ref={searchInputRef}
                            value={searchQuery}
                            onChange={({ target }) =>
                                setSearchQuery?.(target.value)
                            }
                            placeholder="Bestandsnaam"
                        />
                        <InputRightElement>
                            <Button
                                isDisabled={
                                    (mediaLibrary?.assets.count ?? 0) <= 0 &&
                                    !searchQuery
                                }
                                size="sm"
                                variant="ghost"
                                onClick={resetSearchQuery}
                            >
                                <Icon as={MdClear} />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormHelperText>
                        Type minimaal 3 karakters om te zoeken
                    </FormHelperText>
                </FormControl>
            </Box>
            <Flex
                justifyContent="space-between"
                flexDir={{ base: 'column-reverse', lg: 'row' }}
            >
                <Button
                    size="sm"
                    variant="outline"
                    colorScheme="secondary"
                    isDisabled={(mediaLibrary?.assets.count ?? 0) <= 0}
                    onClick={() =>
                        setSelectedAssets(
                            allIsSelected
                                ? []
                                : mediaLibrary?.assets.items.map(
                                      (asset) => asset?.id ?? ''
                                  ) ?? []
                        )
                    }
                >
                    {allIsSelected ? 'Deselecteer alles' : 'Selecteer alles'}
                </Button>
                <MediaAssetsSortMenu />
            </Flex>
        </>
    );
};

export default MediaLibraryControls;

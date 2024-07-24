import React from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Flex,
    Button,
    Icon,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Text,
} from '@chakra-ui/react';
import { IoImageOutline, IoSearch } from 'react-icons/io5';
import { RiExternalLinkLine } from 'react-icons/ri';

import { navigate, routes } from '@redwoodjs/router';

import { SingleAssetType } from 'src/pages/MediaPage/hooks/useGetMediaAssets';

type SelectAssetControlNoAssetSelectedProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    currentAsset?: SingleAssetType | null;
};

const SelectAssetControlNoAssetSelected = ({
    disclosure,
    currentAsset,
}: SelectAssetControlNoAssetSelectedProps) => {
    if (currentAsset) return null;

    return (
        <Flex
            w="full"
            borderColor="gray.200"
            borderStyle="solid"
            borderWidth="1px"
            borderRadius="md"
            px={4}
            py={2}
            alignItems="center"
            bg="primary.200"
        >
            <Button
                size="xs"
                variant="ghost"
                colorScheme="secondary"
                onClick={disclosure.onOpen}
            >
                <Icon
                    as={IoImageOutline}
                    fontSize="lg"
                    color="gray.500"
                    mr={4}
                />
                <Text fontSize="xs">Selecteer een asset</Text>
            </Button>
            <Menu>
                <MenuButton
                    as={Button}
                    size="xs"
                    variant="ghost"
                    colorScheme="secondary"
                    ml="auto"
                    display="flex"
                >
                    <Flex>
                        <Icon as={IoSearch} mr={1} />{' '}
                        <Text fontSize="xs">Afbeelding opties</Text>{' '}
                        <Icon ml={1} as={ChevronDownIcon} />
                    </Flex>
                </MenuButton>
                <MenuList>
                    <MenuItem
                        icon={<IoImageOutline />}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            disclosure.onOpen();
                        }}
                    >
                        <Text>Kies uit bibliotheek</Text>
                    </MenuItem>
                    <MenuItem
                        icon={<RiExternalLinkLine />}
                        onClick={() => {
                            navigate(routes.media());
                        }}
                    >
                        <Text>Uploaden</Text>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default SelectAssetControlNoAssetSelected;

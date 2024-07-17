import React from 'react';

import {
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import { TbArrowsSort } from 'react-icons/tb';

import { useQueryControls } from 'src/pages/GalleryPage/hooks/useQueryControls';

const MediaAssetsSortMenu = () => {
    const { SORTING_LABEL_MAP, handleSorting, currentSorting } =
        useQueryControls();

    return (
        <Menu>
            <MenuButton
                mb={{ base: 4, lg: 0 }}
                size="sm"
                variant="outline"
                as={Button}
                leftIcon={<TbArrowsSort />}
            >
                {currentSorting?.sortField
                    ? SORTING_LABEL_MAP[currentSorting.sortField][
                          currentSorting.sortOrder
                      ]
                    : SORTING_LABEL_MAP['CREATED_AT']['DESC']}
            </MenuButton>
            <MenuList zIndex={2}>
                <MenuItem
                    onClick={() =>
                        handleSorting({
                            sortField: 'CREATED_AT',
                            sortOrder: 'DESC',
                        })
                    }
                    fontSize="sm"
                >
                    {SORTING_LABEL_MAP['CREATED_AT']['DESC']}
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleSorting({
                            sortField: 'CREATED_AT',
                            sortOrder: 'ASC',
                        })
                    }
                    fontSize="sm"
                >
                    {SORTING_LABEL_MAP['CREATED_AT']['ASC']}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    onClick={() =>
                        handleSorting({
                            sortField: 'FILE_NAME',
                            sortOrder: 'ASC',
                        })
                    }
                    fontSize="sm"
                >
                    {SORTING_LABEL_MAP['FILE_NAME']['ASC']}
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleSorting({
                            sortField: 'FILE_NAME',
                            sortOrder: 'DESC',
                        })
                    }
                    fontSize="sm"
                >
                    {SORTING_LABEL_MAP['FILE_NAME']['DESC']}
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    onClick={() =>
                        handleSorting({
                            sortField: 'FILE_TYPE',
                            sortOrder: 'ASC',
                        })
                    }
                    fontSize="sm"
                >
                    {SORTING_LABEL_MAP['FILE_TYPE']['ASC']}
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleSorting({
                            sortField: 'FILE_TYPE',
                            sortOrder: 'DESC',
                        })
                    }
                    fontSize="sm"
                >
                    {SORTING_LABEL_MAP['FILE_TYPE']['DESC']}
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MediaAssetsSortMenu;

import React from 'react';

import { Box, Flex, HStack, Icon, Stack } from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';

import RedwoodLink from 'src/components/RedwoodLink';

import { NavigationDataType } from '../../../headerRoutes';

import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';

type ResolveMenuItemProps = {
    linkObject: NavigationDataType;
};

const ResolveMenuItem = ({ linkObject }: ResolveMenuItemProps) => {
    const nestedLinks = linkObject?.nestedLinks?.links;
    const hasNestedLinks = nestedLinks && nestedLinks?.length > 0;

    if (!hasNestedLinks)
        return (
            <RedwoodLink
                color="inherit"
                fontWeight="bold"
                mx={{ lg: 2, xl: 4 }}
                to={'/'}
            >
                {linkObject.link?.label}
            </RedwoodLink>
        );

    return (
        <CustomMenu>
            <CustomMenuItem
                item={linkObject.nestedLinks?.label?.label}
                to={linkObject.nestedLinks?.label?.url || '/'}
            >
                <HStack alignItems="start" spacing={0}>
                    <Stack spacing={0}>
                        {nestedLinks?.map((link, index) => {
                            if (!link?.label || !link.url) return null;

                            return (
                                <RedwoodLink
                                    color="inherit"
                                    key={`${link?.label}-${index}`}
                                    fontWeight="bold"
                                    to={link?.url}
                                >
                                    <Box
                                        _hover={{
                                            backgroundColor: 'primary.50',
                                        }}
                                        transition="all 0.2s ease-in-outs"
                                        p={4}
                                    >
                                        <Flex
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            {link?.label}
                                            <Icon ml={12} as={BiChevronRight} />
                                        </Flex>
                                    </Box>
                                </RedwoodLink>
                            );
                        })}
                    </Stack>
                </HStack>
            </CustomMenuItem>
        </CustomMenu>
    );
};

export default ResolveMenuItem;

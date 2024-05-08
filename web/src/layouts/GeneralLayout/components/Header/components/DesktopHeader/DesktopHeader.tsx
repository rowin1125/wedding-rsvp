import React, { RefObject } from 'react';

import { Box, Center, Flex, Image } from '@chakra-ui/react';

import { routes } from '@redwoodjs/router';

import SmartLoginButton from 'src/components/marketing/SmartLoginButton';
import RedwoodLink from 'src/components/RedwoodLink';

import { navigationData } from '../../headerRoutes';

import ResolveMenuItem from './components/ResolveMenuItem';

type DesktopHeaderProps = {
    navigationListRef: RefObject<HTMLDivElement>;
};

const DesktopHeader = ({ navigationListRef }: DesktopHeaderProps) => {
    return (
        <>
            <Center
                display={{
                    base: 'none',
                    lg: 'flex',
                }}
                w="full"
                ref={navigationListRef}
                color="inherit"
                py={2}
            >
                <Flex
                    alignItems="center"
                    w="full"
                    justifyContent="space-between"
                >
                    <RedwoodLink
                        to={routes.home()}
                        title="Naar home"
                        display={'flex'}
                        alignItems="center"
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Box position="relative">
                            <Image
                                src={'/Bruiloft buddy logo.png'}
                                w={{
                                    base: 20,
                                }}
                                objectPosition={'center'}
                                objectFit={'contain'}
                            />
                        </Box>
                    </RedwoodLink>
                    <Box>
                        {navigationData.map((link, index) => (
                            <ResolveMenuItem key={index} linkObject={link} />
                        ))}
                    </Box>

                    <SmartLoginButton />
                </Flex>
            </Center>
        </>
    );
};

export default DesktopHeader;

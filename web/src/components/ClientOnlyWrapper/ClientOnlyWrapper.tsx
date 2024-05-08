/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Flex, Spinner } from '@chakra-ui/react';

import { useOnlyMountBrowserSide } from './hooks/useOnlyMountBrowserSide';

type ClientOnlyWrapperProps = {
    children: React.ReactNode;
    isLoading?: boolean;
    entity?: any;
};

const ClientOnlyWrapper = ({
    children,
    entity,
    isLoading,
}: ClientOnlyWrapperProps) => {
    const { mounted } = useOnlyMountBrowserSide();
    if (!mounted) return null;

    if (isLoading && !entity)
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Spinner />
            </Flex>
        );

    return <>{children}</>;
};

export default ClientOnlyWrapper;

import React from 'react';

import { Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react';

type AssetsLoaderProps = {
    amount?: number;
    loading: boolean;
};

const AssetsLoader = ({ amount = 24, loading }: AssetsLoaderProps) => {
    if (!loading) return null;

    return (
        <Grid
            gridTemplateColumns="repeat(12, 1fr)"
            gap={{
                lg: 8,
            }}
            w="full"
            mt={6}
        >
            {Array.from({ length: amount }).map((_, index) => (
                <GridItem colSpan={{ base: 6, lg: 2 }} key={index}>
                    <Skeleton w="full" h="200px" rounded="xl" />
                    <Flex mt={2}>
                        <Skeleton w="16px" h="15px" rounded="4px" />
                        <Skeleton
                            w="calc(100% - 16px)"
                            ml={'16px'}
                            h="15px"
                            rounded="xl"
                        />
                    </Flex>
                </GridItem>
            ))}
        </Grid>
    );
};

export default AssetsLoader;

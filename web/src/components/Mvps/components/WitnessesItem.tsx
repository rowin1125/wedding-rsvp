import React from 'react';

import {
    GridItem,
    Flex,
    Box,
    Heading,
    Image,
    BoxProps,
} from '@chakra-ui/react';

import { MvpBlockProps } from 'src/components/PuckStudio/blocks/MvpBlock';

type WitnessesItemProps = {
    witness: MvpBlockProps['witnesses'][0];
    index: number;
} & BoxProps;

const WitnessesItem = ({ witness, index, ...props }: WitnessesItemProps) => {
    return (
        <GridItem
            colSpan={{
                base: 4,
                lg: 2,
            }}
            position="relative"
            overflow="hidden"
            key={witness.name}
            {...props}
        >
            <Flex justifyContent={index > 1 ? 'center' : 'unset'}>
                <Box
                    style={{
                        textOrientation: 'mixed',
                        writingMode: 'vertical-lr',
                        transform: 'rotate(180deg)',
                        whiteSpace: 'nowrap',
                    }}
                    textAlign="center"
                    p={{
                        base: 4,
                        lg: 2,
                    }}
                    pl={0}
                >
                    <Flex alignItems="center" justifyContent="center">
                        <Heading
                            fontSize="sm"
                            textTransform="uppercase"
                            color="inherit"
                        >
                            {witness.role}
                        </Heading>
                    </Flex>
                </Box>
                <Image
                    w={{
                        base: '100%',
                        lg: '200%',
                    }}
                    h={{
                        base: '200px',
                        lg: '200px',
                    }}
                    src={
                        witness.assetReference?.asset.previewUrl ??
                        'https://img.freepik.com/free-photo/man-tuxedo-with-bouquet-smiling_1153-2587.jpg'
                    }
                    objectFit="cover"
                    objectPosition={
                        witness.assetReference?.metadata?.focalPoint
                            ? `${
                                  witness.assetReference.metadata.focalPoint
                                      .x ?? 50
                              }% ${
                                  witness.assetReference.metadata.focalPoint
                                      .y ?? 50
                              }%`
                            : 'top'
                    }
                    filter="grayscale(50%)"
                />
            </Flex>

            <Heading fontSize="3xl" mb={4} textAlign="center" color="inherit">
                {witness.name}
            </Heading>
        </GridItem>
    );
};

export default WitnessesItem;

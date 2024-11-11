import React from 'react';

import {
    GridItem,
    Flex,
    Box,
    Heading,
    Image,
    GridItemProps,
} from '@chakra-ui/react';

import { MvpBlockProps } from 'src/components/PuckStudio/blocks/MvpBlock';

type MasterOfCeremonyItemProps = {
    mvp: MvpBlockProps['mastersOfCeremony'][0];
    mastersOfCeremony: MvpBlockProps['mastersOfCeremony'];
} & GridItemProps;

const MasterOfCeremonyItem = ({
    mastersOfCeremony,
    mvp,
    ...props
}: MasterOfCeremonyItemProps) => {
    let spanWidth: number;
    switch (mastersOfCeremony.length) {
        case 1:
        case 2:
            spanWidth = 4;
            break;

        default:
            spanWidth = 2;
            break;
    }

    return (
        <GridItem
            colSpan={{
                base: 4,
                lg: spanWidth,
            }}
            position="relative"
            overflow="hidden"
            key={mvp.name}
            justifyContent="center"
            {...props}
        >
            <Flex justifyContent="center">
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
                            {mvp.role}
                        </Heading>
                    </Flex>
                </Box>
                <Image
                    w={{
                        base: '100%',
                        lg: '300px',
                    }}
                    h={{
                        base: '200px',
                        lg: '300px',
                    }}
                    src={
                        mvp.assetReference?.asset.previewUrl ??
                        'https://img.freepik.com/free-photo/man-tuxedo-with-bouquet-smiling_1153-2587.jpg?t=st=1726837606~exp=1726841206~hmac=e4d8b63e12630ff6d5399f94b15fff1e97c34c684254d7eb592571cc492cf350&w=740'
                    }
                    objectFit="cover"
                    objectPosition={
                        mvp.assetReference?.metadata?.focalPoint
                            ? `${
                                  mvp.assetReference.metadata.focalPoint.x ?? 50
                              }% ${
                                  mvp.assetReference.metadata.focalPoint.y ?? 50
                              }%`
                            : 'top'
                    }
                    filter="grayscale(50%)"
                />
            </Flex>

            <Heading fontSize="3xl" mb={4} textAlign="center" color="inherit">
                {mvp.name}
            </Heading>
        </GridItem>
    );
};

export default MasterOfCeremonyItem;

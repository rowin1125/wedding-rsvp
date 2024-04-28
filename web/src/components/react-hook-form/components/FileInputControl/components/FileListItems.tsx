import React, { MutableRefObject } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import { GiCheckMark } from 'react-icons/gi';

import ResolveAsset from './ResolveAsset';

type FileListItemsProps = {
    files: File[];
    removeFile: (fileName: string) => void;
    uploadedFiles: MutableRefObject<File[]>;
};

const FileListItems = ({
    files,
    removeFile,
    uploadedFiles,
}: FileListItemsProps) => {
    let imageWidth = 200;
    if (files.length > 2 && files.length < 4) {
        imageWidth = 150;
    } else if (files.length >= 4 && files.length < 10) {
        imageWidth = 100;
    } else if (files.length >= 10) {
        imageWidth = 75;
    }

    return (
        <Grid
            gridTemplateColumns={{
                base: `repeat(auto-fill, minmax(${imageWidth * 0.8}px, 1fr))`,
                lg: `repeat(auto-fill, minmax(${imageWidth}px, 1fr))`,
            }}
            gap={4}
            w="full"
            px={{
                lg: 4,
            }}
            mt={{
                base: 10,
                lg: 0,
            }}
        >
            {Array.from(files).map((file, index) => {
                const isUploaded = uploadedFiles.current.some(
                    (f) => f.name === file.name
                );

                return (
                    <GridItem
                        key={index}
                        w={{
                            base: 'full',
                            lg: `${imageWidth}px`,
                        }}
                        h={`${imageWidth}px`}
                        borderRadius="xl"
                        overflow="hidden"
                        shadow="xl"
                        position="relative"
                    >
                        <Tooltip label={file.name} aria-label={file.name}>
                            <Box h="full" w="full">
                                <IconButton
                                    position="absolute"
                                    top={0}
                                    right={0}
                                    variant="ghost"
                                    colorScheme="secondary"
                                    aria-label="Remove file"
                                    zIndex={1}
                                    size={{
                                        base: 'sm',
                                        lg: 'md',
                                    }}
                                    icon={<DeleteIcon color="red.500" />}
                                    onClick={() => removeFile(file.name)}
                                />
                                <ResolveAsset file={file} />
                            </Box>
                        </Tooltip>
                        {isUploaded && (
                            <Flex
                                position={'absolute'}
                                justifyContent="center"
                                alignItems="center"
                                inset={0}
                                w="full"
                                h="full"
                                bg="blackAlpha.500"
                                zIndex={2}
                            >
                                <Flex
                                    bg="green.500"
                                    rounded={'full'}
                                    h="35px"
                                    w="35px"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Icon
                                        as={GiCheckMark}
                                        color="white"
                                        fontSize="xl"
                                    />
                                </Flex>
                            </Flex>
                        )}
                    </GridItem>
                );
            })}
        </Grid>
    );
};

export default FileListItems;

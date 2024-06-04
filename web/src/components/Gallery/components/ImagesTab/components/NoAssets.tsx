import React from 'react';

import { Flex, Heading, Button, Icon } from '@chakra-ui/react';
import { BiPhotoAlbum, BiPlus } from 'react-icons/bi';

import { useCreateAssets } from 'src/components/Gallery/hooks/useCreateAssets';

type NoAssetsProps = {
    modalDisclosure: ReturnType<typeof useCreateAssets>['modalDisclosure'];
};

const NoAssets = ({ modalDisclosure }: NoAssetsProps) => {
    return (
        <Flex justifyContent="center" alignItems="center" flexDir="column">
            <Heading textAlign="center" mt={{ base: 4, lg: 0 }}>
                Voeg de eerste fotos toe:{' '}
            </Heading>
            <Flex my={10} justifyContent="center">
                <Button
                    variant="ghost"
                    h={{
                        base: '200px',
                        lg: '400px',
                    }}
                    w={{
                        base: '200px',
                        lg: '400px',
                    }}
                    borderColor="secondary.500"
                    borderStyle="dashed"
                    borderWidth="1px"
                    justifyContent="center"
                    onClick={modalDisclosure.onOpen}
                    alignItems="center"
                    transition="all 0.3s ease"
                    _hover={{
                        bg: 'primary.600',
                    }}
                    _active={{
                        bg: 'primary.800',
                    }}
                >
                    <Icon
                        as={BiPhotoAlbum}
                        fontSize={{
                            base: '75px',
                            lg: '150px',
                        }}
                        color="secondary.500"
                    />
                    <Icon
                        as={BiPlus}
                        fontSize={{
                            base: '75px',
                            lg: '150px',
                        }}
                        color="secondary.500"
                    />
                </Button>
            </Flex>
        </Flex>
    );
};

export default NoAssets;

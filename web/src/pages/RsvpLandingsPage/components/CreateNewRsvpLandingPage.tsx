import React from 'react';

import { useDisclosure, Flex, Heading, Button, Icon } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';
import { CgWebsite } from 'react-icons/cg';

import RsvpLandingPageForm from './RsvpLandingPageForm';

type CreateNewRsvpLandingPageProps = {
    disclosure: ReturnType<typeof useDisclosure>;
    hasWeddingRsvpLandingPages?: boolean;
    loading: boolean;
};

const CreateNewRsvpLandingPage = ({
    disclosure,
    loading,
    hasWeddingRsvpLandingPages,
}: CreateNewRsvpLandingPageProps) => {
    return (
        <>
            {!hasWeddingRsvpLandingPages && !loading && (
                <Flex mt={10} alignItems="center" flexDir="column">
                    <Heading>Maak eerst pagina aan: </Heading>
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
                            onClick={disclosure.onOpen}
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
                                as={CgWebsite}
                                fontSize={{ base: '75px', lg: '150px' }}
                                color="secondary.500"
                            />
                            <Icon
                                as={BiPlus}
                                fontSize={{ base: '75px', lg: '150px' }}
                                color="secondary.500"
                            />
                        </Button>
                    </Flex>
                </Flex>
            )}

            <RsvpLandingPageForm disclosure={disclosure} type="create" />
        </>
    );
};

export default CreateNewRsvpLandingPage;

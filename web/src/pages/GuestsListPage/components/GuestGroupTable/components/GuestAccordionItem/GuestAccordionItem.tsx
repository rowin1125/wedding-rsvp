import React from 'react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Icon, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { FaUser, FaUserGear } from 'react-icons/fa6';
import { GetGuestGroupsQuery } from 'types/graphql';

import GuestUpdateModal from '../GuestUpdateModal';

import GuestAccordionConnectedViaRsvp from './components/GuestAccordionConnectedViaRsvp';
import GuestAccordionDayPresentsMissing from './components/GuestAccordionDayPresentsMissing';

type GuestAccordionItemProps = {
    guest: NonNullable<GetGuestGroupsQuery['guestGroups'][0]['guests'][0]>;
    index: number;
    showArrows: boolean;
    isLast?: boolean;
};

const GuestAccordionItem = ({
    guest,
    index,
    isLast,
    showArrows,
}: GuestAccordionItemProps) => {
    const disclosure = useDisclosure();

    return (
        <>
            <Button
                color="secondary.900"
                position="relative"
                h="auto"
                borderRadius={0}
                onClick={disclosure.onOpen}
                py={4}
                {...(showArrows && {
                    _before: {
                        content: "''",
                        height: {
                            base: '90px',
                            lg: '70px',
                        },
                        width: '1px',
                        position: 'absolute',
                        left: '-30px',
                        top: {
                            base: '-70px',
                            lg: '-55px',
                        },
                        backgroundColor: 'primary.700',
                    },
                    _after: {
                        content: "''",
                        width: '22px',
                        display: 'block',
                        position: 'absolute',
                        left: '-30px',
                        top: '11px',
                        height: '25px',
                        zIndex: 4,
                        borderColor: 'primary.700',
                        borderLeftWidth: '1px',
                        borderLeftStyle: 'solid',
                        borderBottomWidth: '1px',
                        borderBottomLeftRadius: isLast ? '10px' : 0,
                        borderBottomStyle: 'solid',
                    },
                })}
                borderColor="primary.700"
                borderTopWidth={2}
                variant="ghost"
                key={guest.id}
                display="flex"
                justifyContent="left"
                _hover={{
                    backgroundColor: 'primary.200',
                }}
                alignItems="center"
                colorScheme="primary"
                pl={2}
                pr={0}
                mr={0}
                w={'100%'}
            >
                {showArrows && (
                    <Icon
                        as={ChevronRightIcon}
                        color="primary.700"
                        position="absolute"
                        left="-23px"
                        top="21px"
                        fontSize="3xl"
                    />
                )}
                <Flex
                    justifyContent="space-between"
                    w="full"
                    alignItems={{
                        lg: 'center',
                    }}
                    flexDir={{
                        base: 'column',
                        lg: 'row',
                    }}
                >
                    <Flex>
                        <Icon as={FaUser} color="secondary.500" mr={4} />
                        <Text textColor="secondary.900">
                            <strong>Gast {index + 1}: </strong>
                            {`${guest.firstName} ${guest.lastName}`}
                        </Text>
                    </Flex>
                    <Flex
                        w={{ base: 'full', lg: 'auto' }}
                        justifyContent="flex-end"
                        mt={2}
                        alignItems="center"
                    >
                        <GuestAccordionDayPresentsMissing guest={guest} />
                        <GuestAccordionConnectedViaRsvp guest={guest} />
                        <Button
                            as="div"
                            mx={4}
                            colorScheme="secondary"
                            size="sm"
                            variant="outline"
                        >
                            <Icon as={FaUserGear} fontSize="lg" />
                        </Button>
                    </Flex>
                </Flex>
            </Button>
            {disclosure.isOpen && (
                <GuestUpdateModal guestId={guest.id} disclosure={disclosure} />
            )}
        </>
    );
};

export default GuestAccordionItem;

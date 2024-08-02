import React from 'react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Icon, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa6';
import { GetWeddingInvitationResponses } from 'types/graphql';

import WeddingInvitationResponseConnectModal from './WeddingInvitationResponseConnectModal';

type WeddingInvitationResponsesAccordionGuestProps = {
    showArrows: boolean;
    guestWeddingResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0]['guestWeddingResponses'][0];
    index: number;
    isFirst: boolean;
    weddingInvitationResponse: GetWeddingInvitationResponses['weddingInvitationResponses'][0];
    isLast: boolean;
};

const WeddingInvitationResponsesAccordionGuest = ({
    showArrows,
    guestWeddingResponse,
    index,
    isFirst,
    isLast,
    weddingInvitationResponse,
}: WeddingInvitationResponsesAccordionGuestProps) => {
    const disclosure = useDisclosure();
    if (
        guestWeddingResponse?.guest?.guestGroupId ||
        guestWeddingResponse?.guest?.connectedViaRsvp
    )
        return null;

    return (
        <Button
            color="secondary.900"
            position="relative"
            onClick={disclosure.onOpen}
            h="auto"
            borderRadius={0}
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
            borderTopWidth={isFirst ? 0 : 2}
            variant="ghost"
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
                        {guestWeddingResponse?.guest?.firstName}{' '}
                        {guestWeddingResponse?.guest?.lastName}
                    </Text>
                </Flex>
                <WeddingInvitationResponseConnectModal
                    disclosure={disclosure}
                    guestWeddingResponse={guestWeddingResponse}
                    weddingInvitationResponse={weddingInvitationResponse}
                />
            </Flex>
        </Button>
    );
};

export default WeddingInvitationResponsesAccordionGuest;

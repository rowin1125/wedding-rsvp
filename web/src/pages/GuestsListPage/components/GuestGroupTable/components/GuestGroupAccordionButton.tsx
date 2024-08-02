import React from 'react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    AccordionButton,
    Icon,
    Flex,
    AccordionIcon,
    Text,
} from '@chakra-ui/react';
import { GetGuestGroupsQuery } from 'types/graphql';

import { guestGroupTypeOptions } from 'src/config/guestList';

import { getPeopleIcon } from '../helpers/getPeopleIcon';

type GuestGroupAccordionButtonProps = {
    guestGroup: GetGuestGroupsQuery['guestGroups'][0];
    showArrows?: boolean;
    isExpanded: boolean;
    isLast: boolean;
    previousElementHeight: number;
};

const GuestGroupAccordionButton = ({
    guestGroup,
    isExpanded,
    isLast,
    previousElementHeight,
    showArrows,
}: GuestGroupAccordionButtonProps) => {
    return (
        <AccordionButton
            color="secondary.900"
            position="relative"
            borderRadius={0}
            pt={6}
            {...(showArrows && {
                _before: {
                    content: "''",
                    height: {
                        base: `${previousElementHeight + 55}px` ?? '15px',
                        lg: `${previousElementHeight + 30}px` ?? '15px',
                    },
                    width: '1px',
                    position: 'absolute',
                    left: '-30px',
                    top: {
                        base: -previousElementHeight - 35,
                        lg: -previousElementHeight - 15,
                    },
                    backgroundColor: 'primary.700',
                },
                _after: {
                    content: "''",
                    width: '22px',
                    display: 'block',
                    position: 'absolute',
                    left: '-30px',
                    top: '14px',
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
            display="flex"
            justifyContent="left"
            _hover={{
                backgroundColor: 'primary.200',
            }}
            alignItems="center"
            pl={4}
            pr={0}
            mr={0}
            w={'100%'}
        >
            {showArrows && (
                <Icon
                    as={ChevronRightIcon}
                    color="primary.700"
                    position="absolute"
                    left="-22px"
                    top="25px"
                    fontSize="3xl"
                />
            )}

            <Flex justifyContent="space-between" w="full">
                <Flex alignItems="center">
                    <AccordionIcon
                        mr={4}
                        transform={
                            showArrows
                                ? isExpanded
                                    ? 'rotate(0deg)'
                                    : 'rotate(180deg)'
                                : undefined
                        }
                        fontSize="3xl"
                        left="1px"
                        position="relative"
                    />
                    <Flex>
                        <Text
                            mr={2}
                            fontWeight="bold"
                            textColor="secondary.900"
                        >
                            {guestGroup.guests.length}
                        </Text>
                        <Icon
                            as={getPeopleIcon(guestGroup.guests.length)}
                            color="secondary.500"
                            mr={4}
                            fontSize="lg"
                        />
                    </Flex>
                    <Text textColor="secondary.900">
                        <strong>
                            {
                                guestGroupTypeOptions.find(
                                    (option) =>
                                        option.value ===
                                        guestGroup.guestGroupType
                                )?.label
                            }
                            :
                        </strong>{' '}
                        {guestGroup.name}
                    </Text>
                </Flex>
            </Flex>
        </AccordionButton>
    );
};

export default GuestGroupAccordionButton;

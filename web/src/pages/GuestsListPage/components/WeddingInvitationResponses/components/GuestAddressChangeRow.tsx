import React from 'react';

import {
    GridItem,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Icon,
    Text,
} from '@chakra-ui/react';
import { HiOutlineArrowLeft, HiOutlineArrowUp } from 'react-icons/hi';
import {
    AddressBody,
    GetGuests,
    GetWeddingInvitationResponses,
} from 'types/graphql';

type GuestAddressChangeRowProps = {
    guestInvitationAddress: GetWeddingInvitationResponses['weddingInvitationResponses'][0]['address'];
    guestAddress?: GetGuests['guests'][0]['address'];
    label: string;
    property: keyof AddressBody;
};

const GuestAddressChangeRow = ({
    guestInvitationAddress,
    guestAddress,
    label,
    property,
}: GuestAddressChangeRowProps) => {
    const responseGuestRowData = guestInvitationAddress[property];
    const guestRowData = guestAddress?.[property];

    return (
        <>
            <GridItem colSpan={{ base: 11, lg: 5 }}>
                <Text
                    display={{
                        base: 'block',
                        lg: 'none',
                    }}
                    fontWeight="semibold"
                    mb={2}
                >
                    {label}
                </Text>
                <Flex
                    flexDir="column"
                    gap={4}
                    bg="primary.600"
                    px={4}
                    rounded="xl"
                    py={4}
                    justifyContent="center"
                    position="relative"
                >
                    <Icon
                        display={{
                            base: 'block',
                            lg: 'none',
                        }}
                        fontSize="3xl"
                        as={HiOutlineArrowUp}
                        position="absolute"
                        bottom={-6}
                        left="50%"
                        transform="translateX(-50%)"
                        background="secondary.900"
                        color="white"
                        rounded="full"
                        p={2}
                    />
                    <FormControl>
                        <FormLabel
                            display={{
                                base: 'none',
                                lg: 'block',
                            }}
                        >
                            {label}
                        </FormLabel>
                        <Input readOnly defaultValue={guestRowData as string} />
                    </FormControl>
                </Flex>
            </GridItem>
            <GridItem
                colSpan={{ base: 11, lg: 1 }}
                display={{
                    base: 'none',
                    lg: 'flex',
                }}
                alignItems="center"
                justifyContent="center"
            >
                <Flex flexDir="column" justifyContent="flex-end" h="full">
                    <Icon mb={5} fontSize="3xl" as={HiOutlineArrowLeft} />
                </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 11, lg: 5 }}>
                <Flex
                    flexDir="column"
                    gap={4}
                    bg="green.100"
                    px={4}
                    rounded="xl"
                    py={4}
                >
                    <FormControl>
                        <FormLabel
                            display={{
                                base: 'none',
                                lg: 'block',
                            }}
                        >
                            {label}
                        </FormLabel>
                        <Input
                            readOnly
                            defaultValue={responseGuestRowData as string}
                        />
                    </FormControl>
                </Flex>
            </GridItem>
        </>
    );
};

export default GuestAddressChangeRow;
